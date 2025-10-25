import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockTasks } from '../data/mockData';
import { DetailsHeader } from '../components/details/DetailsHeader';
import { TaskContent } from '../components/details/TaskContent';
import { DetailsSidebar } from '../components/details/DetailsSidebar';
import { CommentsSection } from '../components/details/CommentsSection';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';

export const TaskDetailsPage: React.FC = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.id === taskId);

  const handleConfirmDelete = () => {
    if (!task) return;
    // This mutates the mock data source, which is not ideal but necessary for this demo
    const taskIndex = mockTasks.findIndex(t => t.id === task.id);
    if (taskIndex > -1) {
      mockTasks.splice(taskIndex, 1);
    }
    setIsDeleteModalOpen(false);
    navigate('/');
  };

  if (!task) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background dark:bg-background-dark text-text-main dark:text-text-main-dark">
            <h1 className="text-2xl font-bold mb-4">Task not found</h1>
            <button onClick={() => navigate(-1)} className="px-4 py-2 bg-primary text-white rounded-md">
                Go Back
            </button>
        </div>
    );
  }

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen text-text-main dark:text-text-main-dark">
      <div className="p-8">
        <DetailsHeader task={task} onDelete={() => setIsDeleteModalOpen(true)} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2">
            <TaskContent task={task} />
            <CommentsSection comments={task.comments || []} />
          </div>
          <div className="lg:col-span-1">
            <DetailsSidebar task={task} />
          </div>
        </div>
      </div>
      {isDeleteModalOpen && task && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          taskTitle={task.title}
        />
      )}
    </div>
  );
};