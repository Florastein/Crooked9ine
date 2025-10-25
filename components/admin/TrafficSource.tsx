import React from 'react';

const trafficSources = [
  { source: 'Direct', percentage: 40 },
  { source: 'Referral', percentage: 30 },
  { source: 'Social', percentage: 20 },
  { source: 'Organic', percentage: 10 },
];

export const TrafficSource: React.FC = () => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Traffic Source</h3>
      <div className="space-y-3 sm:space-y-4">
        {trafficSources.map((source, index) => (
          <div key={index}>
            <div className="flex justify-between text-xs sm:text-sm mb-1">
              <span>{source.source}</span>
              <span>{source.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2.5">
              <div 
                className="bg-gray-800 h-1.5 sm:h-2.5 rounded-full" 
                style={{ width: `${source.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};