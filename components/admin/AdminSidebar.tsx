import React from 'react';
import { useAuth } from '../../hooks/useAuth';

interface AdminSidebarProps {
  onClose?: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onClose }) => {
  const { user } = useAuth();

  const handleLinkClick = () => {
    // Close sidebar on mobile when a link is clicked
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  return (
    <div className="w-64 h-full bg-white shadow-md p-4 flex flex-col overflow-y-auto">
      {/* Close button for mobile */}
      <div className="lg:hidden flex justify-end mb-2">
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 lg:mb-8">
        <img 
          src="https://wzwyluzlsimmdohmwvvs.supabase.co/storage/v1/object/public/sector/wine.png" 
          alt="crooked9ine logo" 
          className="h-8 w-8 sm:h-10 sm:w-10 rounded" 
        />
        <span className="text-lg sm:text-xl font-bold">crooked9ine</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 sm:gap-4 flex-1">
        <a 
          href="#" 
          className="flex items-center gap-2 text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined text-lg">dashboard</span>
          <span className="text-sm sm:text-base">Dashboard</span>
        </a>
        <a 
          href="#" 
          className="flex items-center gap-2 text-gray-600 hover:text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={handleLinkClick}
        >
          <span className="material-symbols-outlined text-lg">group</span>
          <span className="text-sm sm:text-base">Team Progress</span>
        </a>
      </nav>

      {/* Bottom section */}
      <div className="mt-auto space-y-3 sm:space-y-4">
        {/* Create New Task Button - Full width in sidebar */}
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2 px-3 rounded-lg text-xs sm:text-sm hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
          <span>Create New Task</span>
        </button>

        {/* User profile */}
        <div className="flex items-center gap-2 pt-3 sm:pt-4 border-t border-gray-200">
          <img 
            src={user?.photoURL || "https://i.pravatar.cc/48?u=user-avatar"} 
            alt="User avatar" 
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover" 
          />
          <div className="flex flex-col min-w-0 flex-1">
            <span className="font-semibold text-xs sm:text-sm truncate">
              {user?.displayName || 'User Name'}
            </span>
            <span className="text-xs text-gray-500 truncate">
              {user?.email || 'user@example.com'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};