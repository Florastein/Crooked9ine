import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/dashboard/Header';
import { TaskColumn } from '../components/dashboard/TaskColumn';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';
import { CreateTaskModal } from '../components/modals/CreateTaskModal';
import { DeleteConfirmationModal } from '../components/modals/DeleteConfirmationModal';
import { mockTasks } from '../data/mockData';
import { Task } from '../types';

export const DashboardPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleTaskClick = (task: Task) => {
    navigate(`/task/${task.id}`);
  };

  const handleCreateTask = (newTask: Omit<Task, 'id' | 'status' | 'assignees' | 'comments'>) => {
    const createdTask: Task = {
      ...newTask,
      id: `task-${tasks.length + 1}`,
      status: 'To Do',
      assignees: [], // Or some default
    };
    setTasks(prevTasks => [...prevTasks, createdTask]);
    setIsModalOpen(false);
  };

  const handleDeleteRequest = (task: Task) => {
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (!taskToDelete) return;
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskToDelete.id));
    setTaskToDelete(null);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, newStatus: Task['status']) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (!taskId) return;

    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  
  const tasksToDo = tasks.filter(task => task.status === 'To Do');
  const tasksInProgress = tasks.filter(task => task.status === 'In Progress');
  const tasksInReview = tasks.filter(task => task.status === 'In Review');
  const tasksDone = tasks.filter(task => task.status === 'Done');

  const deadlines = tasks.map(task => task.dueDate);

  return (
    <div className="bg-background dark:bg-background-dark min-h-screen text-text-main dark:text-text-main-dark">
      <Header onNewTaskClick={() => setIsModalOpen(true)} />
      <main className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* FIX: onDeleteRequest prop was causing an error and is now handled in TaskColumn */}
              <TaskColumn title="To Do" tasks={tasksToDo} count={tasksToDo.length} onTaskClick={handleTaskClick} onDeleteRequest={handleDeleteRequest} onDrop={(e) => handleDrop(e, 'To Do')} onDragOver={handleDragOver} />
              <TaskColumn title="In Progress" tasks={tasksInProgress} count={tasksInProgress.length} onTaskClick={handleTaskClick} onDeleteRequest={handleDeleteRequest} onDrop={(e) => handleDrop(e, 'In Progress')} onDragOver={handleDragOver} />
              <TaskColumn title="In Review" tasks={tasksInReview} count={tasksInReview.length} onTaskClick={handleTaskClick} onDeleteRequest={handleDeleteRequest} onDrop={(e) => handleDrop(e, 'In Review')} onDragOver={handleDragOver} />
              <TaskColumn title="Done" tasks={tasksDone} count={tasksDone.length} onTaskClick={handleTaskClick} onDeleteRequest={handleDeleteRequest} onDrop={(e) => handleDrop(e, 'Done')} onDragOver={handleDragOver} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </div>
      </main>
      {isModalOpen && (
        <CreateTaskModal 
          onClose={() => setIsModalOpen(false)} 
          onCreate={handleCreateTask}
        />
      )}
      {taskToDelete && (
        <DeleteConfirmationModal
            isOpen={!!taskToDelete}
            onClose={() => setTaskToDelete(null)}
            onConfirm={handleConfirmDelete}
            taskTitle={taskToDelete.title}
        />
      )}
    </div>
  );
};
