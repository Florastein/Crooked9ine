import React from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { StatsCard } from '../components/admin/StatsCard';
import { RecentUsers } from '../components/admin/RecentUsers';
import { TrafficSource } from '../components/admin/TrafficSource';

export const AdminDashboardPage: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <StatsCard title="Total Users" value="12,345" change="+12.5%" changeType="increase" />
            <StatsCard title="New Users" value="1,234" change="+5.5%" changeType="increase" />
            <StatsCard title="Active Users" value="8,765" change="-2.5%" changeType="decrease" />
            <StatsCard title="Pending Tasks" value="45" change="+10" changeType="increase" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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