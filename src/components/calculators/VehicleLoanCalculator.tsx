import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import InputField from '../InputField';
import CalculatorLayout from './CalculatorLayout';
import CalculatorResults from './CalculatorResults';
import ChartContainer from './ChartContainer';

interface PaymentSchedule {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

export default function VehicleLoanCalculator() {
  const [vehiclePrice, setVehiclePrice] = useState('35000');
  const [downPayment, setDownPayment] = useState('7000');
  const [interestRate, setInterestRate] = useState('4.5');
  const [loanTerm, setLoanTerm] = useState('5');
  const [schedule, setSchedule] = useState<PaymentSchedule[]>([]);

  const calculateLoan = () => {
    const principal = Number(vehiclePrice) - Number(downPayment);
    const monthlyRate = Number(interestRate) / 100 / 12;
    const numberOfPayments = Number(loanTerm) * 12;
    
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    const newSchedule: PaymentSchedule[] = [];
    let balance = principal;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      if (month % 12 === 0) {
        newSchedule.push({
          month: month / 12,
          payment: monthlyPayment * 12,
          principal: principalPayment * 12,
          interest: interestPayment * 12,
          remainingBalance: balance,
        });
      }
    }

    setSchedule(newSchedule);
  };

  useEffect(() => {
    calculateLoan();
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const results = [
    {
      label: 'Vehicle Price',
      value: formatCurrency(Number(vehiclePrice)),
    },
    {
      label: 'Monthly Payment',
      value: formatCurrency(schedule[0]?.payment / 12 || 0),
    },
    {
      label: 'Total Interest',
      value: formatCurrency(schedule.reduce((sum, { interest }) => sum + interest, 0)),
    },
    {
      label: 'Total Cost',
      value: formatCurrency(
        Number(vehiclePrice) +
        schedule.reduce((sum, { interest }) => sum + interest, 0)
      ),
    },
  ];

  return (
    <CalculatorLayout title="Vehicle Loan Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Vehicle Price"
              type="number"
              value={vehiclePrice}
              onChange={setVehiclePrice}
              min={0}
              step="1000"
              required
            />
            <InputField
              label="Down Payment"
              type="number"
              value={downPayment}
              onChange={setDownPayment}
              min={0}
              step="500"
              required
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Interest Rate (%)"
              type="number"
              value={interestRate}
              onChange={setInterestRate}
              min={0}
              step="0.1"
              required
            />
            <InputField
              label="Term (years)"
              type="number"
              value={loanTerm}
              onChange={setLoanTerm}
              min={1}
              max={7}
              required
            />
          </div>
        </div>

        <CalculatorResults results={results} />
      </div>

      <ChartContainer>
      <LineChart data={schedule} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
  dataKey="month"
  tick={{ fontSize: 12 }}
  tickFormatter={(value) => `Y${value}`}
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
            dataKey="remainingBalance"
            name="Balance"
            stroke="#4F46E5"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="payment"
            name="Annual Payment"
            stroke="#10B981"
            strokeWidth={2}
          />
        </LineChart>
      </ChartContainer>
    </CalculatorLayout>
  );
}