import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import EmployeeListPage from './pages/EmployeeListPage';
import EmployeeDetailsPage from './pages/EmployeeDetailsPage';
import AddEmployeePage from './pages/AddEmployeePage';
import EditEmployeePage from './pages/EditEmployeePage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

// Wrapper component to pass children to Layout
const LayoutWrapper = ({ children }) => {
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <DashboardPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <DashboardPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/manager/dashboard" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <DashboardPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/employee/dashboard" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <DashboardPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/employees" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <EmployeeListPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/employees/add" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <AddEmployeePage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/employees/:id" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <EmployeeDetailsPage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/employees/edit/:id" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <EditEmployeePage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <LayoutWrapper>
              <ProfilePage />
            </LayoutWrapper>
          </ProtectedRoute>
        } />
        
        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;