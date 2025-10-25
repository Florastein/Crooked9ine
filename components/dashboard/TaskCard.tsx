import React from 'react';
import { Task } from '../../data/mockData';

interface TaskCardProps {
  task: Task;
}

const colorMap = {
    red: 'border-l-task-red',
    yellow: 'border-l-task-yellow',
    green: 'border-l-task-green',
    blue: 'border-l-task-blue',
};

export const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div className={`bg-card dark:bg-card-dark p-4 rounded-lg shadow-md border-l-4 ${colorMap[task.categoryColor]}`}>
      <h3 className="font-semibold text-text-main dark:text-text-main-dark mb-2">{task.title}</h3>
      <p className="text-xs text-text-secondary dark:text-text-secondary-dark mb-4">
        {task.status === 'completed' ? `Completed: ${task.completedDate}` : `Due: ${task.dueDate}`}
      </p>
      <div className="flex items-center justify-end">
        {task.status === 'completed' ? (
            <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                <span className="material-symbols-outlined text-green-600 text-base">check</span>
            </div>
        ) : (
            <div className="flex -space-x-2">
                {task.assignees.map(assignee => (
                    <img
                        key={assignee.id}
                        src={assignee.avatarUrl}
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
