import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import InputField from '../InputField';
import CalculatorLayout from './CalculatorLayout';
import CalculatorResults from './CalculatorResults';
import ChartContainer from './ChartContainer';

interface InterestData {
  year: number;
  principal: number;
  interest: number;
  total: number;
}

export default function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('5');
  const [data, setData] = useState<InterestData[]>([]);

  const calculateInterest = () => {
    const p = Number(principal);
    const r = Number(rate) / 100;
    const t = Number(time);

    const newData: InterestData[] = [];
    for (let year = 1; year <= t; year++) {
      const interest = p * r * year;
      newData.push({
        year,
        principal: p,
        interest,
        total: p + interest,
      });
    }

    setData(newData);
  };

  useEffect(() => {
    calculateInterest();
  }, [principal, rate, time]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const results = [
    {
      label: 'Principal Amount',
      value: formatCurrency(Number(principal)),
    },
    {
      label: 'Total Interest',
      value: formatCurrency(data[data.length - 1]?.interest || 0),
    },
    {
      label: 'Final Amount',
      value: formatCurrency(data[data.length - 1]?.total || 0),
    },
  ];

  return (
    <CalculatorLayout title="Simple Interest Calculator">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <InputField
              label="Principal Amount"
              type="number"
              value={principal}
              onChange={setPrincipal}
              min={0}
              step="1000"
              required
            />
            <InputField
              label="Interest Rate (%)"
              type="number"
              value={rate}
              onChange={setRate}
              min={0}
              step="0.1"
              required
            />
          </div>
          <InputField
            label="Time (years)"
            type="number"
            value={time}
            onChange={setTime}
            min={1}
            max={30}
            required
          />
        </div>

        <CalculatorResults results={results} />
      </div>

      <ChartContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
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
          <Bar dataKey="principal" name="Principal" fill="#4F46E5" stackId="a" />
          <Bar dataKey="interest" name="Interest" fill="#10B981" stackId="a" />
        </BarChart>
      </ChartContainer>
    </CalculatorLayout>
  );
}
