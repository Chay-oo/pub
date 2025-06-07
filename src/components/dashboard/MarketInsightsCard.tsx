import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const MarketInsightsCard = () => {
  const marketIndices = [
    { name: 'S&P 500', value: 4385.52, change: 0.87, trend: 'up' },
    { name: 'NASDAQ', value: 15645.23, change: 1.43, trend: 'up' },
    { name: 'Dow Jones', value: 34112.78, change: -0.28, trend: 'down' },
    { name: '10-Year Treasury', value: 3.68, change: 0.05, trend: 'up' },
  ];
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-lg text-gray-900">Market Insights</h3>
        <span className="text-xs text-gray-500">Last updated: 1h ago</span>
      </div>
      
      <div className="space-y-4">
        {marketIndices.map((index, i) => (
          <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition">
            <div>
              <p className="font-medium text-gray-900">{index.name}</p>
              <p className="text-sm text-gray-500">Current: {index.value}</p>
            </div>
            <div className={`flex items-center ${index.trend === 'up' ? 'text-emerald-600' : 'text-red-600'}`}>
              {index.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">{index.trend === 'up' ? '+' : ''}{index.change}%</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">News & Insights</h4>
        <div className="space-y-3">
          <div className="p-2 rounded-lg hover:bg-gray-50 transition">
            <h5 className="font-medium text-gray-900">Fed Signals Potential Rate Cut</h5>
            <p className="text-sm text-gray-600 mt-1">
              Federal Reserve hints at possible interest rate cuts in the coming months as inflation pressures ease.
            </p>
            <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
          </div>
          <div className="p-2 rounded-lg hover:bg-gray-50 transition">
            <h5 className="font-medium text-gray-900">Housing Market Cools Down</h5>
            <p className="text-sm text-gray-600 mt-1">
              Latest data shows housing market is stabilizing with slower price growth and increasing inventory.
            </p>
            <p className="text-xs text-gray-500 mt-1">1 day ago</p>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View more market insights →
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightsCard;