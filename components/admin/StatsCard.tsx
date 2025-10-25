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
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
      <h3 className="text-gray-500 text-xs sm:text-sm font-medium">{title}</h3>
      <p className="text-xl sm:text-2xl lg:text-3xl font-bold mt-1 sm:mt-2">{value}</p>
      <div className={`mt-1 sm:mt-2 text-xs sm:text-sm font-semibold ${isIncrease ? 'text-green-500' : 'text-red-500'}`}>
        {change}
      </div>
    </div>
  );
};