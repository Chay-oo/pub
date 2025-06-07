import React, { useState, useEffect } from 'react';
import { DollarSign } from 'lucide-react';

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [loanTerm, setLoanTerm] = useState<number>(36);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  
  // Calculate loan payments
  useEffect(() => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm;
    
    if (loanAmount > 0 && monthlyRate > 0 && payments > 0) {
      const x = Math.pow(1 + monthlyRate, payments);
      const monthly = (loanAmount * x * monthlyRate) / (x - 1);
      
      setMonthlyPayment(monthly);
      setTotalPayments(monthly * payments);
      setTotalInterest(monthly * payments - loanAmount);
    } else {
      setMonthlyPayment(0);
      setTotalPayments(0);
      setTotalInterest(0);
    }
  }, [loanAmount, interestRate, loanTerm]);
  
  // Generate amortization data
  const generateAmortizationData = () => {
    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    let totalInterest = 0;
    
    const data = [];
    
    for (let month = 1; month <= loanTerm; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      totalInterest += interestPayment;
      balance -= principalPayment;
      
      if (month % 3 === 0 || month === loanTerm) {
        data.push({
          month,
          payment: monthlyPayment,
          principal: principalPayment,
          interest: interestPayment,
          totalInterest,
          balance: Math.max(0, balance),
        });
      }
    }
    
    return data;
  };
  
  const amortizationData = generateAmortizationData();
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Loan Calculator</h1>
        <p className="mt-2 text-gray-600">
          Calculate your loan payments and see an amortization schedule.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%)
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
                <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Term (months)
                </label>
                <input
                  type="range"
                  id="loanTerm"
                  min="12"
                  max="84"
                  step="12"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>12 mo</span>
                  <span>{loanTerm} mo</span>
                  <span>84 mo</span>
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
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="p-3 rounded-lg bg-white/10">
                    <DollarSign className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Monthly Payment</h3>
                    <div className="mt-2 text-3xl font-bold">${monthlyPayment.toFixed(2)}</div>
                    <p className="mt-1 text-sm text-blue-100">for {loanTerm} months</p>
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-100">Total Principal</p>
                    <p className="text-lg font-semibold text-white">${loanAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-100">Total Interest</p>
                    <p className="text-lg font-semibold text-white">${totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Amortization Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Loan Amortization Schedule</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded-tl-lg">
                      Payment #
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Payment Amount
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Principal
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Interest
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50">
                      Total Interest
                    </th>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 rounded-tr-lg">
                      Remaining Balance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amortizationData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {row.month}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${row.payment.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${row.principal.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${row.interest.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${row.totalInterest.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        ${row.balance.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-base font-medium text-gray-900 mb-2">Payment Breakdown</h4>
              
              <div className="relative h-60">
                <svg className="w-full h-full" viewBox="0 0 500 200">
                  {/* Create a doughnut chart showing principal vs interest */}
                  <defs>
                    <linearGradient id="interestGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="100%" stopColor="#818cf8" />
                    </linearGradient>
                    <linearGradient id="principalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  
                  <g transform="translate(150, 100)">
                    {/* Interest arc */}
                    <path
                      d={`
                        M 0 -80
                        A 80 80 0 ${totalInterest / totalPayments > 0.5 ? 1 : 0} 1 ${Math.cos(2 * Math.PI * (totalInterest / totalPayments)) * 80} ${-Math.sin(2 * Math.PI * (totalInterest / totalPayments)) * 80}
                        L 0 0
                        Z
                      `}
                      fill="url(#interestGradient)"
                    />
                    
                    {/* Principal arc */}
                    <path
                      d={`
                        M ${Math.cos(2 * Math.PI * (totalInterest / totalPayments)) * 80} ${-Math.sin(2 * Math.PI * (totalInterest / totalPayments)) * 80}
                        A 80 80 0 ${totalInterest / totalPayments < 0.5 ? 1 : 0} 1 0 -80
                        L 0 0
                        Z
                      `}
                      fill="url(#principalGradient)"
                    />
                    
                    <text x="0" y="0" textAnchor="middle" className="text-lg font-bold" fill="#1e3a8a">
                      ${Math.round(totalPayments).toLocaleString()}
                    </text>
                    <text x="0" y="20" textAnchor="middle" className="text-xs" fill="#6b7280">
                      Total Payments
                    </text>
                  </g>
                  
                  {/* Legend */}
                  <g transform="translate(300, 80)">
                    <rect x="0" y="0" width="15" height="15" fill="url(#principalGradient)" />
                    <text x="25" y="12" className="text-xs" fill="#374151">
                      Principal: ${Math.round(loanAmount).toLocaleString()} ({Math.round((loanAmount / totalPayments) * 100)}%)
                    </text>
                    
                    <rect x="0" y="30" width="15" height="15" fill="url(#interestGradient)" />
                    <text x="25" y="42" className="text-xs" fill="#374151">
                      Interest: ${Math.round(totalInterest).toLocaleString()} ({Math.round((totalInterest / totalPayments) * 100)}%)
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;