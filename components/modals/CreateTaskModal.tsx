import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { db } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

interface User {
  id: string;
  name: string;
  email: string;
  division: string;
  role: 'Admin' | 'Team Lead' | 'Team Member';
}

interface CreateTaskModalProps {
  onClose: () => void;
  onSave: (taskData: TaskData) => void;
  users: User[];
  currentUserDivision?: string; // Add current user's division
}

export interface TaskData {
  title: string;
  description: string;
  assignedUsers?: string[];
  assignedUserIds?: string[];
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  division: string; // Add division field to task data
}

export const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ 
  onClose, 
  onSave, 
  users, 
  currentUserDivision 
}) => {
  const [formData, setFormData] = useState<TaskData>({
    title: '',
    description: '',
    assignedUsers: [],
    assignedUserIds: [],
    priority: 'medium',
    dueDate: '',
    status: 'pending',
    division: currentUserDivision || '', // Set current user's division
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    assignedUsers: '',
    dueDate: '',
  });

  const [sendingEmails, setSendingEmails] = useState(false);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Filter users to only show those in the same division
  const sameDivisionUsers = users.filter(user => 
    user.division === currentUserDivision
  );

  useEffect(() => {
    emailjs.init('A76KX-nzZGQIxJpmU'); // Replace with your actual public key
  }, []);

  const validateForm = () => {
    const newErrors = {
      title: '',
      description: '',
      assignedUsers: '',
      dueDate: '',
    };

    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.description.trim()) newErrors.description = 'Task description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    else if (new Date(formData.dueDate) < new Date()) newErrors.dueDate = 'Due date cannot be in the past';
    if (!formData.assignedUserIds?.length) newErrors.assignedUsers = 'Please select at least one team member';

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleUserSelection = (userId: string, isSelected: boolean) => {
    setFormData(prev => {
      const currentUserIds = prev.assignedUserIds || [];
      const currentUsers = prev.assignedUsers || [];
      const user = sameDivisionUsers.find(u => u.id === userId);
      let newUserIds = [...currentUserIds];
      let newUsers = [...currentUsers];

      if (isSelected) {
        if (!newUserIds.includes(userId)) {
          newUserIds.push(userId);
          if (user) newUsers.push(user.name);
        }
      } else {
        newUserIds = newUserIds.filter(id => id !== userId);
        newUsers = newUsers.filter(name => name !== user?.name);
      }

      return { ...prev, assignedUserIds: newUserIds, assignedUsers: newUsers };
    });
  };

  const getRecipientEmails = async (taskData: TaskData) => {
    if (taskData.assignedUserIds) {
      return taskData.assignedUserIds
        .map(id => {
          const user = sameDivisionUsers.find(u => u.id === id);
          return user ? { email: user.email, name: user.name } : null;
        })
        .filter(Boolean) as { email: string; name: string }[];
    }
    return [];
  };

  const sendEmailNotifications = async (taskData: TaskData) => {
    try {
      setSendingEmails(true);
      setEmailStatus('sending');

      const recipients = await getRecipientEmails(taskData);
      if (recipients.length === 0) return setEmailStatus('idle');

      const emailPromises = recipients.map(r =>
        emailjs.send(
          'service_8be88rh', // Replace with your service ID
          'template_zb53h7d', // Replace with your template ID
          {
            to_name: r.name,
            to_email: r.email,
            task_title: taskData.title,
            task_description: taskData.description,
            task_priority: taskData.priority,
            task_due_date: new Date(taskData.dueDate).toLocaleDateString(),
            assigned_by: 'Admin',
            from_name: 'crooked9ine Team',
            reply_to: 'noreply@crooked9ine.com',
          }
        )
      );

      await Promise.all(emailPromises);
      setEmailStatus('sent');
    } catch (error) {
      console.error('Error sending emails:', error);
      setEmailStatus('error');
    } finally {
      setSendingEmails(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // ✅ Save task to Firestore
      const taskRef = await addDoc(collection(db, 'Tasks'), {
        ...formData,
        division: currentUserDivision, // Ensure division is set
        createdAt: serverTimestamp(),
      });
      console.log('Task saved with ID:', taskRef.id);

      // Trigger onSave (optional callback)
      onSave(formData);

      // ✅ Send email notifications
      await sendEmailNotifications(formData);

      // ✅ Close modal after short delay
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const getEmailStatusMessage = () => {
    switch (emailStatus) {
      case 'sending': return 'Sending notifications...';
      case 'sent': return 'Notifications sent successfully!';
      case 'error': return 'Error sending notifications';
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">Create New Task</h2>
          {currentUserDivision && (
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {currentUserDivision} Division
            </div>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={sendingEmails}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Task Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter task title"
                disabled={sendingEmails}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Task Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
                rows={4}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Describe the task in detail..."
                disabled={sendingEmails}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Team Member Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Team Members *
                {currentUserDivision && (
                  <span className="text-xs text-gray-500 ml-2">
                    (From {currentUserDivision} Division)
                  </span>
                )}
              </label>
              <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-3">
                {sameDivisionUsers.length > 0 ? (
                  sameDivisionUsers.map((user) => (
                    <label key={user.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                      <input
                        type="checkbox"
                        checked={formData.assignedUserIds?.includes(user.id) || false}
                        onChange={(e) => handleUserSelection(user.id, e.target.checked)}
                        disabled={sendingEmails}
                        className="rounded"
                      />
                      <div className="flex items-center gap-2 flex-1">
                        <img
                          src={`https://i.pravatar.cc/32?u=${user.email}`}
                          alt={user.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium">{user.name}</span>
                          <span className="text-xs text-gray-500 block">{user.role}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </label>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No team members found in {currentUserDivision} division</p>
                    <p className="text-sm mt-1">Please add users to this division first</p>
                  </div>
                )}
              </div>
              {errors.assignedUsers && (
                <p className="mt-1 text-sm text-red-600">{errors.assignedUsers}</p>
              )}
              {formData.assignedUsers && formData.assignedUsers.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.assignedUsers.join(', ')}
                </p>
              )}
            </div>

            {/* Priority and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  disabled={sendingEmails}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date *
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleChange('dueDate', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.dueDate ? 'border-red-300' : 'border-gray-300'
                  }`}
                  min={new Date().toISOString().split('T')[0]}
                  disabled={sendingEmails}
                />
                {errors.dueDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.dueDate}</p>
                )}
              </div>
            </div>

            {/* Email Status */}
            {emailStatus !== 'idle' && (
              <div className={`p-3 rounded-lg text-sm ${
                emailStatus === 'sending' ? 'bg-blue-50 text-blue-700' :
                emailStatus === 'sent' ? 'bg-green-50 text-green-700' :
                'bg-red-50 text-red-700'
              }`}>
                {getEmailStatusMessage()}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 mt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={sendingEmails}
              className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sendingEmails || sameDivisionUsers.length === 0}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {sendingEmails ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating...
                </>
              ) : (
                'Create Task'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};