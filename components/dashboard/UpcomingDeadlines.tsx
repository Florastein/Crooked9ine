import React from 'react';
import { Calendar } from './Calendar';

interface Deadline {
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface UpcomingDeadlinesProps {
  deadlines: Deadline[];
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ deadlines }) => {
  return (
    <div className="bg-card dark:bg-card-dark p-4 rounded-lg shadow-md h-full">
      <h2 className="font-bold text-lg mb-4 text-text-main dark:text-text-main-dark">
        Upcoming Deadlines
      </h2>

      {deadlines.length > 0 ? (
        <Calendar deadlines={deadlines} />
      ) : (
        <p className="text-gray-500 text-sm">No upcoming deadlines.</p>
      )}
    </div>
  );
};
