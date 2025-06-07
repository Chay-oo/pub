import React, { useState } from 'react';
import {
  User,
  Settings,
  FileText,
  Bell,
  Shield,
  LogOut,
  Edit,
  Plus,
  Trash2,
  Check,
  X,
  TrendingUp,
  DollarSign,
  LineChart
} from 'lucide-react';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                JD
              </div>
              <h2 className="text-xl font-bold text-gray-900">John Doe</h2>
              <p className="text-gray-500 text-sm">john.doe@example.com</p>
              <div className="mt-2 px-3 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-800">
                Premium Member
              </div>
              <button className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
          
          <nav className="p-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'profile'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </button>
            
            <button
              onClick={() => setActiveTab('financialGoals')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'financialGoals'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Financial Goals</span>
            </button>
            
            <button
              onClick={() => setActiveTab('accounts')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'accounts'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <DollarSign className="w-5 h-5" />
              <span>Linked Accounts</span>
            </button>
            
            <button
              onClick={() => setActiveTab('activity')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'activity'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>Activity History</span>
            </button>
            
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </button>
            
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'notifications'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Bell className="w-5 h-5" />
              <span>Notifications</span>
            </button>
            
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition ${
                activeTab === 'security'
                  ? 'bg-blue-50 text-blue-700'
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Shield className="w-5 h-5" />
              <span>Security</span>
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
        
        <div className="mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white">
          <h3 className="font-medium mb-2">Upgrade to Premium</h3>
          <p className="text-sm text-blue-100 mb-4">
            Get access to advanced financial tools, personalized insights, and priority support.
          </p>
          <button className="w-full py-2 bg-white text-blue-700 rounded-lg font-medium hover:bg-blue-50 transition">
            View Premium Plans
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="lg:col-span-3">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
                <p className="text-gray-500 text-sm">Update your personal details</p>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        defaultValue="John"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        defaultValue="Doe"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue="john.doe@example.com"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        defaultValue="(555) 123-4567"
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Financial Profile</h2>
                <p className="text-gray-500 text-sm">Customize your financial preferences</p>
              </div>
              
              <div className="p-6">
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Income Range
                    </label>
                    <select className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                      <option>$0 - $25,000</option>
                      <option>$25,001 - $50,000</option>
                      <option selected>$50,001 - $75,000</option>
                      <option>$75,001 - $100,000</option>
                      <option>$100,001 - $150,000</option>
                      <option>$150,001+</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Financial Goals (Select all that apply)
                    </label>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="goal-retirement"
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="goal-retirement" className="ml-2 block text-sm text-gray-700">
                          Retirement Planning
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-investing"
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="goal-investing" className="ml-2 block text-sm text-gray-700">
                          Investment Growth
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-debt"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="goal-debt" className="ml-2 block text-sm text-gray-700">
                          Debt Reduction
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-home"
                          type="checkbox"
                          checked
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="goal-home" className="ml-2 block text-sm text-gray-700">
                          Home Ownership
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="goal-education"
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="goal-education" className="ml-2 block text-sm text-gray-700">
                          Education Funding
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Risk Tolerance
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Conservative</span>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value="3"
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-sm text-gray-500 ml-2">Aggressive</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 mr-3"
                    >
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'financialGoals' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Your Financial Goals</h2>
                  <p className="text-gray-500 text-sm">Track and manage your financial objectives</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium flex items-center hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-1" />
                  Add New Goal
                </button>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-emerald-100">
                        <DollarSign className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Emergency Fund</h3>
                        <p className="text-sm text-gray-500 mt-1">Target: $15,000 by December 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Progress</span>
                      <span>$12,750 of $15,000 (85%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                      <LineChart className="w-4 h-4" />
                      <span>On track</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-blue-100">
                        <DollarSign className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">New Car</h3>
                        <p className="text-sm text-gray-500 mt-1">Target: $25,000 by June 2026</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Progress</span>
                      <span>$8,500 of $25,000 (34%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '34%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1 text-sm text-yellow-600">
                      <LineChart className="w-4 h-4" />
                      <span>Needs attention</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-sm transition">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-purple-100">
                        <DollarSign className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Dream Vacation</h3>
                        <p className="text-sm text-gray-500 mt-1">Target: $5,000 by August 2025</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">Progress</span>
                      <span>$3,200 of $5,000 (64%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '64%' }}></div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1 text-sm text-emerald-600">
                      <LineChart className="w-4 h-4" />
                      <span>Ahead of schedule</span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Goal Progress Overview</h2>
                <p className="text-gray-500 text-sm">Visual summary of all your financial goals</p>
              </div>
              
              <div className="p-6">
                <div className="relative h-80">
                  <svg className="w-full h-full" viewBox="0 0 800 300">
                    {/* Chart elements would go here */}
                    <rect x="100" y="50" width="100" height="200" fill="#10b981" />
                    <rect x="250" y="120" width="100" height="130" fill="#3b82f6" />
                    <rect x="400" y="90" width="100" height="160" fill="#8b5cf6" />
                    <rect x="550" y="180" width="100" height="70" fill="#f59e0b" />
                    
                    <text x="150" y="270" textAnchor="middle" className="text-xs text-gray-600">
                      Emergency Fund
                    </text>
                    <text x="300" y="270" textAnchor="middle" className="text-xs text-gray-600">
                      New Car
                    </text>
                    <text x="450" y="270" textAnchor="middle" className="text-xs text-gray-600">
                      Dream Vacation
                    </text>
                    <text x="600" y="270" textAnchor="middle" className="text-xs text-gray-600">
                      Home Down Payment
                    </text>
                    
                    <text x="150" y="40" textAnchor="middle" className="text-xs font-medium text-gray-700">
                      85%
                    </text>
                    <text x="300" y="110" textAnchor="middle" className="text-xs font-medium text-gray-700">
                      34%
                    </text>
                    <text x="450" y="80" textAnchor="middle" className="text-xs font-medium text-gray-700">
                      64%
                    </text>
                    <text x="600" y="170" textAnchor="middle" className="text-xs font-medium text-gray-700">
                      12%
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Goal Insights</h2>
                <p className="text-gray-500 text-sm">Tips and suggestions to help you achieve your goals faster</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Increase your Emergency Fund savings</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        Increasing your monthly contribution by $100 would help you reach your goal 2 months earlier.
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-md flex items-center">
                          <Check className="w-3 h-3 mr-1" />
                          Apply Suggestion
                        </button>
                        <button className="px-3 py-1 bg-white text-gray-600 text-xs font-medium rounded-md border border-gray-300 flex items-center">
                          <X className="w-3 h-3 mr-1" />
                          Dismiss
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                        <LineChart className="w-4 h-4" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Your Dream Vacation goal is ahead of schedule</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        At your current rate, you'll reach your target 1 month ahead of schedule. Great job!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;