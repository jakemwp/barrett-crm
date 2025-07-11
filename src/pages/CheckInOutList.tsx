import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardCheck, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Edit,
  User,
  Car,
  Clock,
  CheckSquare,
  Camera,
  Video,
  FileText,
  DollarSign,
  Calendar
} from 'lucide-react';
import { checkInOuts, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckStatus, CheckType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { formatCurrency } from '../lib/utils';

type ViewMode = 'grid' | 'list';
type SortField = 'date' | 'customer' | 'vehicle' | 'status' | 'type' | 'totalCost';
type SortOrder = 'asc' | 'desc';

export function CheckInOutList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const filteredAndSortedRecords = useMemo(() => {
    let filtered = checkInOuts.filter(record => {
      const customer = getCustomerById(record.customerId);
      const vehicle = getVehicleById(record.vehicleId);
      const customerName = customer ? `${customer.firstName} ${customer.lastName}` : '';
      const vehicleInfo = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '';
      
      const matchesSearch = 
        record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicleInfo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (record.notes && record.notes.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
      const matchesType = typeFilter === 'all' || record.type === typeFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'all') {
        const recordDate = new Date(record.date);
        const today = new Date();
        const daysDiff = Math.floor((today.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'today':
            matchesDate = daysDiff === 0;
            break;
          case 'week':
            matchesDate = daysDiff <= 7;
            break;
          case 'month':
            matchesDate = daysDiff <= 30;
            break;
          case 'quarter':
            matchesDate = daysDiff <= 90;
            break;
        }
      }
      
      return matchesSearch && matchesStatus && matchesType && matchesDate;
    });

    // Sort records
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'date':
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
          break;
        case 'customer':
          const customerA = getCustomerById(a.customerId);
          const customerB = getCustomerById(b.customerId);
          aValue = customerA ? `${customerA.firstName} ${customerA.lastName}` : '';
          bValue = customerB ? `${customerB.firstName} ${customerB.lastName}` : '';
          break;
        case 'vehicle':
          const vehicleA = getVehicleById(a.vehicleId);
          const vehicleB = getVehicleById(b.vehicleId);
          aValue = vehicleA ? `${vehicleA.year} ${vehicleA.make} ${vehicleA.model}` : '';
          bValue = vehicleB ? `${vehicleB.year} ${vehicleB.make} ${vehicleB.model}` : '';
          break;
        case 'status':
          aValue = a.status;
          bValue = b.status;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'totalCost':
          aValue = a.serviceItems?.reduce((sum, item) => sum + item.cost, 0) || 0;
          bValue = b.serviceItems?.reduce((sum, item) => sum + item.cost, 0) || 0;
          break;
        default:
          aValue = new Date(a.date).getTime();
          bValue = new Date(b.date).getTime();
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
  }, [searchTerm, statusFilter, typeFilter, dateFilter, sortField, sortOrder]);

  const recordStats = useMemo(() => {
    const totalRecords = checkInOuts.length;
    const activeServices = checkInOuts.filter(r => 
      r.status === CheckStatus.CHECKED_IN || r.status === CheckStatus.IN_SERVICE
    ).length;
    const completedToday = checkInOuts.filter(r => {
      const today = new Date().toDateString();
      return r.status === CheckStatus.CHECKED_OUT && 
             new Date(r.checkOutDate || r.date).toDateString() === today;
    }).length;
    const totalRevenue = checkInOuts.reduce((sum, record) => 
      sum + (record.serviceItems?.reduce((itemSum, item) => itemSum + item.cost, 0) || 0), 0
    );
    
    return {
      totalRecords,
      activeServices,
      completedToday,
      totalRevenue
    };
  }, []);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const statusConfig = {
    [CheckStatus.CHECKED_IN]: {
      label: 'Checked In',
      variant: 'warning' as const,
    },
    [CheckStatus.IN_SERVICE]: {
      label: 'In Service',
      variant: 'default' as const,
    },
    [CheckStatus.CHECKED_OUT]: {
      label: 'Checked Out',
      variant: 'success' as const,
    },
  };

  const typeConfig = {
    [CheckType.CHECK_IN]: {
      label: 'Check In',
      variant: 'warning' as const,
    },
    [CheckType.CHECK_OUT]: {
      label: 'Check Out',
      variant: 'success' as const,
    },
  };

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const CheckInOutCard = ({ record }: { record: CheckInOut }) => {
    const customer = getCustomerById(record.customerId);
    const vehicle = getVehicleById(record.vehicleId);
    const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
    const vehicleInfo = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
    const status = statusConfig[record.status];
    const type = typeConfig[record.type];
    const serviceCount = record.serviceItems?.length || 0;
    const totalCost = record.serviceItems?.reduce((sum, item) => sum + item.cost, 0) || 0;
    const photoCount = record.photos ? Object.values(record.photos).flat().filter(Boolean).length : 0;
    const hasWalkAroundVideo = record.photos?.walkAroundVideo;

    return (
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <Link to={`/check-in-out/${record.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                  Check #{record.id.substring(0, 8).toUpperCase()}
                </h3>
                <p className="text-sm text-gray-500 mt-1">{formatDateDisplay(record.date)}</p>
              </Link>
              <div className="flex flex-col items-end space-y-1">
                <Badge variant={status.variant} className="text-xs">
                  {status.label}
                </Badge>
                <Badge variant={type.variant} className="text-xs">
                  {type.label}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center text-sm text-gray-700">
                <User size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <Link to={`/clients/${record.customerId}`} className="font-medium hover:text-primary-600">
                  {customerName}
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-gray-700">
                <Car size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <Link to={`/vehicles/${record.vehicleId}`} className="hover:text-primary-600">
                  {vehicleInfo}
                </Link>
              </div>
              
              <div className="flex items-center text-sm text-gray-700">
                <Clock size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <span>Check-in: {formatDateDisplay(record.checkInDate || record.date)}</span>
              </div>
              
              {record.checkOutDate && (
                <div className="flex items-center text-sm text-gray-700">
                  <CheckSquare size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                  <span>Check-out: {formatDateDisplay(record.checkOutDate)}</span>
                </div>
              )}

              {/* Vehicle Condition */}
              {(record.fuelLevel || record.mileage) && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs font-medium text-gray-500 uppercase mb-2">Vehicle Condition</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {record.fuelLevel && (
                      <div>
                        <span className="text-gray-600">Fuel: </span>
                        <span className="font-medium">{record.fuelLevel}%</span>
                      </div>
                    )}
                    {record.mileage && (
                      <div>
                        <span className="text-gray-600">Mileage: </span>
                        <span className="font-medium">{record.mileage.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Documentation Status */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-3">
                  {photoCount > 0 && (
                    <div className="flex items-center text-primary-600">
                      <Camera size={14} className="mr-1" />
                      <span className="text-xs">{photoCount}</span>
                    </div>
                  )}
                  {hasWalkAroundVideo && (
                    <div className="flex items-center text-secondary-600">
                      <Video size={14} className="mr-1" />
                      <span className="text-xs">Video</span>
                    </div>
                  )}
                  {record.signature && (
                    <div className="flex items-center text-success-600">
                      <FileText size={14} className="mr-1" />
                      <span className="text-xs">Signed</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {record.notes && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">{record.notes}</p>
              </div>
            )}
            
            {serviceCount > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Services</p>
                <div className="space-y-1">
                  {record.serviceItems!.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className={item.completed ? 'line-through text-gray-500' : ''}>
                        {item.description}
                      </span>
                      <span className="font-medium">${item.cost.toFixed(2)}</span>
                    </div>
                  ))}
                  {serviceCount > 3 && (
                    <p className="text-xs text-primary-600">
                      +{serviceCount - 3} more services
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  const CheckInOutListItem = ({ record }: { record: CheckInOut }) => {
    const customer = getCustomerById(record.customerId);
    const vehicle = getVehicleById(record.vehicleId);
    const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
    const vehicleInfo = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
    const status = statusConfig[record.status];
    const type = typeConfig[record.type];
    
    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="py-4 px-4">
          <div>
            <div className="text-sm font-medium text-gray-900">{formatDateDisplay(record.date)}</div>
            {record.checkInDate && (
              <div className="text-xs text-gray-500">
                In: {formatDateDisplay(record.checkInDate)}
              </div>
            )}
            {record.checkOutDate && (
              <div className="text-xs text-gray-500">
                Out: {formatDateDisplay(record.checkOutDate)}
              </div>
            )}
          </div>
        </td>
        <td className="py-4 px-4">
          <div className="flex flex-col space-y-1">
            <Badge variant={type.variant} className="text-xs w-fit">
              {type.label}
            </Badge>
            <Badge variant={status.variant} className="text-xs w-fit">
              {status.label}
            </Badge>
          </div>
        </td>
        <td className="py-4 px-4">
          <Link to={`/clients/${record.customerId}`} className="text-sm font-medium text-primary-600 hover:underline">
            {customerName}
          </Link>
        </td>
        <td className="py-4 px-4">
          <Link to={`/vehicles/${record.vehicleId}`} className="text-sm text-gray-900 hover:text-primary-600">
            {vehicleInfo}
          </Link>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm text-gray-600">{record.location}</span>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm text-gray-900">{record.contact}</span>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center space-x-2">
            <Link to={`/check-in-out/${record.id}`}>
              <Button variant="primary" size="sm">
                View Details
              </Button>
            </Link>
            <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <ClipboardCheck className="mr-3" size={28} />
            Check In/Out Records
          </h1>
          <p className="text-gray-600 mt-1">
            Manage vehicle check-in and check-out records
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Link to="/check-in-out/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Check In/Out
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{recordStats.totalRecords}</p>
            </div>
            <ClipboardCheck className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Services</p>
              <p className="text-2xl font-bold text-warning-600">{recordStats.activeServices}</p>
            </div>
            <Clock className="h-8 w-8 text-warning-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed Today</p>
              <p className="text-2xl font-bold text-success-600">{recordStats.completedToday}</p>
            </div>
            <CheckSquare className="h-8 w-8 text-success-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(recordStats.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
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
                placeholder="Search by record ID, customer, vehicle, contact, location, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Statuses' },
                { value: CheckStatus.CHECKED_IN, label: 'Checked In' },
                { value: CheckStatus.IN_SERVICE, label: 'In Service' },
                { value: CheckStatus.CHECKED_OUT, label: 'Checked Out' },
              ]}
            />
            
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Types' },
                { value: CheckType.CHECK_IN, label: 'Check In' },
                { value: CheckType.CHECK_OUT, label: 'Check Out' },
              ]}
            />
            
            <Select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Dates' },
                { value: 'today', label: 'Today' },
                { value: 'week', label: 'This Week' },
                { value: 'month', label: 'This Month' },
                { value: 'quarter', label: 'This Quarter' },
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
            { field: 'date' as SortField, label: 'Date' },
            { field: 'customer' as SortField, label: 'Customer' },
            { field: 'vehicle' as SortField, label: 'Vehicle' },
            { field: 'status' as SortField, label: 'Status' },
            { field: 'type' as SortField, label: 'Type' },
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
            {filteredAndSortedRecords.length} Record{filteredAndSortedRecords.length !== 1 ? 's' : ''}
          </h2>
          
          {(searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setTypeFilter('all');
                setDateFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredAndSortedRecords.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedRecords.map((record) => (
                <CheckInOutCard key={record.id} record={record} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type/Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Vehicle</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedRecords.map((record) => (
                    <CheckInOutListItem key={record.id} record={record} />
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No records found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by creating your first check-in record.'}
            </p>
            {!(searchTerm || statusFilter !== 'all' || typeFilter !== 'all' || dateFilter !== 'all') && (
              <div className="mt-6">
                <Link to="/check-in-out/new">
                  <Button variant="primary" leftIcon={<Plus size={16} />}>
                    Create First Check-In
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