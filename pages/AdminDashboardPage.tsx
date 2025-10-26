import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, getDocs } from 'firebase/firestore';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatsCard } from '../components/admin/StatsCard';
import { RecentUsers } from '../components/admin/RecentUsers';
import { TrafficSource } from '../components/admin/TrafficSource';
import { CreateTaskModal } from '../components/admin/CreateTaskModal'; // Import the modal
import { db } from '@/firebase';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

interface User {
  id: string;
  name: string;
  email: string;
  division: string;
  role: 'Admin' | 'Team Lead' | 'Team Member';
}

export const AdminDashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    newUsers: 0,
    activeUsers: 0,
    pendingTasks: 0,
  });

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Fetch all users for task assignment
  const fetchAllUsers = async () => {
    try {
      const usersCollection = collection(db, 'Users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList: User[] = [];
      
      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersList.push({
          id: doc.id,
          name: userData.name || 'Unknown User',
          email: userData.email || '',
          division: userData.division || 'Unassigned',
          role: userData.role || 'Team Member',
        });
      });
      
      setUsers(usersList);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleCreateTaskClick = async () => {
    await fetchAllUsers(); // Fetch users before opening modal
    setShowCreateTaskModal(true);
  };

  const handleTaskSave = (taskData: any) => {
    console.log('Task created:', taskData);
    // Here you would save the task to Firestore
    // Example: await addDoc(collection(db, 'Tasks'), taskData);
    setShowCreateTaskModal(false);
  };

  useEffect(() => {
    // Listen to the 'User' collection
    const unsubscribeUsers = onSnapshot(collection(db, 'Users'), (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());

      setStats((prev) => ({
        ...prev,
        totalUsers: users.length,
        // Example logic: count users created in last 7 days
        newUsers: users.filter((u) => {
          if (!u.createdAt) return false;
          const createdDate = u.createdAt.toDate();
          const now = new Date();
          return (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24) <= 7;
        }).length,
        // Example logic for active users
        activeUsers: users.filter((u) => u.isActive).length,
      }));
    });

    // Listen to 'Tasks' collection
    const unsubscribeTasks = onSnapshot(collection(db, 'Tasks'), (snapshot) => {
      const pending = snapshot.docs.filter((doc) => doc.data().status === 'pending').length;
      setStats((prev) => ({ ...prev, pendingTasks: pending }));
    });

    return () => {
      unsubscribeUsers();
      unsubscribeTasks();
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <AdminSidebar 
          onClose={closeSidebar} 
          onCreateTaskClick={handleCreateTaskClick} // Pass the callback
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={toggleSidebar} />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <StatsCard 
              title="Total Users" 
              value={stats.totalUsers.toString()} 
              change="+12.5%" 
              changeType="increase" 
            />
            <StatsCard 
              title="New Users (Last 7 days)" 
              value={stats.newUsers.toString()} 
              change="+5.5%" 
              changeType="increase" 
            />
            <StatsCard 
              title="Active Users" 
              value={stats.activeUsers.toString()} 
              change="-2.5%" 
              changeType="decrease" 
            />
            <StatsCard 
              title="Pending Tasks" 
              value={stats.pendingTasks.toString()} 
              change="+10" 
              changeType="increase" 
            />
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <div className="lg:col-span-2">
              <RecentUsers />
            </div>
            <div>
              <TrafficSource />
            </div>
          </div>
        </main>
      </div>

      {/* Create Task Modal - Rendered at the root level */}
      {showCreateTaskModal && (
        <CreateTaskModal
          onClose={() => setShowCreateTaskModal(false)}
          onSave={handleTaskSave}
          users={users}
        />
      )}
    </div>
  );
};