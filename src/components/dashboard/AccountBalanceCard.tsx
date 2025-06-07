import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AccountBalanceCardProps {
  title: string;
  balance: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  color: string;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({
  title,
  balance,
  change,
  trend,
  icon,
  color
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-50',
          text: 'text-blue-700',
          iconBg: 'bg-blue-100',
          iconText: 'text-blue-600',
        };
      case 'emerald':
        return {
          bg: 'bg-emerald-50',
          text: 'text-emerald-700',
          iconBg: 'bg-emerald-100',
          iconText: 'text-emerald-600',
        };
      case 'purple':
        return {
          bg: 'bg-purple-50',
          text: 'text-purple-700',
          iconBg: 'bg-purple-100',
          iconText: 'text-purple-600',
        };
      default:
        return {
          bg: 'bg-gray-50',
          text: 'text-gray-700',
          iconBg: 'bg-gray-100',
          iconText: 'text-gray-600',
        };
    }
  };

  const colors = getColorClasses(color);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 ${colors.iconBg} rounded-lg flex items-center justify-center ${colors.iconText}`}>
          {icon}
        </div>
        <div className={`flex items-center ${trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 mr-1" />
          )}
          <span className="text-sm font-medium">{change}</span>
        </div>
      </div>
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <span className="text-2xl font-bold text-gray-900">${balance}</span>
      </div>
      <div className="mt-4">
        <button className={`text-sm ${colors.text} font-medium`}>
          View Details →
        </button>
      </div>
    </div>
  );
};

export default AccountBalanceCard;