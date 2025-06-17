import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Grid3X3,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { customers } from '../data/mock-data';
import { Customer } from '../types';
import { CustomerCard } from '../components/customers/CustomerCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'dateCreated' | 'membershipLevel' | 'storageSpots';
type SortOrder = 'asc' | 'desc';

export function Customers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = customers.filter(customer => {
      const matchesSearch = 
        customer.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm) ||
        customer.storageLocation.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = typeFilter === 'all' || customer.type === typeFilter;
      const matchesMembership = membershipFilter === 'all' || customer.membershipLevel === membershipFilter;
      
      return matchesSearch && matchesType && matchesMembership;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'dateCreated':
          aValue = new Date(a.dateCreated).getTime();
          bValue = new Date(b.dateCreated).getTime();
          break;
        case 'membershipLevel':
          const membershipOrder = { 'Basic': 1, 'Premium': 2, 'VIP': 3, 'Enterprise': 4 };
          aValue = membershipOrder[a.membershipLevel];
          bValue = membershipOrder[b.membershipLevel];
          break;
        case 'storageSpots':
          aValue = a.storageSpots;
          bValue = b.storageSpots;
          break;
        default:
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [searchTerm, typeFilter, membershipFilter, sortField, sortOrder]);

  const membershipStats = useMemo(() => {
    const stats = customers.reduce((acc, customer) => {
      acc[customer.membershipLevel] = (acc[customer.membershipLevel] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  }, []);

  const typeStats = useMemo(() => {
    const stats = customers.reduce((acc, customer) => {
      acc[customer.type] = (acc[customer.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  }, []);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const CustomerListItem = ({ customer }: { customer: Customer }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div>
            <Link to={`/customers/${customer.id}`}>
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                {customer.firstName} {customer.lastName}
              </h3>
            </Link>
            <p className="text-sm text-gray-600">{customer.email}</p>
            <p className="text-sm text-gray-500">{customer.storageLocation}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <Badge variant={customer.membershipLevel === 'Basic' ? 'default' : 
                           customer.membershipLevel === 'Premium' ? 'warning' :
                           customer.membershipLevel === 'VIP' ? 'success' : 'error'}>
              {customer.membershipLevel}
            </Badge>
            <p className="text-sm text-gray-500 mt-1">{customer.storageSpots} spots</p>
          </div>
          
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{customer.phone}</p>
            <p className="text-xs text-gray-500">{customer.dateCreated}</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="mr-3" size={28} />
            Customers
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your storage customers and their information
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Link to="/customers/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">VIP Members</p>
              <p className="text-2xl font-bold text-green-600">{membershipStats.VIP || 0}</p>
            </div>
            <Badge variant="success" className="text-lg px-3 py-1">VIP</Badge>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Corporate</p>
              <p className="text-2xl font-bold text-purple-600">{typeStats.Corporate || 0}</p>
            </div>
            <Badge variant="error" className="text-lg px-3 py-1">Corp</Badge>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Storage Spots</p>
              <p className="text-2xl font-bold text-blue-600">
                {customers.reduce((sum, c) => sum + c.storageSpots, 0)}
              </p>
            </div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold text-sm">#</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search customers by name, email, phone, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: 'Individual', label: 'Individual' },
                { value: 'Business', label: 'Business' },
                { value: 'Corporate', label: 'Corporate' },
              ]}
            />
            
            <Select
              value={membershipFilter}
              onChange={(e) => setMembershipFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Memberships' },
                { value: 'Basic', label: 'Basic' },
                { value: 'Premium', label: 'Premium' },
                { value: 'VIP', label: 'VIP' },
                { value: 'Enterprise', label: 'Enterprise' },
              ]}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
          {[
            { field: 'name' as SortField, label: 'Name' },
            { field: 'dateCreated' as SortField, label: 'Date Created' },
            { field: 'membershipLevel' as SortField, label: 'Membership' },
            { field: 'storageSpots' as SortField, label: 'Storage Spots' },
          ].map(({ field, label }) => (
            <Button
              key={field}
              variant={sortField === field ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => toggleSort(field)}
              rightIcon={
                sortField === field ? (
                  sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                ) : undefined
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredAndSortedCustomers.length} Customer{filteredAndSortedCustomers.length !== 1 ? 's' : ''}
          </h2>
          
          {(searchTerm || typeFilter !== 'all' || membershipFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setTypeFilter('all');
                setMembershipFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredAndSortedCustomers.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedCustomers.map((customer) => (
                <CustomerListItem key={customer.id} customer={customer} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || typeFilter !== 'all' || membershipFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first customer.'}
            </p>
            {!(searchTerm || typeFilter !== 'all' || membershipFilter !== 'all') && (
              <div className="mt-6">
                <Link to="/customers/new">
                  <Button variant="primary" leftIcon={<Plus size={16} />}>
                    Add Customer
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}