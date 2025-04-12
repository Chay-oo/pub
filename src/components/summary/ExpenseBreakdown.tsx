import React from 'react';
import { Building2 } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { formatCurrency } from '../../utils/formatters';

interface ExpenseBreakdownProps {
  expenses: Array<{
    name: string;
    value: number;
  }>;
}

export default function ExpenseBreakdown({ expenses }: ExpenseBreakdownProps) {
  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius * 1.35;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    if (percent < 0.03) return null;

    return (
      <g>
        <path
          d={`M${cx + outerRadius * Math.cos(-midAngle * RADIAN)},${
            cy + outerRadius * Math.sin(-midAngle * RADIAN)
          }L${x},${y}`}
          stroke={COLORS[index % COLORS.length]}
          fill="none"
        />
        <text
          x={x}
          y={y}
          fill="#374151"
          textAnchor={x > cx ? 'start' : 'end'}
          dominantBaseline="central"
          fontSize="12"
        >
          {`${name} (${(percent * 100).toFixed(0)}%)`}
        </text>
      </g>
    );
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Building2 className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">Expense Breakdown</h3>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={expenses}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={60}
              label={renderCustomizedLabel}
              labelLine={false}
            >
              {expenses.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}