import React, { useState, useMemo } from 'react';

interface Deadline {
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
}

interface CalendarProps {
  deadlines: Deadline[];
}

export const Calendar: React.FC<CalendarProps> = ({ deadlines }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  // ✅ Create a map of YYYY-MM-DD → priority
  const deadlineMap = useMemo(() => {
    const map = new Map<string, 'low' | 'medium' | 'high'>();
    deadlines.forEach(dl => {
      const dateKey = new Date(dl.dueDate).toISOString().split('T')[0];
      map.set(dateKey, dl.priority);
    });
    return map;
  }, [deadlines]);

  const days = [];

  // Empty slots before the 1st day of the month
  for (let i = 0; i < startingDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-1"></div>);
  }

  // Days of the current month
  for (let i = 1; i <= daysInMonth; i++) {
    const dayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
    const dateKey = dayDate.toISOString().split('T')[0];
    const priority = deadlineMap.get(dateKey);

    // ✅ Apply color based on deadline priority
    let deadlineClass = '';
    if (priority === 'high') deadlineClass = 'bg-red-500 text-white';
    else if (priority === 'medium') deadlineClass = 'bg-yellow-400 text-black';
    else if (priority === 'low') deadlineClass = 'bg-green-500 text-white';

    days.push(
      <div
        key={i}
        className={`flex items-center justify-center h-8 w-8 text-sm rounded-full transition-colors duration-200 ${deadlineClass}`}
        title={deadlines.find(dl => new Date(dl.dueDate).toISOString().split('T')[0] === dateKey)?.title || ''}
      >
        {i}
      </div>
    );
  }

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <h3 className="font-semibold text-text-main dark:text-text-main-dark">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>

        <button
          onClick={handleNextMonth}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-text-secondary dark:text-text-secondary-dark">
        {daysOfWeek.map(day => (
          <div key={day} className="font-medium">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};
