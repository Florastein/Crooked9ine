import React from 'react';
import { Task } from '../../data/mockData';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  count: number;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, count }) => {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-text-main dark:text-text-main-dark">{title} ({count})</h2>
        <button className="text-text-secondary dark:text-text-secondary-dark hover:text-text-main">
            <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <div className="space-y-4">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};
