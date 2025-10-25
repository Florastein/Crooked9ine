import React from 'react';
import { Task } from '../../types';

interface TaskContentProps {
  task: Task;
}

export const TaskContent: React.FC<TaskContentProps> = ({ task }) => {
  return (
    <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-text-main dark:text-text-main-dark mb-4">Description</h2>
      <p className="text-text-secondary dark:text-text-secondary-dark whitespace-pre-wrap">
        {task.description}
      </p>
    </div>
  );
};
