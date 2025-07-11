import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex flex-1 justify-between px-4 md:px-6">
        {/* Left side: Menu button (mobile) and search */}
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden p-2 mr-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
          
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full h-10 pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400"
              placeholder="Search..."
            />
          </div>
        </div>
        
        {/* Right side: Actions */}
        <div className="flex items-center space-x-4">
          <Link to="/clients/new">
            <Button variant="primary" size="sm">
              + Add Client
            </Button>
          </Link>
          
          <button
            type="button"
            className="p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 relative"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-error-500 ring-2 ring-white" />
          </button>
        </div>
      </div>
    </header>
  );
}