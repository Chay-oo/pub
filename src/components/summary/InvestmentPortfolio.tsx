import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface Investment {
  name: string;
  value: number;
}

interface InvestmentPortfolioProps {
  investmentBreakdown: Investment[];
  monthlyInvestments: Investment[];
}

export default function InvestmentPortfolio({ investmentBreakdown, monthlyInvestments }: InvestmentPortfolioProps) {
  return (
    <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">Investment Portfolio</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Current Value</h4>
          <div className="space-y-2">
            {investmentBreakdown.map((investment, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{investment.name}</span>
                <span className="font-medium">{formatCurrency(investment.value)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Portfolio Value</span>
                <span>{formatCurrency(investmentBreakdown.reduce((sum, { value }) => sum + value, 0))}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Monthly Contributions</h4>
          <div className="space-y-2">
            {monthlyInvestments.map((investment, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-gray-600">{investment.name}</span>
                <span className="font-medium">{formatCurrency(investment.value)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-semibold">
                <span>Total Monthly Investment</span>
                <span>{formatCurrency(monthlyInvestments.reduce((sum, { value }) => sum + value, 0))}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}