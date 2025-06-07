import React, { useState, useEffect } from 'react';
import { Info, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(3.5);
  const [term, setTerm] = useState<number>(30);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [principal, setPrincipal] = useState<number>(0);
  const [amortizationData, setAmortizationData] = useState<any[]>([]);
  
  // Calculate mortgage payments
  useEffect(() => {
    const calculateMortgage = () => {
      const principal = loanAmount - downPayment;
      const monthlyRate = interestRate / 100 / 12;
      const payments = term * 12;
      
      if (principal > 0 && monthlyRate > 0 && payments > 0) {
        const x = Math.pow(1 + monthlyRate, payments);
        const monthly = (principal * x * monthlyRate) / (x - 1);
        
        setMonthlyPayment(monthly);
        setTotalInterest(monthly * payments - principal);
        setTotalCost(monthly * payments);
        setPrincipal(principal);

        // Generate amortization data for the chart
        const data = [];
        let balance = principal;
        let totalPaid = 0;
        let totalInterestPaid = 0;

        for (let year = 0; year <= term; year++) {
          if (year === 0) {
            data.push({
              year,
              balance,
              totalPaid: 0,
              totalInterestPaid: 0,
            });
            continue;
          }

          for (let month = 1; month <= 12; month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthly - interestPayment;
            balance -= principalPayment;
            totalPaid += monthly;
            totalInterestPaid += interestPayment;
          }

          data.push({
            year,
            balance: Math.max(0, balance),
            totalPaid,
            totalInterestPaid,
          });
        }

        setAmortizationData(data);
      }
    };
    
    calculateMortgage();
  }, [loanAmount, downPayment, interestRate, term]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mortgage Calculator</h1>
        <p className="mt-2 text-gray-600">
          Calculate your monthly mortgage payment, interest costs, and amortization schedule.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calculator Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="space-y-6">
              <div>
                <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Amount *
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
                <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 mb-1">
                  Down Payment *
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="downPayment"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 mb-1">
                  Interest Rate (%) *
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
                <label htmlFor="term" className="block text-sm font-medium text-gray-700 mb-1">
                  Term (years) *
                </label>
                <select
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value={10}>10 years</option>
                  <option value={15}>15 years</option>
                  <option value={20}>20 years</option>
                  <option value={25}>25 years</option>
                  <option value={30}>30 years</option>
                </select>
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
          
          <div className="mt-6 bg-blue-50 rounded-xl p-4 border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-0.5">
                <Info className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-medium">Pro Tip</p>
                <p className="mt-1">A down payment of at least 20% can help you avoid private mortgage insurance (PMI) and lower your monthly payments.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results and Charts */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Summary</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Principal:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(principal)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Monthly Payment:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(monthlyPayment)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Interest:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalInterest)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500">Total Cost:</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(totalCost)}</p>
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="text-base font-medium text-gray-900 mb-4">Mortgage Balance Over Time</h4>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={amortizationData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Years', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      label={{ value: 'Amount', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Remaining Balance"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalPaid"
                      name="Total Paid"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalInterestPaid"
                      name="Interest Paid"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
              <button className="text-sm text-gray-700 flex items-center hover:text-blue-600 transition-colors">
                <Info className="w-4 h-4 mr-1" />
                <span>How is this calculated?</span>
              </button>
              
              <button className="flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium">
                <Download className="w-4 h-4 mr-1" />
                <span>Export Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;