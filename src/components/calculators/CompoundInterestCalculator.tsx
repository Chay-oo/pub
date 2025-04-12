import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import InputField from '../InputField';
import CalculatorLayout from './CalculatorLayout';
import CalculatorResults from './CalculatorResults';
import ChartContainer from './ChartContainer';

interface InterestData {
  year: number;
  amount: number;
  interest: number;
  contributions: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('10');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [data, setData] = useState<InterestData[]>([]);

  const calculateCompoundInterest = () => {
    const p = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(time);
    const m = Number(monthlyContribution);
    const n = Number(compoundingFrequency);

    const newData: InterestData[] = [];
    let totalContributions = p;
    let previousAmount = p;

    for (let year = 1; year <= t; year++) {
      const yearlyContributions = m * 12;
      totalContributions += yearlyContributions;
      const amount = (p + (m * 12 * year)) * Math.pow(1 + r/n, n * year);
      const interest = amount - totalContributions;

      newData.push({
        year,
        amount,
        interest,
        contributions: totalContributions,
      });

      previousAmount = amount;
    }

    setData(newData);
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, monthlyContribution, compoundingFrequency]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const results = [
    {
      label: 'Total Invested',
      value: formatCurrency(data[data.length - 1]?.contributions || 0),
    },
    {
      label: 'Interest Earned',
      value: formatCurrency(data[data.length - 1]?.interest || 0),
    },
    {
      label: 'Final Balance',
      value: formatCurrency(data[data.length - 1]?.amount || 0),
    },
  ];

  return (
    <CalculatorLayout title="Compound Interest Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Initial Investment"
              type="number"
              value={principal}
              onChange={setPrincipal}
              min={0}
              step="1000"
              required
            />
            <InputField
              label="Monthly Addition"
              type="number"
              value={monthlyContribution}
              onChange={setMonthlyContribution}
              min={0}
              step="100"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Interest Rate (%)"
              type="number"
              value={rate}
              onChange={setRate}
              min={0}
              step="0.1"
              required
            />
            <InputField
              label="Years"
              type="number"
              value={time}
              onChange={setTime}
              min={1}
              max={50}
              required
            />
          </div>
          <select
            value={compoundingFrequency}
            onChange={(e) => setCompoundingFrequency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>

        <CalculatorResults results={results} />
      </div>

      <ChartContainer>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
  dataKey="year"
  tick={{ fontSize: 12 }}
  label={{ value: 'Years', position: 'insideBottomRight', offset: -10, fontSize: 14 }}
/>

<YAxis
  tickFormatter={(value) => formatCurrency(value)}
  width={80}
  tick={{ fontSize: 12 }}
  label={{ value: 'Amount (USD)', angle: -90, position: 'insideLeft', fontSize: 14 }}
/>

          <Tooltip
            formatter={(value: number) => formatCurrency(value)}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Balance"
            stroke="#4F46E5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="contributions"
            name="Invested"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </CalculatorLayout>
  );
}