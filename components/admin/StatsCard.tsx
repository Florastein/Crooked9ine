import React from 'react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, changeType }) => {
  const isIncrease = changeType === 'increase';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-3xl font-bold mt-2">{value}</p>
      <div className={`mt-2 text-sm font-semibold ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
};