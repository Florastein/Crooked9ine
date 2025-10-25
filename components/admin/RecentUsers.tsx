import React from 'react';

const recentUsers = [
  { name: 'Alex Smith', email: 'alex.smith@example.com', avatar: 'https://i.pravatar.cc/48?u=user1' },
  { name: 'Jane Doe', email: 'jane.doe@example.com', avatar: 'https://i.pravatar.cc/48?u=user2' },
  { name: 'Peter Jones', email: 'peter.jones@example.com', avatar: 'https://i.pravatar.cc/48?u=user3' },
  { name: 'Mary Johnson', email: 'mary.johnson@example.com', avatar: 'https://i.pravatar.cc/48?u=user4' },
];

export const RecentUsers: React.FC = () => {
  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Recent Users</h3>
      <div className="space-y-3 sm:space-y-4">
        {recentUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover flex-shrink-0" 
              />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <button className="text-xs sm:text-sm text-blue-500 hover:underline whitespace-nowrap ml-2">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};