import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign, Target, TrendingUp } from 'lucide-react';

const SavingsCalculator = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(1000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(200);
  const [interestRate, setInterestRate] = useState<number>(2.5);
  const [targetAmount, setTargetAmount] = useState<number>(10000);
  const [months, setMonths] = useState<number>(36);
  const [finalBalance, setFinalBalance] = useState<number>(0);
  const [monthsToTarget, setMonthsToTarget] = useState<number>(0);
  
  // Calculate savings growth
  useEffect(() => {
    const calculateSavings = () => {
      const monthlyRate = interestRate / 100 / 12;
      
      // Calculate final balance after specified months
      let balance = initialDeposit;
      for (let i = 0; i < months; i++) {
        balance = balance * (1 + monthlyRate) + monthlyContribution;
      }
      setFinalBalance(balance);
      
      // Calculate months to reach target
      balance = initialDeposit;
      let targetMonths = 0;
      while (balance < targetAmount && targetMonths < 600) { // Cap at 50 years
        balance = balance * (1 + monthlyRate) + monthlyContribution;
        targetMonths++;
      }
      setMonthsToTarget(targetMonths);
    };
    
    calculateSavings();
  }, [initialDeposit, monthlyContribution, interestRate, months, targetAmount]);
  
  // Generate data for the savings chart
  const generateSavingsData = () => {
    const monthlyRate = interestRate / 100 / 12;
    const monthLabels = Array.from({ length: months + 1 }, (_, i) => i);
    const balanceData = [initialDeposit];
    const contributionsData = [initialDeposit];
    
    let balance = initialDeposit;
    let contributions = initialDeposit;
    
    for (let i = 1; i <= months; i++) {
      contributions += monthlyContribution;
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      
      balanceData.push(balance);
      contributionsData.push(contributions);
    }
    
    return { monthLabels, balanceData, contributionsData };
  };
  
  const { monthLabels, balanceData, contributionsData } = generateSavingsData();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Savings Goal Calculator</h1>
        <p className="mt-2 text-gray-600">
          Plan how to reach your savings goals and track your progress.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="initialDeposit" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Deposit
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="initialDeposit"
                    value={initialDeposit}
                    onChange={(e) => setInitialDeposit(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Contribution
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="monthlyContribution"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Interest Rate (%)
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.1"
                    id="interestRate"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="months" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period (months)
                </label>
                <input
                  type="range"
                  id="months"
                  min="12"
                  max="120"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>{Math.round(months / 12 * 10) / 10} years</span>
                  <span>10 years</span>
                </div>
              </div>
              
              <div>
                <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Target Amount
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="targetAmount"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Calculate
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900">Your Savings Goal</h3>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="flex flex-col items-center mb-4">
                <div className="text-3xl font-bold text-gray-900">${targetAmount.toLocaleString()}</div>
                <div className="text-sm text-gray-500 mt-1">Target Amount</div>
              </div>
              
              <div className="w-full h-3 bg-gray-200 rounded-full mb-2">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{ width: `${Math.min(100, (finalBalance / targetAmount) * 100)}%` }}
                ></div>
              </div>
              
              <div className="text-center text-sm text-gray-600">
                {finalBalance >= targetAmount ? (
                  <span className="text-emerald-600 font-medium">Goal will be reached!</span>
                ) : (
                  <span>
                    You'll reach {Math.round((finalBalance / targetAmount) * 100)}% of your goal in {months} months
                  </span>
                )}
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Time to reach goal</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {monthsToTarget > 0 ? (
                        <>
                          <span className="font-medium">{Math.floor(monthsToTarget / 12)} years and {monthsToTarget % 12} months</span>
                          <span> at your current savings rate.</span>
                        </>
                      ) : (
                        <span className="font-medium">Goal already achieved!</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results and Charts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Savings Growth</h3>
            
            <div className="relative h-96">
              <svg className="w-full h-full" viewBox="0 0 800 350">
                {/* Grid lines */}
                <g className="grid">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <line
                      key={`h-${i}`}
                      x1="60"
                      y1={40 + i * 70}
                      x2="780"
                      y2={40 + i * 70}
                      stroke="#e5e7eb"
                      strokeDasharray="4"
                    />
                  ))}
                  
                  {monthLabels.filter((_, i) => i % 6 === 0 || i === monthLabels.length - 1).map((_, i, filtered) => (
                    <line
                      key={`v-${i}`}
                      x1={60 + (i * 720) / (filtered.length - 1)}
                      y1="40"
                      x2={60 + (i * 720) / (filtered.length - 1)}
                      y2="320"
                      stroke="#e5e7eb"
                      strokeDasharray="4"
                    />
                  ))}
                </g>
                
                {/* Target line */}
                <line
                  x1="60"
                  y1={320 - (targetAmount / (Math.max(...balanceData) * 1.1)) * 280}
                  x2="780"
                  y2={320 - (targetAmount / (Math.max(...balanceData) * 1.1)) * 280}
                  stroke="#ef4444"
                  strokeWidth="2"
                  strokeDasharray="6"
                />
                
                <text
                  x="770"
                  y={315 - (targetAmount / (Math.max(...balanceData) * 1.1)) * 280}
                  textAnchor="end"
                  dominantBaseline="middle"
                  fill="#ef4444"
                  className="text-xs font-medium"
                >
                  Target: ${targetAmount.toLocaleString()}
                </text>
                
                {/* Y-axis labels */}
                <g className="y-axis">
                  {[0, 1, 2, 3, 4].map((i) => {
                    const value = Math.round(
                      (Math.max(...balanceData) * 1.1 * (4 - i)) / 4
                    );
                    return (
                      <text
                        key={`y-${i}`}
                        x="55"
                        y={40 + i * 70}
                        textAnchor="end"
                        dominantBaseline="middle"
                        className="text-xs text-gray-500"
                      >
                        ${value.toLocaleString()}
                      </text>
                    );
                  })}
                </g>
                
                {/* X-axis labels */}
                <g className="x-axis">
                  {monthLabels.filter((_, i) => i % 6 === 0 || i === monthLabels.length - 1).map((month, i, filtered) => (
                    <text
                      key={`x-${i}`}
                      x={60 + (i * 720) / (filtered.length - 1)}
                      y="335"
                      textAnchor="middle"
                      className="text-xs text-gray-500"
                    >
                      {month} mo
                    </text>
                  ))}
                </g>
                
                {/* Contribution area */}
                <path
                  d={`
                    M ${60} ${320}
                    ${contributionsData.map((value, i) => {
                      if (i % 3 === 0 || i === contributionsData.length - 1) {
                        const x = 60 + (i * 720) / (contributionsData.length - 1);
                        const y = 320 - (value / (Math.max(...balanceData) * 1.1)) * 280;
                        return `L ${x} ${y}`;
                      }
                      return '';
                    }).join(' ')}
                    L ${60 + 720} ${320}
                    Z
                  `}
                  fill="#bfdbfe"
                  opacity="0.6"
                />
                
                {/* Balance area */}
                <path
                  d={`
                    M ${60} ${320}
                    ${balanceData.map((value, i) => {
                      if (i % 3 === 0 || i === balanceData.length - 1) {
                        const x = 60 + (i * 720) / (balanceData.length - 1);
                        const y = 320 - (value / (Math.max(...balanceData) * 1.1)) * 280;
                        return `L ${x} ${y}`;
                      }
                      return '';
                    }).join(' ')}
                    L ${60 + 720} ${320}
                    Z
                  `}
                  fill="#93c5fd"
                  opacity="0.8"
                />
                
                {/* Balance line */}
                <polyline
                  points={balanceData
                    .filter((_, i) => i % 3 === 0 || i === balanceData.length - 1)
                    .map((value, i, filtered) => {
                      const x = 60 + (i * 720) / (filtered.length - 1);
                      const y = 320 - (value / (Math.max(...balanceData) * 1.1)) * 280;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                />
                
                {/* Contribution line */}
                <polyline
                  points={contributionsData
                    .filter((_, i) => i % 3 === 0 || i === contributionsData.length - 1)
                    .map((value, i, filtered) => {
                      const x = 60 + (i * 720) / (filtered.length - 1);
                      const y = 320 - (value / (Math.max(...balanceData) * 1.1)) * 280;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                
                {/* Data points */}
                {balanceData
                  .filter((_, i) => i % 6 === 0 || i === balanceData.length - 1)
                  .map((value, i, filtered) => {
                    const x = 60 + (i * 720) / (filtered.length - 1);
                    const y = 320 - (value / (Math.max(...balanceData) * 1.1)) * 280;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#3b82f6"
                      />
                    );
                  })}
                
                {/* Chart title */}
                <text x="400" y="20" textAnchor="middle" className="text-sm font-medium text-gray-700">
                  Savings Growth Over {Math.round(months / 12 * 10) / 10} Years
                </text>
                
                {/* Legend */}
                <g className="legend" transform="translate(620, 60)">
                  <circle cx="0" cy="0" r="4" fill="#3b82f6" />
                  <text x="10" y="0" dominantBaseline="middle" className="text-xs text-gray-600">
                    Total Balance
                  </text>
                  
                  <line x1="-5" y1="20" x2="5" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                  <text x="10" y="20" dominantBaseline="middle" className="text-xs text-gray-600">
                    Contributions
                  </text>
                  
                  <line x1="-5" y1="40" x2="5" y2="40" stroke="#ef4444" strokeWidth="2" strokeDasharray="6" />
                  <text x="10" y="40" dominantBaseline="middle" className="text-xs text-gray-600">
                    Target
                  </text>
                </g>
              </svg>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
              <div className="bg-white p-4 rounded-lg border border-blue-100">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-blue-100">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Final Balance</h4>
                    <p className="text-lg font-bold text-blue-700 mt-1">
                      ${Math.round(finalBalance).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">After {months} months</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-emerald-100">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-emerald-100">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Total Contributions</h4>
                    <p className="text-lg font-bold text-emerald-700 mt-1">
                      ${(initialDeposit + monthlyContribution * months).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">Your deposits</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <Target className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Interest Earned</h4>
                    <p className="text-lg font-bold text-indigo-700 mt-1">
                      ${Math.round(finalBalance - initialDeposit - (monthlyContribution * months)).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">From {interestRate}% APR</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsCalculator;