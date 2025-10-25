import React from 'react';
import { Calendar } from './Calendar';

interface UpcomingDeadlinesProps {
    deadlines: string[];
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  return (
    <div className="bg-card dark:bg-card-dark p-4 rounded-lg shadow-md h-full">
      <h2 className="font-bold text-lg mb-4 text-text-main dark:text-text-main-dark">Upcoming Deadlines</h2>
      <Calendar deadlines={deadlines} />
    </div>
  );
};
