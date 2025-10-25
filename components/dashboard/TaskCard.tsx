import React, { useState } from 'react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  onDeleteRequest: (task: Task) => void;
}

const priorityColors = {
  High: 'bg-red-500',
  Medium: 'bg-yellow-500',
  Low: 'bg-green-500',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskClick, onDeleteRequest }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <div 
      onClick={() => onTaskClick(task)}
      className={`group relative bg-card dark:bg-card-dark p-4 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg transition-all ${isDragging ? 'opacity-50 scale-95' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-md text-text-main dark:text-text-main-dark mb-2 pr-4">{task.title}</h3>
        <span className={`px-2 py-1 text-xs font-semibold text-white rounded-full ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>
      <p className="text-sm text-text-secondary dark:text-text-secondary-dark mb-4 line-clamp-2">{task.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {task.assignees.map(user => (
            <img 
              key={user.id}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-gray-800"
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} 
              alt={user.name}
              title={user.name}
            />
          ))}
        </div>
        <div className="text-xs text-text-secondary dark:text-text-secondary-dark flex items-center">
            <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
            <span>{new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        </div>
      </div>
       <button
        onClick={(e) => {
          e.stopPropagation();
          onDeleteRequest(task);
        }}
        className="absolute top-3 right-3 p-1 rounded-full text-text-secondary dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Delete task ${task.title}`}
      >
        <span className="material-symbols-outlined text-base">delete</span>
      </button>
    </div>
  );
};