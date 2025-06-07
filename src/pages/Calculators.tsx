import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Percent, DollarSign, Car, Briefcase, Calculator, PiggyBank } from 'lucide-react';

// Calculator components
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import InvestmentCalculator from '../components/calculators/InvestmentCalculator';
import SavingsCalculator from '../components/calculators/SavingsCalculator';
import LoanCalculator from '../components/calculators/LoanCalculator';

const CalculatorCard = ({ title, description, icon, path }: { title: string; description: string; icon: React.ReactNode; path: string }) => {
  return (
    <Link 
      to={`/calculators${path}`}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-600 text-sm">{description}</p>
    </Link>
  );
};

const CalculatorHome = () => {
  const calculators = [
    { 
      title: 'Mortgage Calculator', 
      description: 'Calculate monthly payments, interest, and amortization schedule for home loans.',
      icon: <Home className="w-6 h-6" />,
      path: '/mortgage'
    },
    { 
      title: 'Investment Calculator', 
      description: 'Project future investment growth with different contribution scenarios.',
      icon: <Briefcase className="w-6 h-6" />,
      path: '/investment'
    },
    { 
      title: 'Savings Calculator', 
      description: 'Plan your savings goals and visualize your progress over time.',
      icon: <PiggyBank className="w-6 h-6" />,
      path: '/savings'
    },
    { 
      title: 'Loan Calculator', 
      description: 'Understand your loan terms, payments, and total interest costs.',
      icon: <DollarSign className="w-6 h-6" />,
      path: '/loan'
    },
    { 
      title: 'Car Loan Calculator', 
      description: 'Calculate auto loan payments and compare financing options.',
      icon: <Car className="w-6 h-6" />,
      path: '/car-loan'
    },
    { 
      title: 'Compound Interest', 
      description: 'See the power of compound interest on your investments over time.',
      icon: <Percent className="w-6 h-6" />,
      path: '/compound-interest'
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Financial Calculators</h1>
        <p className="mt-2 text-gray-600">
          Use our suite of calculators to make informed financial decisions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calc, index) => (
          <CalculatorCard 
            key={index}
            title={calc.title}
            description={calc.description}
            icon={calc.icon}
            path={calc.path}
          />
        ))}
      </div>
    </div>
  );
};

const Calculators = () => {
  const location = useLocation();
  
  return (
    <Routes>
      <Route index element={<CalculatorHome />} />
      <Route path="/mortgage" element={<MortgageCalculator />} />
      <Route path="/investment" element={<InvestmentCalculator />} />
      <Route path="/savings" element={<SavingsCalculator />} />
      <Route path="/loan" element={<LoanCalculator />} />
      <Route path="/car-loan" element={<MortgageCalculator />} />
      <Route path="/compound-interest" element={<InvestmentCalculator />} />
    </Routes>
  );
};

export default Calculators;