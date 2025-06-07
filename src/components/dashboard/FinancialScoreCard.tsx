import React from 'react';
import { ArrowUpRight, Info } from 'lucide-react';

const FinancialScoreCard = () => {
  const score = 725;
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium text-lg text-gray-900">Your Financial Health Score</h3>
          <p className="text-gray-500 text-sm mt-1">Last updated Jun 1, 2025</p>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Info className="w-5 h-5" />
        </button>
      </div>
      
      <div className="mt-6 flex flex-col sm:flex-row items-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="#e5e7eb" 
              strokeWidth="10" 
            />
            
            {/* Progress circle with gradient */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="url(#scoreGradient)" 
              strokeWidth="10" 
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 45 * percentage / 100} ${2 * Math.PI * 45}`}
              transform="rotate(-90 50 50)"
            />
            
            <text 
              x="50%" 
              y="50%" 
              dominantBaseline="middle" 
              textAnchor="middle"
              className="text-3xl font-bold"
              fill="#1e3a8a"
            >
              {score}
            </text>
            
            <text 
              x="50%" 
              y="62%" 
              dominantBaseline="middle" 
              textAnchor="middle"
              className="text-sm"
              fill="#6b7280"
            >
              out of {maxScore}
            </text>
          </svg>
        </div>
        
        <div className="ml-0 sm:ml-10 mt-6 sm:mt-0 w-full">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-700">Debt Management</h4>
                <span className="text-sm font-medium text-emerald-600 flex items-center">
                  Excellent <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-700">Savings Rate</h4>
                <span className="text-sm font-medium text-blue-600 flex items-center">
                  Good <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-700">Investment Diversity</h4>
                <span className="text-sm font-medium text-yellow-600 flex items-center">
                  Fair <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-700">Budget Adherence</h4>
                <span className="text-sm font-medium text-emerald-600 flex items-center">
                  Excellent <ArrowUpRight className="w-3 h-3 ml-1" />
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          
          <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-medium">
            See detailed breakdown →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinancialScoreCard;