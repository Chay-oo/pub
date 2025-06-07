import React from 'react';
import { ShoppingBag, Coffee, Home, Car } from 'lucide-react';

const SpendingActivityCard = () => {
  const categories = [
    { name: 'Shopping', icon: <ShoppingBag className="w-4 h-4" />, amount: 578.32, color: 'bg-blue-500' },
    { name: 'Food & Dining', icon: <Coffee className="w-4 h-4" />, amount: 428.59, color: 'bg-emerald-500' },
    { name: 'Housing', icon: <Home className="w-4 h-4" />, amount: 1450.00, color: 'bg-purple-500' },
    { name: 'Transportation', icon: <Car className="w-4 h-4" />, amount: 245.75, color: 'bg-amber-500' },
  ];
  
  const totalSpending = categories.reduce((sum, category) => sum + category.amount, 0);
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="font-medium text-lg text-gray-900 mb-4">Monthly Spending Activity</h3>
      
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-100">
              On Track
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-blue-600">
              68% of Monthly Budget
            </span>
          </div>
        </div>
        <div className="flex h-4 overflow-hidden text-xs rounded-full bg-gray-200">
          <div className="flex flex-col justify-center text-white text-center whitespace-nowrap bg-gradient-to-r from-blue-500 to-indigo-600 w-2/3 rounded-full shadow-none transition-all duration-500"></div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <div className="flex items-center space-x-1">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className={`${category.color} h-2`} 
                  style={{ width: `${(category.amount / totalSpending) * 100}%` }}
                ></div>
              ))}
            </div>
          </div>
          
          {categories.map((category, index) => (
            <div key={index} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${category.color.replace('bg-', 'bg-').replace('500', '100')} ${category.color.replace('bg-', 'text-')}`}>
                {category.icon}
              </div>
              <div className="ml-3 flex-grow">
                <p className="text-sm font-medium text-gray-900">{category.name}</p>
                <p className="text-xs text-gray-500">{Math.round((category.amount / totalSpending) * 100)}% of total</p>
              </div>
              <div className="text-sm font-medium text-gray-900">${category.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500">Total Spending</span>
            <span className="text-lg font-bold text-gray-900">${totalSpending.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View detailed spending report →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpendingActivityCard;