import React from 'react';
import { Task } from '../../types';
import { Breadcrumbs } from './Breadcrumbs';

interface DetailsHeaderProps {
  task: Task;
  onDelete: () => void;
}

export const DetailsHeader: React.FC<DetailsHeaderProps> = ({ task, onDelete }) => {
  return (
    <header>
      <Breadcrumbs project={task.project} sprint={task.sprint} title={task.title} />
      <div className="flex justify-between items-center mt-4">
        <h1 className="text-3xl font-bold text-text-main dark:text-text-main-dark">{task.title}</h1>
        <div className="flex items-center space-x-2">
          <button onClick={onDelete} className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
            <span className="material-symbols-outlined text-lg">delete</span>
            <span>Delete</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined text-lg">share</span>
            <span>Share</span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
      </div>
    </header>
  );
};