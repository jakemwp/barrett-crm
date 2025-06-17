import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';

export function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />
      
      {/* Main content */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="relative flex-1 overflow-y-auto focus:outline-none p-4 md:p-6">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Mobile navigation */}
        <MobileNav />
      </div>
    </div>
  );
}