import React, { useState } from 'react';
import { Calculator, Home, User, Percent, TrendingUp, Car, ArrowLeft, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MortgageCalculator from '../components/calculators/MortgageCalculator';
import PersonalLoanCalculator from '../components/calculators/PersonalLoanCalculator';
import SimpleInterestCalculator from '../components/calculators/SimpleInterestCalculator';
import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator';
import VehicleLoanCalculator from '../components/calculators/VehicleLoanCalculator';
import FIRECalculator from '../components/calculators/FIRECalculator';

const calculators = [
  { id: 'mortgage', name: 'Mortgage Loan', icon: Home, component: MortgageCalculator },
  { id: 'personal', name: 'Personal Loan', icon: User, component: PersonalLoanCalculator },
  { id: 'simple', name: 'Simple Interest', icon: Percent, component: SimpleInterestCalculator },
  { id: 'compound', name: 'Compound Interest', icon: TrendingUp, component: CompoundInterestCalculator },
  { id: 'vehicle', name: 'Vehicle Loan', icon: Car, component: VehicleLoanCalculator },
  { id: 'fire', name: 'FIRE Calculator', icon: Flame, component: FIRECalculator },
];

export default function Calculators() {
  const navigate = useNavigate();
  const [activeCalculator, setActiveCalculator] = useState('mortgage');

  const ActiveComponent = calculators.find(calc => calc.id === activeCalculator)?.component || MortgageCalculator;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="mb-4 flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </button>

        <div className="flex flex-col lg:flex-row gap-4">
          {/* Navigation Sidebar */}
          <div className="lg:w-64 bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Calculators</h2>
            </div>
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {calculators.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveCalculator(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    activeCalculator === id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Calculator Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ActiveComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}