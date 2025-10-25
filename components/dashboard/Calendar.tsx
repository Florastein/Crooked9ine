import React, { useState, useMemo } from 'react';

interface CalendarProps {
    deadlines: string[];
}

export const Calendar: React.FC<CalendarProps> = ({ deadlines }) => {
  const getInitialDate = () => {
    if (deadlines && deadlines.length > 0) {
      // Sort to find the earliest deadline
      const sortedDeadlines = [...deadlines].sort();
      const [year, month, day] = sortedDeadlines[0].split('-').map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  };
  
  const [currentDate, setCurrentDate] = useState(getInitialDate);

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
  
  const deadlineSet = useMemo(() => new Set(deadlines), [deadlines]);
  
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const days = [];
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-1"></div>);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    dayDate.setHours(0,0,0,0);
    const dateString = dayDate.toISOString().split('T')[0];
    const isToday = dayDate.getTime() === today.getTime();
    
    let baseClass = '';
    let ringClass = '';

    if (deadlineSet.has(dateString)) {
        const timeDiff = dayDate.getTime() - today.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (dayDiff < 0) {
            baseClass = 'bg-gray-400 dark:bg-gray-600 text-white opacity-60'; // Past due
        } else if (dayDiff <= 2) {
            baseClass = 'bg-red-500 text-white'; // Due in 0-2 days
        } else if (dayDiff <= 7) {
            baseClass = 'bg-orange-500 text-white'; // Due in 3-7 days
        } else {
            baseClass = 'bg-yellow-400 text-black'; // Due later
        }
    }
    
    if (isToday) {
        ringClass = 'ring-2 ring-primary dark:ring-blue-400 ring-offset-2 dark:ring-offset-card-dark';
        if (!baseClass) {
            baseClass = 'text-primary dark:text-blue-400 font-bold';
        }
    }

    days.push(
      <div key={i} className={`flex items-center justify-center h-8 w-8 text-sm rounded-full transition-colors ${baseClass} ${ringClass}`}>
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
