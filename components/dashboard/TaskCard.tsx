import React, { useState } from 'react';
import { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onTaskClick: (task: Task) => void;
  // FIX: Added onDeleteRequest prop to handle deletion.
  onDeleteRequest: (task: Task) => void;
}

const colorMap = {
    red: 'border-l-task-red',
    yellow: 'border-l-task-yellow',
    green: 'border-l-task-green',
    blue: 'border-l-task-blue',
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

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteRequest(task);
  };

  return (
    <div 
      onClick={() => onTaskClick(task)}
      className={`bg-card dark:bg-card-dark p-4 rounded-lg shadow-md cursor-grab active:cursor-grabbing hover:shadow-lg transition-all border-l-4 ${colorMap[task.categoryColor]} ${isDragging ? 'opacity-50 scale-95' : ''}`}
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      {/* FIX: Replaced h3 with a div to accommodate a delete button next to the title. */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-text-main dark:text-text-main-dark pr-2">{task.title}</h3>
        <button 
          onClick={handleDeleteClick} 
          className="p-1 -mr-1 -mt-1 rounded-full text-text-secondary dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-red-500"
          title="Delete task"
        >
          <span className="material-symbols-outlined text-lg">delete</span>
        </button>
      </div>
      <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-4">
        {task.status === 'Done' && task.completedDate 
          ? `Completed: ${new Date(task.completedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` 
          : `Due: ${new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
      </p>
      <div className="flex items-center justify-end">
        {task.status === 'Done' ? (
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-base">check</span>
            </div>
        ) : (
            <div className="flex -space-x-2">
                {task.assignees.map(assignee => (
                    <img
                        key={assignee.id}
                        src={assignee.avatar}
                        alt={assignee.name}
                        title={assignee.name}
                        className="w-6 h-6 rounded-full border-2 border-card dark:border-card-dark"
                    />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
