import React from 'react';

const recentUsers = [
  { name: 'Alex Smith', email: 'alex.smith@example.com', avatar: 'https://i.pravatar.cc/48?u=user1' },
  { name: 'Jane Doe', email: 'jane.doe@example.com', avatar: 'https://i.pravatar.cc/48?u=user2' },
  { name: 'Peter Jones', email: 'peter.jones@example.com', avatar: 'https://i.pravatar.cc/48?u=user3' },
  { name: 'Mary Johnson', email: 'mary.johnson@example.com', avatar: 'https://i.pravatar.cc/48?u=user4' },
];

export const RecentUsers: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Recent Users</h3>
      <div className="space-y-4">
        {recentUsers.map((user, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button className="text-sm text-blue-500 hover:underline">View</button>
          </div>
        ))}
      </div>
    </div>
  );
};