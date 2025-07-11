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

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="clients" element={<Customers />} />
        <Route path="clients/new" element={<AddCustomer />} />
        <Route path="clients/:id" element={<CustomerDetail />} />
        {/* Legacy routes for backward compatibility */}
        <Route path="customers" element={<Navigate to="/clients" replace />} />
        <Route path="customers/new" element={<Navigate to="/clients/new" replace />} />
        <Route path="customers/:id" element={<CustomerDetail />} />
        <Route path="vehicles" element={<Vehicles />} />
        <Route path="vehicles/new" element={<AddVehicle />} />
        <Route path="vehicles/:id" element={<VehicleDetail />} />
        <Route path="check-in-out" element={<CheckInOutList />} />
        <Route path="check-in-out/new" element={<AddCheckInOut />} />
        <Route path="check-in-out/:id" element={<CheckInOutDetail />} />
        <Route path="settings" element={<Settings />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;