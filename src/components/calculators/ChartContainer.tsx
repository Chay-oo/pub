import React from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartContainerProps {
  children: React.ReactNode;
}

export default function ChartContainer({ children }: ChartContainerProps) {
  return (
    <div className="h-[300px] mt-6">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}