import React from 'react';

interface CalculatorLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function CalculatorLayout({ title, children }: CalculatorLayoutProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}