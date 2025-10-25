import React, { useState } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { UserFilters } from '@/components/admin/UserFilters';
import { UsersTable } from '@/components/admin/UsersTable';
import { EditUserModal } from '@/components/admin/EditUserModal';
import { DeleteUserModal } from '@/components/admin/DeleteUserModal';
import { AddUserModal } from '@/components/admin/AddUserModal';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  joinDate: string;
  lastActive: string;
  avatar: string;
}

export const UsersManagementPage: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleAddUser = (userData: Omit<User, 'id'>) => {
    console.log('Adding user:', userData);
    // Add your API call here
    setShowAddModal(false);
  };

  const handleEditUser = (userData: Partial<User>) => {
    console.log('Editing user:', editingUser?.id, userData);
    // Add your API call here
    setEditingUser(null);
  };

  const handleDeleteUser = () => {
    console.log('Deleting user:', deletingUser?.id);
    // Add your API call here
    setDeletingUser(null);
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
      
      {/* Sidebar */}
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
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Users Management</h1>
            <p className="text-gray-600">Manage and monitor all system users</p>
          </div>

          {/* Filters and Actions */}
          <UserFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            onAddUser={() => setShowAddModal(true)}
          />

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow">
            
          </div>
        </main>
      </div>

      {/* Modals */}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleEditUser}
        />
      )}

      {deletingUser && (
        <DeleteUserModal
          user={deletingUser}
          onClose={() => setDeletingUser(null)}
          onConfirm={handleDeleteUser}
        />
      )}
    </div>
  );
};