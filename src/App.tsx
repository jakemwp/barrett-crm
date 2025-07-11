import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Customers } from './pages/Customers';
import { CustomerDetail } from './pages/CustomerDetail';
import { AddCustomer } from './pages/AddCustomer';
import { Vehicles } from './pages/Vehicles';
import { VehicleDetail } from './pages/VehicleDetail';
import { AddVehicle } from './pages/AddVehicle';
import { CheckInOutList } from './pages/CheckInOutList';
import { CheckInOutDetail } from './pages/CheckInOutDetail';
import { AddCheckInOut } from './pages/AddCheckInOut';
import { Settings } from './pages/Settings';
import { Help } from './pages/Help';
import { UserManagement } from './pages/UserManagement';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/new" element={<AddCustomer />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/new" element={<AddVehicle />} />
        <Route path="vehicles/:id" element={<VehicleDetail />} />
        <Route path="check-in-out" element={<CheckInOutList />} />
        <Route path="check-in-out/new" element={<AddCheckInOut />} />
        <Route path="check-in-out/:id" element={<CheckInOutDetail />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;