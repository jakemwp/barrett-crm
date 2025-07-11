import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Car, ClipboardCheck, Menu } from 'lucide-react';
import { cn } from '../../lib/utils';

export function MobileNav() {
  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Home' },
    { to: '/clients', icon: <Users size={20} />, label: 'Clients' },
    { to: '/vehicles', icon: <Car size={20} />, label: 'Vehicles' },
    { to: '/check-in-out', icon: <ClipboardCheck size={20} />, label: 'Service' },
    { to: '/settings', icon: <Menu size={20} />, label: 'More' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center py-2 px-3 text-xs",
              isActive ? "text-primary-600" : "text-gray-600"
            )}
          >
            <span className="mb-1">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}