import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Car, 
  ClipboardCheck, 
  Settings, 
  HelpCircle, 
  X,
  Shield,
  LogOut
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAuth } from '../../contexts/AuthContext';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';
import { getInitials } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  
  if (!user) return null;
  
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/clients', icon: <Users size={20} />, label: 'Clients' },
    { to: '/vehicles', icon: <Car size={20} />, label: 'Vehicles' },
    { to: '/check-in-out', icon: <ClipboardCheck size={20} />, label: 'Check In/Out' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  // Add user management for admins
  if (user.role === 'Admin') {
    navItems.splice(-2, 0, { 
      to: '/users', 
      icon: <Shield size={20} />, 
      label: 'User Management' 
    });
  }

  const initials = getInitials(user.firstName, user.lastName);

  const handleLogout = () => {
    logout();
    onClose();
  };
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 md:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar component for mobile */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform md:translate-x-0 md:static md:h-screen md:z-auto",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Close button - visible only on mobile */}
          <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 md:hidden">
            <div className="flex items-center">
              <img 
                src="/Barrett_Final_logo-1.png" 
                alt="Barrett Automotive Group" 
                className="h-12 w-auto"
              />
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Logo - visible only on desktop */}
          <div className="hidden md:flex items-center px-6 h-16 border-b border-gray-200">
            <img 
              src="/Barrett_Final_logo-1.png" 
              alt="Barrett Automotive Group" 
              className="h-12 w-auto"
            />
          </div>
          
          {/* Navigation links */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActive 
                    ? "bg-primary-50 text-primary-700" 
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {/* User profile section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Avatar initials={initials} size="sm" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-gray-600 hover:text-gray-800"
              onClick={handleLogout}
              leftIcon={<LogOut size={16} />}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}