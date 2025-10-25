import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>; // Or a proper spinner component
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
      <Route 
        path="/" 
        element={user ? <DashboardPage /> : <Navigate to="/login" />} 
      />
       <Route 
        path="/task/:taskId" 
        element={user ? <TaskDetailsPage /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/admin" 
        element={user ? <AdminDashboardPage /> : <Navigate to="/login" />} 
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
