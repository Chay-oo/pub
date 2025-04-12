import React from 'react';

interface ResultItem {
  label: string;
  value: string;
}

interface CalculatorResultsProps {
  results: ResultItem[];
}

export default function CalculatorResults({ results }: CalculatorResultsProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Summary</h3>
      <div className="space-y-2">
        {results.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{item.label}:</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}