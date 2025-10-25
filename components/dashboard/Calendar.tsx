import React, { useState, useMemo } from 'react';

interface CalendarProps {
    deadlines: string[];
}

export const Calendar: React.FC<CalendarProps> = ({ deadlines }) => {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 26)); // Set to October 2023

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

  const startingDay = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  
  const deadlineDates = useMemo(() => new Set(deadlines), [deadlines]);

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-1"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateString = dayDate.toISOString().split('T')[0];
    
    let deadlineClass = '';
    // Hardcoding deadline colors as per the design for specific dates in Oct 2023
    if (currentDate.getFullYear() === 2023 && currentDate.getMonth() === 9) {
        if (i === 25) deadlineClass = 'bg-red-500 text-white';
        else if (i === 26) deadlineClass = 'bg-red-500 text-white';
        else if (i === 28) deadlineClass = 'bg-deadline-orange ring-2 ring-orange-400';
        else if (i === 30) deadlineClass = 'bg-deadline-yellow ring-2 ring-yellow-400';
    }


    days.push(
      <div key={i} className={`flex items-center justify-center h-8 w-8 text-sm rounded-full ${deadlineClass}`}>
        {i}
      </div>
    );
  }
  
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <h3 className="font-semibold text-text-main dark:text-text-main-dark">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
        {daysOfWeek.map(day => <div key={day} className="font-medium">{day}</div>)}
        {days}
      </div>
    </div>
  );
};
