import React from 'react';

export const AdminHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm p-4 border-b">
      <div className="flex items-center justify-between mx-auto">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">search</span>
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 w-48 text-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800"
            />
          </div>
          <button className="hidden sm:flex items-center gap-2 bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg text-sm hover:bg-gray-700 transition-colors">
            <span className="material-symbols-outlined">add</span>
            Create New Task
          </button>
        </div>
      </div>
    </header>
  );
};