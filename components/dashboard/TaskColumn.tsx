import React, { useState } from 'react';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  title: string;
  tasks: Task[];
  count: number;
  onTaskClick: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, count, onTaskClick, onDeleteRequest, onDrop, onDragOver }) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  return (
    <div
      className={`flex-1 p-2 rounded-lg transition-colors ${isDraggedOver ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
      onDrop={(e) => {
        onDrop(e);
        setIsDraggedOver(false);
      }}
      onDragOver={onDragOver}
      onDragEnter={(e) => {
        e.preventDefault();
        setIsDraggedOver(true);
      }}
      onDragLeave={() => setIsDraggedOver(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-text-main dark:text-text-main-dark">{title} ({count})</h2>
        <button className="text-text-secondary dark:text-text-secondary-dark hover:text-text-main">
            <span className="material-symbols-outlined">more_horiz</span>
        </button>
      </div>
      <div className="space-y-4 min-h-[100px]">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} onTaskClick={onTaskClick} onDeleteRequest={onDeleteRequest} />
        ))}
        {tasks.length === 0 && (
            <div className="flex items-center justify-center text-sm text-center text-text-secondary dark:text-text-secondary-dark p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
                Drag tasks here
            </div>
        )}
      </div>
    </div>
  );
};