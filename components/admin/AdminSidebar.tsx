import React from 'react';
import { useAuth } from '../../hooks/useAuth';

export const AdminSidebar: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-white shadow-md p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <img src="https://wzwyluzlsimmdohmwvvs.supabase.co/storage/v1/object/public/sector/wine.png" alt="crooked9ine logo" className="h-10 w-10 rounded" />
        <span className="text-xl font-bold">crooked9ine</span>
      </div>
      <nav className="flex flex-col gap-4">
        <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-black">
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a href="#" className="flex items-center gap-2 text-gray-600 hover:text-black">
          <span className="material-symbols-outlined">group</span>
          <span>Team Progress</span>
        </a>
      </nav>
      <div className="mt-auto">
        <button className="w-full flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors">
          <span className="material-symbols-outlined">add</span>
          <span>Create New Task</span>
        </button>
        <div className="flex items-center gap-2 mt-4 border-t pt-4">
          <img src={user?.photoURL || "https://i.pravatar.cc/48?u=user-avatar"} alt="User avatar" className="w-9 h-9 rounded-full object-cover" />
          <div className="flex flex-col">
            <span className="font-semibold text-sm">{user?.displayName}</span>
            <span className="text-xs text-gray-500">{user?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};