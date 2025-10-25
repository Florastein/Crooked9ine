import React from 'react';

interface HeaderProps {
  onNewTaskClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewTaskClick }) => {
  return (
    <header className="bg-card dark:bg-card-dark p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-text-main dark:text-text-main-dark">Dashboard</h1>
        <div className="ml-6 relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark">search</span>
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-background dark:bg-background-dark rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={onNewTaskClick}
          className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg flex items-center"
        >
          <span className="material-symbols-outlined mr-2">add</span>
          New Task
        </button>
        <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <span className="material-symbols-outlined text-text-secondary dark:text-text-secondary-dark">notifications</span>
        </button>
        <img 
          className="h-10 w-10 rounded-full" 
          src="https://ui-avatars.com/api/?name=John+Doe&background=random" 
          alt="User Avatar" 
        />
      </div>
    </header>
  );
};
