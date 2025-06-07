import React, { useState, useEffect } from 'react';
import { TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';

const InvestmentCalculator = () => {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualReturn, setAnnualReturn] = useState<number>(7);
  const [years, setYears] = useState<number>(20);
  const [futureValue, setFutureValue] = useState<number>(0);
  const [totalContributions, setTotalContributions] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  // Calculate investment growth
  useEffect(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const months = years * 12;
    let fv = initialInvestment;
    
    for (let i = 0; i < months; i++) {
      fv = fv * (1 + monthlyRate) + monthlyContribution;
    }
    
    const totalCont = initialInvestment + (monthlyContribution * months);
    
    setFutureValue(fv);
    setTotalContributions(totalCont);
    setTotalInterest(fv - totalCont);
  }, [initialInvestment, monthlyContribution, annualReturn, years]);
  
  // Generate data for the growth chart
  const generateGrowthData = () => {
    const monthlyRate = annualReturn / 100 / 12;
    const yearLabels = Array.from({ length: years + 1 }, (_, i) => i);
    const valueData = [initialInvestment];
    const contributionData = [initialInvestment];
    
    for (let year = 1; year <= years; year++) {
      let fv = valueData[year - 1];
      let contTotal = contributionData[year - 1];
      
      for (let month = 0; month < 12; month++) {
        fv = fv * (1 + monthlyRate) + monthlyContribution;
        contTotal += monthlyContribution;
      }
      
      valueData.push(fv);
      contributionData.push(contTotal);
    }
    
    return { yearLabels, valueData, contributionData };
  };
  
  const { yearLabels, valueData, contributionData } = generateGrowthData();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Investment Growth Calculator</h1>
        <p className="mt-2 text-gray-600">
          Visualize how your investments can grow over time with the power of compound interest.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="initialInvestment" className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Investment
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="initialInvestment"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
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
                <label htmlFor="annualReturn" className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Return (%)
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <input
                    type="number"
                    step="0.1"
                    id="annualReturn"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
                  Time Period (years)
                </label>
                <input
                  type="range"
                  id="years"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 yr</span>
                  <span>{years} yrs</span>
                  <span>40 yrs</span>
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
          
          <div className="mt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gradient-to-br from-blue-700 to-indigo-800 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Future Value</h3>
                    <p className="mt-1 text-sm text-blue-100">After {years} years of growth</p>
                    <div className="mt-2 text-3xl font-bold">${Math.round(futureValue).toLocaleString()}</div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-emerald-100">
                      <DollarSign className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Total Contributions</h3>
                      <div className="mt-1 text-lg font-bold text-gray-900">${Math.round(totalContributions).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-amber-100">
                      <Clock className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Interest Earned</h3>
                      <div className="mt-1 text-lg font-bold text-gray-900">${Math.round(totalInterest).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results and Charts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Investment Growth</h3>
            
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
                  
                  {yearLabels.map((_, i) => {
                    if (i % 5 === 0 || i === yearLabels.length - 1) {
                      return (
                        <line
                          key={`v-${i}`}
                          x1={60 + (i * 720) / (yearLabels.length - 1)}
                          y1="40"
                          x2={60 + (i * 720) / (yearLabels.length - 1)}
                          y2="320"
                          stroke="#e5e7eb"
                          strokeDasharray="4"
                        />
                      );
                    }
                    return null;
                  })}
                </g>
                
                {/* Y-axis labels */}
                <g className="y-axis">
                  {[0, 1, 2, 3, 4].map((i) => {
                    const value = Math.round((futureValue * (4 - i)) / 4);
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
                  {yearLabels.map((year, i) => {
                    if (i % 5 === 0 || i === yearLabels.length - 1) {
                      return (
                        <text
                          key={`x-${i}`}
                          x={60 + (i * 720) / (yearLabels.length - 1)}
                          y="335"
                          textAnchor="middle"
                          className="text-xs text-gray-500"
                        >
                          Year {year}
                        </text>
                      );
                    }
                    return null;
                  })}
                </g>
                
                {/* Contribution area */}
                <path
                  d={`
                    M ${60} ${320}
                    ${contributionData.map((value, i) => {
                      const x = 60 + (i * 720) / (contributionData.length - 1);
                      const y = 320 - (value / futureValue) * 280;
                      return `L ${x} ${y}`;
                    }).join(' ')}
                    L ${60 + 720} ${320}
                    Z
                  `}
                  fill="#c7d2fe"
                  opacity="0.6"
                />
                
                {/* Growth area */}
                <path
                  d={`
                    M ${60} ${320}
                    ${valueData.map((value, i) => {
                      const x = 60 + (i * 720) / (valueData.length - 1);
                      const y = 320 - (value / futureValue) * 280;
                      return `L ${x} ${y}`;
                    }).join(' ')}
                    L ${60 + 720} ${320}
                    Z
                  `}
                  fill="#818cf8"
                  opacity="0.8"
                />
                
                {/* Growth line */}
                <polyline
                  points={valueData
                    .map((value, i) => {
                      const x = 60 + (i * 720) / (valueData.length - 1);
                      const y = 320 - (value / futureValue) * 280;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3"
                />
                
                {/* Contribution line */}
                <polyline
                  points={contributionData
                    .map((value, i) => {
                      const x = 60 + (i * 720) / (contributionData.length - 1);
                      const y = 320 - (value / futureValue) * 280;
                      return `${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                  strokeDasharray="4"
                />
                
                {/* Data points */}
                {valueData.map((value, i) => {
                  if (i % 5 === 0 || i === valueData.length - 1) {
                    const x = 60 + (i * 720) / (valueData.length - 1);
                    const y = 320 - (value / futureValue) * 280;
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#4f46e5"
                      />
                    );
                  }
                  return null;
                })}
                
                {/* Chart labels */}
                <text x="400" y="20" textAnchor="middle" className="text-sm font-medium text-gray-700">
                  Investment Growth Over {years} Years
                </text>
                
                {/* Legend */}
                <g className="legend" transform="translate(620, 60)">
                  <circle cx="0" cy="0" r="4" fill="#4f46e5" />
                  <text x="10" y="0" dominantBaseline="middle" className="text-xs text-gray-600">
                    Total Value
                  </text>
                  
                  <line x1="-5" y1="20" x2="5" y2="20" stroke="#10b981" strokeWidth="2" strokeDasharray="4" />
                  <text x="10" y="20" dominantBaseline="middle" className="text-xs text-gray-600">
                    Contributions
                  </text>
                  
                  <rect x="-5" y="35" width="10" height="10" fill="#818cf8" opacity="0.8" />
                  <text x="10" y="40" dominantBaseline="middle" className="text-xs text-gray-600">
                    Growth
                  </text>
                </g>
              </svg>
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-100 pt-6">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-indigo-900">5 Years</h4>
                    <p className="text-xs text-indigo-700 mt-1">Future Value</p>
                    <p className="text-lg font-bold text-indigo-900 mt-1">
                      ${Math.round(valueData[Math.min(5, valueData.length - 1)]).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-indigo-900">10 Years</h4>
                    <p className="text-xs text-indigo-700 mt-1">Future Value</p>
                    <p className="text-lg font-bold text-indigo-900 mt-1">
                      ${Math.round(valueData[Math.min(10, valueData.length - 1)]).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-indigo-100">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-indigo-900">15 Years</h4>
                    <p className="text-xs text-indigo-700 mt-1">Future Value</p>
                    <p className="text-lg font-bold text-indigo-900 mt-1">
                      ${Math.round(valueData[Math.min(15, valueData.length - 1)]).toLocaleString()}
                    </p>
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

export default InvestmentCalculator;