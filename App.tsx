import React, { useMemo, useState } from 'react';
import { Header } from './components/dashboard/Header';
import { TaskColumn } from './components/dashboard/TaskColumn';
import { UpcomingDeadlines } from './components/dashboard/UpcomingDeadlines';
import { tasks as initialTasks, Task } from './data/mockData';
import { CreateTaskModal } from './components/modals/CreateTaskModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  
  const deadlines = useMemo(() => {
    return tasks
      .filter(task => task.status !== 'completed' && task.dueDate)
      .map(task => task.dueDate as string);
  }, [tasks]);

  const handleSaveTask = (newTaskData: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
        ...newTaskData,
        id: `task${tasks.length + 1}`,
        status: 'todo',
    };
    setTasks(prevTasks => [newTask, ...prevTasks]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <Header onNewTaskClick={() => setIsModalOpen(true)} />
      <main className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-main dark:text-text-main-dark">Project Alpha Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-text-secondary dark:text-text-secondary-dark">My Tasks</span>
            <button className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors bg-gray-200 dark:bg-gray-700">
              <span className="inline-block w-4 h-4 transform bg-white rounded-full transition-transform translate-x-1" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full lg:w-2/3 xl:w-3/4">
            <TaskColumn title="To Do" tasks={todoTasks} count={todoTasks.length} />
            <TaskColumn title="In Progress" tasks={inProgressTasks} count={inProgressTasks.length} />
            <TaskColumn title="Completed" tasks={completedTasks} count={completedTasks.length} />
          </div>
          <div className="w-full lg:w-1/3 xl:w-1/4">
            <UpcomingDeadlines deadlines={deadlines} />
          </div>
        </div>
      </main>
      {isModalOpen && (
        <CreateTaskModal 
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTask}
        />
      )}
    </div>
  );
};

export default App;