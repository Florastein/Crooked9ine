import React from 'react';

const Logo = () => (
    <div className="flex items-center gap-2">
        <div className="bg-primary p-1.5 rounded-full">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </div>
        <span className="text-xl font-bold text-text-main dark:text-text-main-dark">crooked9ine</span>
    </div>
);

interface HeaderProps {
    onNewTaskClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNewTaskClick }) => {
  return (
    <header className="bg-card dark:bg-card-dark shadow-sm p-4 border-b border-border-light dark:border-border-dark">
      <div className="flex items-center justify-between mx-auto">
        <div className="flex items-center gap-8">
          <Logo />
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-semibold text-primary border-b-2 border-primary pb-1">Dashboard</a>
            <a href="#" className="text-sm font-semibold text-text-secondary dark:text-text-secondary-dark hover:text-primary">Team Progress</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary dark:text-text-secondary-dark">search</span>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-background dark:bg-background-dark border border-border-light dark:border-border-dark rounded-lg py-2 pl-10 pr-4 w-48 text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <button 
            onClick={onNewTaskClick}
            className="hidden sm:flex items-center gap-2 bg-accent text-white font-semibold py-2 px-4 rounded-lg text-sm hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Create New Task
          </button>
           <div className="w-9 h-9 rounded-full overflow-hidden">
             <img src="https://i.pravatar.cc/48?u=user-avatar" alt="User avatar" className="w-full h-full object-cover" />
           </div>
        </div>
      </div>
    </header>
  );
};