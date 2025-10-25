import React, { useState } from 'react';
import { users, priorities, Task, User } from '../../data/mockData';

interface CreateTaskModalProps {
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'status'>) => void;
}

const FormInput = ({ id, label, placeholder, type = 'text', value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-1">{label}</label>
        <input
            type={type}
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-modal-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

const FormTextarea = ({ id, label, placeholder, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-1">{label}</label>
        <textarea
            id={id}
            name={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={4}
            className="w-full px-3 py-2 border border-modal-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);

const FormSelect = ({ id, label, children, value, onChange }) => (
    <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-1">{label}</label>
        <select
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full appearance-none bg-white px-3 py-2 border border-modal-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-8"
        >
            {children}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 top-6 flex items-center px-2 text-gray-700">
            <span className="material-symbols-outlined text-xl">expand_more</span>
        </div>
    </div>
);

const FormDateInput = ({ id, label, value, onChange }) => (
     <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-text-main mb-1">{label}</label>
        <input
            type="date"
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            className="w-full px-3 py-2 border border-modal-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);


export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assigneeId, setAssigneeId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priorityId, setPriorityId] = useState('');

    const handleSave = () => {
        if (!title || !assigneeId || !dueDate || !priorityId) {
            alert("Please fill in all required fields.");
            return;
        }
        
        const selectedPriority = priorities.find(p => p.id === priorityId);
        
        onSave({
            title,
            description,
            assignees: assigneeId ? [Object.values(users).find(u => u.id === assigneeId) as User] : [],
            dueDate,
            categoryColor: selectedPriority?.color as 'red' | 'yellow' | 'green' | 'blue' || 'blue',
        });
    };

    return (
        <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-modal-overlay"
            onClick={onClose}
        >
            <div 
                className="bg-modal-bg rounded-lg shadow-xl w-full max-w-2xl p-8"
                onClick={e => e.stopPropagation()}
            >
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-text-main">Create New Task</h2>
                    <p className="text-text-secondary">Fill in the details to create a new task.</p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <FormInput 
                        id="title"
                        label="Task Title"
                        placeholder="e.g., Design new login screen"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormTextarea
                        id="description"
                        label="Description"
                        placeholder="Provide a detailed description of the task..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormSelect 
                            id="assignee"
                            label="Assignee"
                            value={assigneeId}
                            onChange={(e) => setAssigneeId(e.target.value)}
                        >
                            <option value="">Select a team member</option>
                            {Object.values(users).map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </FormSelect>

                        <FormDateInput
                            id="dueDate"
                            label="Due Date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                    </div>
                    
                    <FormSelect 
                        id="priority"
                        label="Priority"
                        value={priorityId}
                        onChange={(e) => setPriorityId(e.target.value)}
                    >
                        <option value="">Select priority</option>
                        {priorities.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </FormSelect>

                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">Attachments</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <span className="material-symbols-outlined text-4xl text-gray-400">cloud_upload</span>
                                <div className="flex text-sm text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                >
                                    <span>Click to upload</span>
                                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-md bg-button-cancel hover:bg-button-cancel-hover text-button-cancel-text font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                            onClick={handleSave}
                            className="px-6 py-2.5 rounded-md bg-button-save hover:bg-button-save-hover text-white font-semibold transition-colors"
                        >
                            Save Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
