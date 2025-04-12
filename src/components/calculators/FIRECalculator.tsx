import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import InputField from '../InputField';
import CalculatorLayout from './CalculatorLayout';
import CalculatorResults from './CalculatorResults';
import ChartContainer from './ChartContainer';

interface FIREData {
  year: number;
  portfolio: number;
  contributions: number;
  withdrawals: number;
}

export default function FIRECalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [annualIncome, setAnnualIncome] = useState('80000');
  const [annualExpenses, setAnnualExpenses] = useState('50000');
  const [savingsRate, setSavingsRate] = useState('30');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [withdrawalRate, setWithdrawalRate] = useState('4');
  const [data, setData] = useState<FIREData[]>([]);

  const calculateFIRE = () => {
    const initialSavings = Number(currentSavings) || 0;
    const yearlyContribution = (Number(annualIncome) * Number(savingsRate)) / 100 / 12 || 0;
    const yearlyExpenses = Number(annualExpenses) || 0;
    const returnRate = Number(expectedReturn) / 100 || 0;
    const withdrawalRateDecimal = Number(withdrawalRate) / 100 || 0;

    const fireNumber = yearlyExpenses / withdrawalRateDecimal;

    const newData: FIREData[] = [];
    let currentPortfolio = initialSavings;
    let year = 0;
    const maxYears = 50;

    while (currentPortfolio < fireNumber && year < maxYears) {
      year++;
      const investment = yearlyContribution * 12;
      const returns = currentPortfolio * returnRate;
      currentPortfolio = currentPortfolio + returns + investment;

      newData.push({
        year: year + Number(currentAge),
        portfolio: currentPortfolio,
        contributions: initialSavings + investment * year,
        withdrawals: yearlyExpenses,
      });
    }

    const retirementYears = 10;
    const retirementAge = year + Number(currentAge);

    for (let i = 1; i <= retirementYears; i++) {
      const withdrawals = yearlyExpenses;
      const returns = currentPortfolio * returnRate;
      currentPortfolio = currentPortfolio + returns - withdrawals;

      newData.push({
        year: retirementAge + i,
        portfolio: currentPortfolio,
        contributions: newData[newData.length - 1].contributions,
        withdrawals: yearlyExpenses,
      });
    }

    setData(newData);
  };

  useEffect(() => {
    calculateFIRE();
  }, [currentAge, currentSavings, annualIncome, annualExpenses, savingsRate, expectedReturn, withdrawalRate]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const yearsToFI = data.findIndex(
    (d) => d.portfolio >= (Number(annualExpenses) || 0) / (Number(withdrawalRate) / 100 || 0)
  );

  const results = [
    {
      label: 'FIRE Number',
      value: formatCurrency((Number(annualExpenses) || 0) / (Number(withdrawalRate) / 100 || 0)),
    },
    {
      label: 'Years to FIRE',
      value: yearsToFI === -1 ? 'N/A' : `${yearsToFI} years`,
    },
    {
      label: 'FIRE Age',
      value: yearsToFI === -1 ? 'N/A' : `${Number(currentAge) + yearsToFI}`,
    },
    {
      label: 'Monthly Savings',
      value: formatCurrency((Number(annualIncome) * Number(savingsRate)) / 100 / 12 || 0),
    },
  ];

  return (
    <CalculatorLayout title="FIRE Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Current Age"
              type="number"
              value={currentAge}
              onChange={setCurrentAge}
              min={18}
              max={90}
              required
            />
            <InputField
              label="Current Savings"
              type="number"
              value={currentSavings}
              onChange={setCurrentSavings}
              min={0}
              step="1000"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Annual Income"
              type="number"
              value={annualIncome}
              onChange={setAnnualIncome}
              min={0}
              step="1000"
              required
            />
            <InputField
              label="Annual Expenses"
              type="number"
              value={annualExpenses}
              onChange={setAnnualExpenses}
              min={0}
              step="1000"
              required
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <InputField
              label="Savings Rate (%)"
              type="number"
              value={savingsRate}
              onChange={setSavingsRate}
              min={1}
              max={90}
              required
            />
            <InputField
              label="Return Rate (%)"
              type="number"
              value={expectedReturn}
              onChange={setExpectedReturn}
              min={1}
              max={15}
              required
            />
            <InputField
              label="Withdrawal Rate (%)"
              type="number"
              value={withdrawalRate}
              onChange={setWithdrawalRate}
              min={2}
              max={10}
              step="0.1"
              required
            />
          </div>
        </div>

        <CalculatorResults results={results} />
      </div>

      <ChartContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 12 }}
            label={{ value: 'Age', position: 'insideBottomRight', offset: -10, fontSize: 14 }}
          />
          <YAxis
            tickFormatter={(value) => formatCurrency(value)}
            width={80}
            tick={{ fontSize: 12 }}
            label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft', fontSize: 14 }}
          />
          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Age ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="portfolio"
            name="Portfolio"
            stroke="#4F46E5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="contributions"
            name="Contributions"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </CalculatorLayout>
  );
}
