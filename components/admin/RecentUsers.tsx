import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '@/firebase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: any;
}

export const RecentUsers: React.FC = () => {
  const [recentUsers, setRecentUsers] = useState<User[]>([]);

  useEffect(() => {
    // Create a query to get the latest users
    const usersQuery = query(collection(db, 'Users'), orderBy('createdAt', 'desc'));

    // Listen for real-time updates
    const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
      const users = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      // Limit to 5 most recent users
      setRecentUsers(users.slice(0, 5));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-base sm:text-lg mb-3 sm:mb-4">Recent Users</h3>
      {recentUsers.length === 0 ? (
        <p className="text-sm text-gray-500">No recent users found.</p>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <img
                  src={
                    user.avatar ||
                    `https://i.pravatar.cc/48?u=${user.email || user.id}`
                  }
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
      )}
    </div>
  );
};
