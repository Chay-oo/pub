import React from 'react';
import { User } from 'lucide-react';
import { PersonalDetails } from '../../types/finance';

interface SummaryHeaderProps {
  personalDetails: PersonalDetails;
}

export default function SummaryHeader({ personalDetails }: SummaryHeaderProps) {
  return (
    <div className="col-span-2 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center space-x-4">
        <User className="w-8 h-8 text-indigo-600" />
        <div>
          <h3 className="font-semibold text-lg">{personalDetails.fullName}</h3>
          <p className="text-gray-600">
            {personalDetails.age} years • {personalDetails.occupation} • 
            {personalDetails.dependents === 0 
              ? ' No dependents'
              : ` ${personalDetails.dependents} dependent${personalDetails.dependents === 1 ? '' : 's'}`}
          </p>
        </div>
      </div>
    </div>
  );
}