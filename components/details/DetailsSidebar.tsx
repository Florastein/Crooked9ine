import React from 'react';
import { Task, User } from '../../types';

interface DetailsSidebarProps {
  task: Task;
}

const statusColors = {
  'To Do': 'bg-gray-400',
  'In Progress': 'bg-blue-500',
  'In Review': 'bg-purple-500',
  'Done': 'bg-green-500',
};

const priorityColors = {
  High: 'text-red-500',
  Medium: 'text-yellow-500',
  Low: 'text-green-500',
};

const Assignee: React.FC<{ user: User }> = ({ user }) => (
    <div className="flex items-center space-x-3">
        <img 
            className="h-8 w-8 rounded-full" 
            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=random`} 
            alt={user.name} 
        />
        <span className="font-medium text-text-main dark:text-text-main-dark">{user.name}</span>
    </div>
);


export const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ task }) => {
  return (
    <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-md space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark uppercase mb-2">Status</h3>
        <span className={`px-3 py-1 text-sm font-semibold text-white rounded-full ${statusColors[task.status]}`}>
          {task.status}
        </span>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark uppercase mb-2">Assignees</h3>
        <div className="space-y-3">
            {task.assignees.map(user => <Assignee key={user.id} user={user} />)}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark uppercase mb-2">Priority</h3>
        <div className="flex items-center space-x-2">
            <span className={`material-symbols-outlined ${priorityColors[task.priority]}`}>flag</span>
            <span className={`font-medium ${priorityColors[task.priority]}`}>{task.priority}</span>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark uppercase mb-2">Due Date</h3>
        <div className="flex items-center space-x-2">
            <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark">calendar_today</span>
            <span className="font-medium text-text-main dark:text-text-main-dark">
                {new Date(task.dueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
        </div>
      </div>
      {task.tags && task.tags.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark uppercase mb-2">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {task.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-xs font-medium rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
