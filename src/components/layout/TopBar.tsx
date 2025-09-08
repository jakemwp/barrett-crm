import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, Bell, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { customers, vehicles, getCustomerById } from '../../data/mock-data';
import { Customer, Vehicle } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

interface TopBarProps {
  onMenuClick: () => void;
}

interface SearchResult {
  id: string;
  type: 'customer' | 'vehicle';
  title: string;
  subtitle: string;
  link: string;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    
    if (value.trim().length > 0) {
      const results: SearchResult[] = [];
      
      // Search customers
      const filteredCustomers = customers.filter(customer => 
        (customer.firstName?.toLowerCase().includes(value.toLowerCase()) || false) ||
        (customer.lastName?.toLowerCase().includes(value.toLowerCase()) || false) ||
        (customer.email?.toLowerCase().includes(value.toLowerCase()) || false) ||
        (customer.phone?.includes(value) || false)
      ).slice(0, 3); // Limit to 3 customer results
      
      // Add customer results
      filteredCustomers.forEach(customer => {
        results.push({
          id: customer.id,
          type: 'customer',
          title: `${customer.firstName} ${customer.lastName}`,
          subtitle: customer.email || '',
          link: `/clients/${customer.id}`
        });
      });
      
      // Search vehicles (only for non-customer users)
      if (user?.role !== 'Customer') {
        const filteredVehicles = vehicles.filter(vehicle => {
          const customer = getCustomerById(vehicle.customerId);
          const customerName = customer ? `${customer.firstName} ${customer.lastName}` : '';
          
          return (
            (vehicle.make?.toLowerCase().includes(value.toLowerCase()) || false) ||
            (vehicle.model?.toLowerCase().includes(value.toLowerCase()) || false) ||
            (vehicle.licensePlate?.toLowerCase().includes(value.toLowerCase()) || false) ||
            (vehicle.vin?.toLowerCase().includes(value.toLowerCase()) || false) ||
            (vehicle.id?.includes(value.toLowerCase()) || false) ||
            customerName.toLowerCase().includes(value.toLowerCase())
          );
        }).slice(0, 20); // Limit to 3 vehicle results
        
        // Add vehicle results
        filteredVehicles.forEach(vehicle => {
          const customer = getCustomerById(vehicle.customerId);
          const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Owner';
          
          results.push({
            id: vehicle.id,
            type: 'vehicle',
            title: `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} ${vehicle.id || ''}`.trim(),
            subtitle: `${vehicle.licensePlate || 'No Plate'} • Owner: ${customerName}`,
            link: `/vehicles/${vehicle.id}`
          });
        });
      }
      
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowResults(false);
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex flex-1 justify-between px-4 md:px-6 min-w-0">
        {/* Left side: Menu button (mobile) and search */}
        <div className="flex items-center min-w-0 flex-1 mr-4">
          <button
            type="button"
            className="md:hidden p-2 mr-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            onClick={onMenuClick}
          >
            <Menu size={20} />
          </button>
          
          <div className="relative w-full max-w-md min-w-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => searchTerm && setShowResults(true)}
              className="block w-full h-10 pl-10 pr-8 py-2 border border-gray-300 rounded-md bg-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-primary-400 min-w-0"
              placeholder="Search clients..."
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <X size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            )}
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto min-w-0">
                {searchResults.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={result.link}
                    onClick={clearSearch}
                    className="block px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-medium ${
                        result.type === 'customer' ? 'bg-primary-600' : 'bg-secondary-600'
                      }`}>
                        {result.type === 'customer' ? (
                          result.title.split(' ').map(n => n.charAt(0)).join('').slice(0, 2)
                        ) : (
                          '🚗'
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900">
                            {result.title}
                          </p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            result.type === 'customer' 
                              ? 'bg-primary-100 text-primary-700' 
                              : 'bg-secondary-100 text-secondary-700'
                          }`}>
                            {result.type === 'customer' ? 'Client' : 'Vehicle'}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500">{result.subtitle}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            
            {showResults && searchResults.length === 0 && searchTerm && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 p-4 min-w-0">
                <p className="text-sm text-gray-500">No clients or vehicles found</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Right side: Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Only show Add Client button for non-customer users */}
          {user?.role !== 'Customer' && (
            <Link to="/clients/new" className="hidden sm:block">
              <Button variant="primary" size="sm">
                + Add Client
              </Button>
            </Link>
          )}
          
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