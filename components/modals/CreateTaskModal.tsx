import React, { useState } from 'react';
import { Task } from '../../types';

interface CreateTaskModalProps {
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id' | 'status' | 'assignees' | 'comments'>) => void;
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Title and Due Date are required.');
      return;
    }
    onCreate({
      title,
      description,
      dueDate,
      priority,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-text-main dark:text-text-main-dark">Create New Task</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full bg-background dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">Description</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={4}
              className="w-full bg-background dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            ></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">Due Date</label>
              <input 
                type="date" 
                id="dueDate" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full bg-background dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-text-secondary dark:text-text-secondary-dark mb-1">Priority</label>
              <select 
                id="priority" 
                value={priority} 
                onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
                className="w-full bg-background dark:bg-background-dark border border-gray-300 dark:border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md text-text-main dark:text-text-main-dark hover:bg-gray-200 dark:hover:bg-gray-700">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded-md bg-primary text-white hover:bg-primary-hover">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
