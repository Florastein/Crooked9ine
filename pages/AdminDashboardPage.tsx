import React from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatsCard } from '../components/admin/StatsCard';
import { RecentUsers } from '../components/admin/RecentUsers';
import { TrafficSource } from '../components/admin/TrafficSource';

export const AdminDashboardPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar - Hidden on mobile by default */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        <AdminSidebar onClose={closeSidebar} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AdminHeader onMenuToggle={toggleSidebar} />
        
        <main className="flex-1 p-3 sm:p-4 lg:p-6 xl:p-8 overflow-auto">
          {/* Stats Grid - Responsive columns */}
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
            <StatsCard 
              title="Total Users" 
              value="12,345" 
              change="+12.5%" 
              changeType="increase" 
            />
            <StatsCard 
              title="New Users" 
              value="1,234" 
              change="+5.5%" 
              changeType="increase" 
            />
            <StatsCard 
              title="Active Users" 
              value="8,765" 
              change="-2.5%" 
              changeType="decrease" 
            />
            <StatsCard 
              title="Pending Tasks" 
              value="45" 
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
    </div>
  );
};