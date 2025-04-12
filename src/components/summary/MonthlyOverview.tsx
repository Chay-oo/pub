import React from 'react';
import { Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface MonthlyOverviewProps {
  monthlyBreakdown: Array<{
    name: string;
    amount: number;
    type: string;
  }>;
}

export default function MonthlyOverview({ monthlyBreakdown }: MonthlyOverviewProps) {
  const CHART_COLORS = {
    income: '#22C55E',
    expense: '#EF4444',
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Wallet className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">Monthly Overview</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyBreakdown} layout="vertical">
            <XAxis type="number" tickFormatter={(value) => formatCurrency(value)} />
            <YAxis dataKey="name" type="category" />
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {monthlyBreakdown.map((entry, index) => (
                <Cell key={index} fill={CHART_COLORS[entry.type]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}