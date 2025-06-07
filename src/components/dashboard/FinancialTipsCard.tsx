import React from 'react';
import { Lightbulb, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const FinancialTipsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-5 border-b border-gray-100">
        <h3 className="font-medium text-lg text-gray-900">Financial Tips For You</h3>
      </div>
      
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
              <Lightbulb className="w-5 h-5" />
            </div>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Maximize Your 401(k) Match</h4>
            <p className="mt-1 text-gray-600">
              Are you taking full advantage of your employer's 401(k) matching program? Based on your current contributions, you might be leaving $1,200 per year on the table.
            </p>
            
            <div className="mt-4 flex items-center space-x-6">
              <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium">
                <ThumbsUp className="w-4 h-4 mr-1" />
                <span>Helpful</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>Comment</span>
              </button>
              <button className="flex items-center text-gray-500 hover:text-blue-600 text-sm font-medium">
                <Share2 className="w-4 h-4 mr-1" />
                <span>Share</span>
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Learn more about 401(k) optimization →
              </button>
              <div className="flex items-center">
                <span className="text-xs text-gray-500 mr-2">Was this helpful?</span>
                <div className="flex space-x-1">
                  <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">
                    👍
                  </button>
                  <button className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600">
                    👎
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialTipsCard;