import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Car, 
  ClipboardCheck, 
  Settings, 
  HelpCircle, 
  X 
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { currentUser } from '../../data/mock-data';
import { Avatar } from '../ui/Avatar';
import { getInitials } from '../../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/customers', icon: <Users size={20} />, label: 'Customers' },
    { to: '/vehicles', icon: <Car size={20} />, label: 'Vehicles' },
    { to: '/check-in-out', icon: <ClipboardCheck size={20} />, label: 'Check In/Out' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
  ];

  const initials = getInitials(currentUser.firstName, currentUser.lastName);

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
            <div className="flex items-center">
              <div className="flex-shrink-0">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <Avatar initials={initials} size="sm" />
                )}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {currentUser.firstName} {currentUser.lastName}
                </p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}