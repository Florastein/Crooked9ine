import React from 'react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({ isOpen, onClose, onConfirm, taskTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" role="dialog" aria-modal="true" aria-labelledby="delete-modal-title">
      <div className="bg-card dark:bg-card-dark p-6 rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-start">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/50 sm:mx-0 sm:h-10 sm:w-10">
            <span className="material-symbols-outlined text-red-600 dark:text-red-400">warning</span>
          </div>
          <div className="ml-4 text-left">
            <h2 className="text-lg font-bold text-text-main dark:text-text-main-dark" id="delete-modal-title">Delete Task</h2>
            <div className="mt-2">
              <p className="text-sm text-text-secondary dark:text-text-secondary-dark">
                Are you sure you want to delete the task "<strong>{taskTitle}</strong>"? This action cannot be undone.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md text-text-main dark:text-text-main-dark bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:ring-offset-card-dark"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:ring-offset-card-dark"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};