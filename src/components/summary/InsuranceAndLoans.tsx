import React from 'react';
import { Shield } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { InsuranceDetails, LoanDetails } from '../../types/finance';

interface InsuranceAndLoansProps {
  insurance: Partial<InsuranceDetails>;
  loans: Partial<LoanDetails>;
}

export default function InsuranceAndLoans({ insurance, loans }: InsuranceAndLoansProps) {
  return (
    <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-indigo-600" />
        <h3 className="font-semibold">Insurance & Loans</h3>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h4 className="font-medium mb-2">Insurance Coverage</h4>
          <div className="space-y-2">
            {Object.entries(insurance || {}).map(([type, details]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{type}</span>
                <span className="font-medium">{formatCurrency(details?.coverage || 0)}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-2">Monthly EMIs</h4>
          <div className="space-y-2">
            {Object.entries(loans || {}).map(([type, loan]) => (
              <div key={type} className="flex justify-between items-center">
                <span className="text-gray-600 capitalize">{type}</span>
                <span className="font-medium">{formatCurrency(loan?.emiPerMonth || 0)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}