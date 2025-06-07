import React from 'react';
import { 
  PiggyBank, 
  TrendingUp, 
  Gem, 
  AlertCircle, 
  CreditCard,
  Calendar,
  ChevronRight,
  ArrowRight,
  CheckCircle,
  Bell,
  Target 
} from 'lucide-react';

// Components
import FinancialScoreCard from '../components/dashboard/FinancialScoreCard';
import AccountBalanceCard from '../components/dashboard/AccountBalanceCard';
import FinancialGoalCard from '../components/dashboard/FinancialGoalCard';
import SpendingActivityCard from '../components/dashboard/SpendingActivityCard';
import MarketInsightsCard from '../components/dashboard/MarketInsightsCard';
import FinancialTipsCard from '../components/dashboard/FinancialTipsCard';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover"></div>
        </div>
        <div className="relative px-6 py-10 sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">
              Welcome back, John!
            </h1>
            <p className="mt-2 text-lg text-blue-100">
              Your financial journey is looking good. You're on track with your savings goal for this month.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="inline-flex items-center px-5 py-3 border border-transparent text-base font-medium rounded-lg bg-white text-blue-700 hover:bg-blue-50 transition shadow-sm">
                <TrendingUp className="mr-2 h-5 w-5" />
                View Financial Summary
              </button>
              <button className="inline-flex items-center px-5 py-3 border border-blue-300 text-base font-medium rounded-lg text-white hover:bg-blue-800 transition">
                <Target className="mr-2 h-5 w-5" />
                Set New Goal
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-y-1/4 translate-x-1/4 opacity-20">
          <div className="w-64 h-64 rounded-full bg-blue-400"></div>
        </div>
      </div>

      {/* Financial Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <FinancialScoreCard />
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
            <h3 className="font-medium text-lg text-gray-900 mb-4">Upcoming</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-red-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Credit Card Payment</p>
                  <p className="text-sm text-gray-500">Due in 3 days</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">$459.99</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Subscription Renewal</p>
                  <p className="text-sm text-gray-500">Due in 5 days</p>
                  <p className="text-sm font-medium text-gray-900 mt-1">$14.99</p>
                </div>
              </div>
              <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                View all <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AccountBalanceCard 
          title="Checking Account"
          balance="5,940.58" 
          change="+2.3%"
          trend="up"
          icon={<PiggyBank className="w-5 h-5" />}
          color="blue"
        />
        <AccountBalanceCard 
          title="Savings Account"
          balance="24,786.33" 
          change="+4.1%"
          trend="up"
          icon={<Gem className="w-5 h-5" />}
          color="emerald"
        />
        <AccountBalanceCard 
          title="Investment Portfolio"
          balance="128,456.98" 
          change="-0.8%"
          trend="down"
          icon={<TrendingUp className="w-5 h-5" />}
          color="purple"
        />
      </div>

      {/* Financial Goals */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Financial Goals</h2>
          <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center text-sm">
            See all goals <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FinancialGoalCard 
            title="Emergency Fund"
            target={15000}
            current={12750}
            icon={<AlertCircle className="w-5 h-5" />}
            color="amber"
          />
          <FinancialGoalCard 
            title="Dream Vacation"
            target={5000}
            current={3200}
            icon={<PiggyBank className="w-5 h-5" />}
            color="blue"
          />
          <FinancialGoalCard 
            title="New Car"
            target={25000}
            current={8500}
            icon={<Target className="w-5 h-5" />}
            color="emerald"
          />
        </div>
      </div>

      {/* Spending Activity and Market Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingActivityCard />
        <MarketInsightsCard />
      </div>
      
      {/* Financial Tips */}
      <FinancialTipsCard />
    </div>
  );
};

export default Dashboard;