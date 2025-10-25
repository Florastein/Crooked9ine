import React, { useState } from 'react';
import { Task } from '../../types';
import { mockUsers } from '../../data/mockData';

interface CreateTaskModalProps {
  onClose: () => void;
  onCreate: (task: Omit<Task, 'id' | 'status' | 'assignees' | 'comments'>) => void;
}

const inputStyles = "w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-button-save focus:border-button-save";
const labelStyles = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5";

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate || !priority) {
      alert('Title, Due Date, and Priority are required.');
      return;
    }
    onCreate({
      title,
      description,
      dueDate,
      priority: priority as 'Low' | 'Medium' | 'High',
      categoryColor: 'blue',
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
    >
      <div 
        className="bg-white dark:bg-card-dark p-8 rounded-lg shadow-xl w-full max-w-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-left mb-6">
          <h2 id="create-task-title" className="text-2xl font-bold text-button-save">Create New Task</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details to create a new task.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="title" className={labelStyles}>Task Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className={inputStyles}
              placeholder="e.g., Design new login screen"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className={labelStyles}>Description</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              rows={3}
              placeholder="Provide a detailed description of the task..."
              className={inputStyles}
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="assignee" className={labelStyles}>Assignee</label>
              <select 
                id="assignee" 
                value={assigneeId} 
                onChange={(e) => setAssigneeId(e.target.value)}
                className={inputStyles}
              >
                <option value="">Select a team member</option>
                {mockUsers.map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dueDate" className={labelStyles}>Due Date</label>
              <div className="relative">
                <input 
                  type="text" 
                  id="dueDate" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}
                  className={inputStyles + " pr-10"}
                  placeholder="mm/dd/yyyy"
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => e.target.type = 'text'}
                  required
                />
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xl">calendar_today</span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="priority" className={labelStyles}>Priority</label>
            <select 
              id="priority" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
              className={inputStyles}
              required
            >
              <option value="" disabled>Select priority</option>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className={labelStyles}>Attachments</label>
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-500 rounded-lg p-6 text-center cursor-pointer hover:border-button-save/50 bg-gray-50 dark:bg-background-dark/50">
              <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <span className="material-symbols-outlined text-4xl text-gray-400">upload</span>
                <p className="mt-2 text-sm">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs mt-1">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 rounded-lg bg-button-cancel hover:bg-button-cancel-hover text-button-cancel-text font-semibold transition-colors text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 rounded-lg bg-button-save text-white hover:bg-button-save-hover font-semibold transition-colors text-sm"
            >
              Save Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
