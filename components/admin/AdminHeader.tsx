import React from 'react';

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between p-3 sm:p-4">
        {/* Left side - Menu button and title */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Dashboard</h1>
        </div>

        {/* Right side - Search and Create button */}
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          {/* Search Bar - Hidden on mobile, visible on tablet and up */}
          <div className="hidden sm:block relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-100 border border-gray-300 rounded-lg py-1.5 sm:py-2 pl-8 pr-3 w-32 sm:w-40 lg:w-48 text-xs sm:text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
            />
          </div>

          {/* Mobile Search Button */}
          <button className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100">
            <span className="material-symbols-outlined text-lg">search</span>
          </button>

          {/* Create New Task Button - Text hidden on mobile, icon only */}
          <button className="flex items-center gap-1 sm:gap-2 bg-gray-800 text-white font-semibold py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg text-xs sm:text-sm hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined text-sm sm:text-base">add</span>
            <span className="hidden sm:inline">Create New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
};