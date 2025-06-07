import React from 'react';

interface FinancialGoalCardProps {
  title: string;
  target: number;
  current: number;
  icon: React.ReactNode;
  color: string;
}

const FinancialGoalCard: React.FC<FinancialGoalCardProps> = ({
  title,
  target,
  current,
  icon,
  color
}) => {
  const percentage = Math.round((current / target) * 100);
  
  const getGradient = (color: string) => {
    switch(color) {
      case 'blue':
        return 'from-blue-600 to-indigo-700';
      case 'emerald':
        return 'from-emerald-500 to-teal-600';
      case 'amber':
        return 'from-amber-500 to-orange-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };
  
  const gradientClasses = getGradient(color);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          {icon}
        </div>
      </div>
      
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-sm text-gray-500">Progress</p>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900">${current.toLocaleString()}</span>
            <span className="ml-2 text-sm text-gray-500">of ${target.toLocaleString()}</span>
          </div>
        </div>
        <div className="text-lg font-medium text-gray-900">{percentage}%</div>
      </div>
      
      <div className="mt-3 relative">
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${gradientClasses}`} 
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <div className="absolute bottom-full mb-1 left-0 right-0">
          <div className="relative h-0">
            <div 
              className={`absolute bottom-0 w-2 h-4 bg-gray-800 rounded-t transform -translate-x-1/2 transition-all duration-300`}
              style={{ left: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-right">
        <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          Add funds →
        </button>
      </div>
    </div>
  );
};

export default FinancialGoalCard;