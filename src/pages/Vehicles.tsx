import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Shield,
  AlertTriangle,
  CheckCircle,
  DollarSign
} from 'lucide-react';
import { vehicles, getCustomerById } from '../data/mock-data';
import { Vehicle } from '../types';
import { VehicleCard } from '../components/vehicles/VehicleCard';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Badge } from '../components/ui/Badge';
import { formatCurrency, formatDate } from '../lib/utils';

type ViewMode = 'grid' | 'list';
type SortField = 'make' | 'year' | 'value' | 'odometer' | 'lastService';
type SortOrder = 'asc' | 'desc';

export function Vehicles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [makeFilter, setMakeFilter] = useState('all');
  const [batteryFilter, setBatteryFilter] = useState('all');
  const [insuranceFilter, setInsuranceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortField, setSortField] = useState<SortField>('make');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const filteredAndSortedVehicles = useMemo(() => {
    let filtered = vehicles.filter(vehicle => {
      const customer = getCustomerById(vehicle.customerId);
      const customerName = customer ? `${customer.firstName ?? ''} ${customer.lastName ?? ''}` : '';
      
      const matchesSearch = 
        (vehicle.make ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.model ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.licensePlate ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.vin ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (vehicle.storageLocation ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        customerName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesMake = makeFilter === 'all' || vehicle.make === makeFilter;
      const matchesBattery = batteryFilter === 'all' || vehicle.batteryType === batteryFilter;
      const matchesInsurance = insuranceFilter === 'all' || 
        (insuranceFilter === 'required' && vehicle.insuranceRiderRequired) ||
        (insuranceFilter === 'not-required' && !vehicle.insuranceRiderRequired);
      
      return matchesSearch && matchesMake && matchesBattery && matchesInsurance;
    });

    // Sort vehicles
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'make':
          aValue = `${a.make ?? ''} ${a.model ?? ''}`;
          bValue = `${b.make ?? ''} ${b.model ?? ''}`;
          break;
        case 'year':
          aValue = a.year ?? 0;
          bValue = b.year ?? 0;
          break;
        case 'value':
          aValue = a.fairMarketValue;
          bValue = b.fairMarketValue;
          break;
        case 'odometer':
          aValue = a.odometer ?? 0;
          bValue = b.odometer ?? 0;
          break;
        case 'lastService':
          aValue = a.maintenanceSchedule?.lastService ? new Date(a.maintenanceSchedule.lastService).getTime() : 0;
          bValue = b.maintenanceSchedule?.lastService ? new Date(b.maintenanceSchedule.lastService).getTime() : 0;
          break;
        default:
          aValue = `${a.make ?? ''} ${a.model ?? ''}`;
          bValue = `${b.make ?? ''} ${b.model ?? ''}`;
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
  }, [searchTerm, makeFilter, batteryFilter, insuranceFilter, sortField, sortOrder]);

  const makeOptions = useMemo(() => {
    const makes = [...new Set(vehicles.map(v => v.make).filter(Boolean))].sort();
    return [
      { value: 'all', label: 'All Makes' },
      ...makes.map(make => ({ value: make as string, label: make as string }))
    ];
  }, []);

  const batteryOptions = useMemo(() => {
    const types = [...new Set(vehicles.map(v => v.batteryType))].sort();
    return [
      { value: 'all', label: 'All Battery Types' },
      ...types.map(type => ({ value: type, label: type }))
    ];
  }, []);

  const vehicleStats = useMemo(() => {
    const totalValue = vehicles.reduce((sum, v) => sum + v.fairMarketValue, 0);
    const insuredVehicles = vehicles.filter(v => v.insuranceRiderRequired).length;
    const avgOdometer = vehicles.reduce((sum, v) => sum + (v.odometer ?? 0), 0) / vehicles.length;
    const expiredRegistrations = vehicles.filter(v => 
      v.registration?.expirationDate && new Date(v.registration.expirationDate) <= new Date()
    ).length;
    
    return {
      totalValue,
      insuredVehicles,
      avgOdometer: Math.round(avgOdometer),
      expiredRegistrations
    };
  }, []);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      case 'Lithium-Ion (EV)':
      case 'Lithium-Ion (Plug-In Hybrid EV)':
      case 'Lithium-Ion (Hybrid EV)':
        return 'success';
      case 'Lead-Acid Sealed (AGM)':
      case 'Lead-Acid Sealed (Gel)':
        return 'warning';
      case 'Lead-Acid Flooded':
        return 'default';
      setSortOrder('asc');
    }
  };

  const VehicleListItem = ({ vehicle }: { vehicle: Vehicle }) => {
    const customer = getCustomerById(vehicle.customerId);
    const customerName = customer ? `${customer.firstName ?? ''} ${customer.lastName ?? ''}` : 'Unknown Customer';
    
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {vehicle.image && (
              <div className="w-16 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.make || ''} ${vehicle.model || ''}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div>
              <Link to={`/vehicles/${vehicle.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                  {vehicle.year || ''} {vehicle.make || ''} {vehicle.model || ''}
                </h3>
              </Link>
              <p className="text-sm text-gray-600">{vehicle.licensePlate || 'No Plate'} • {vehicle.storageLocation || 'No Location'}</p>
              <p className="text-sm text-gray-500">
                Owner: <Link to={`/clients/${vehicle.customerId}`} className="text-primary-600 hover:underline">
                  {customerName}
                </Link>
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{formatCurrency(vehicle.fairMarketValue)}</p>
              <p className="text-xs text-gray-500">Fair Market Value</p>
            </div>
            
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{(vehicle.odometer ?? 0).toLocaleString()} mi</p>
              <p className="text-xs text-gray-500">Odometer</p>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-2">
                {vehicle.insuranceRiderRequired && (
                  <Badge variant="warning" className="text-xs">
                    <Shield size={12} className="mr-1" />
                    Insured
                  </Badge>
                )}
                <Badge variant={vehicle.batteryType === 'Lithium' ? 'success' : 'default'} className="text-xs">
                  {vehicle.batteryType}
                </Badge>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Fuel: {vehicle.fuelLevel}%
              </p>
            </div>
            
            <div className="text-right">
              {vehicle.registration?.expirationDate ? (
                <div className="flex items-center">
                  {new Date(vehicle.registration.expirationDate) > new Date() ? (
                    <CheckCircle size={16} className="text-green-600 mr-1" />
                  ) : (
                    <AlertTriangle size={16} className="text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    new Date(vehicle.registration.expirationDate) > new Date() 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {formatDate(vehicle.registration.expirationDate)}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <AlertTriangle size={16} className="text-gray-400 mr-1" />
                  <span className="text-sm font-medium text-gray-400">
                    No Registration
                  </span>
                </div>
              )}
              <p className="text-xs text-gray-500">Registration</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Car className="mr-3" size={28} />
            Vehicles
          </h1>
          <p className="text-gray-600 mt-1">
            Manage stored vehicles and their detailed information
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Link to="/vehicles/new">
            <Button variant="primary" leftIcon={<Plus size={16} />}>
              Add Vehicle
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
              <p className="text-2xl font-bold text-gray-900">{vehicles.length}</p>
            </div>
            <Car className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(vehicleStats.totalValue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Insured Vehicles</p>
              <p className="text-2xl font-bold text-blue-600">{vehicleStats.insuredVehicles}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg. Mileage</p>
              <p className="text-2xl font-bold text-purple-600">{vehicleStats.avgOdometer.toLocaleString()}</p>
            </div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">MI</span>
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
                placeholder="Search vehicles by make, model, license plate, VIN, location, or owner..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={makeFilter}
              onChange={(e) => setMakeFilter(e.target.value)}
              options={makeOptions}
            />
            
            <Select
              value={batteryFilter}
              onChange={(e) => setBatteryFilter(e.target.value)}
              options={batteryOptions}
            />
            
            <Select
              value={insuranceFilter}
              onChange={(e) => setInsuranceFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Insurance' },
                { value: 'required', label: 'Insurance Required' },
                { value: 'not-required', label: 'No Insurance Required' },
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
            { field: 'make' as SortField, label: 'Make/Model' },
            { field: 'year' as SortField, label: 'Year' },
            { field: 'value' as SortField, label: 'Value' },
            { field: 'odometer' as SortField, label: 'Mileage' },
            { field: 'lastService' as SortField, label: 'Last Service' },
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
            {filteredAndSortedVehicles.length} Vehicle{filteredAndSortedVehicles.length !== 1 ? 's' : ''}
          </h2>
          
          {(searchTerm || makeFilter !== 'all' || batteryFilter !== 'all' || insuranceFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setMakeFilter('all');
                setBatteryFilter('all');
                setInsuranceFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredAndSortedVehicles.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedVehicles.map((vehicle) => {
                const customer = getCustomerById(vehicle.customerId);
                const customerName = customer ? `${customer.firstName ?? ''} ${customer.lastName ?? ''}` : 'Unknown Customer';
                
                return (
                  <VehicleCard 
                    key={vehicle.id} 
                    vehicle={vehicle} 
                    customerName={customerName}
                    showCustomer={true}
                  />
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAndSortedVehicles.map((vehicle) => (
                <VehicleListItem key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <Car className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || makeFilter !== 'all' || batteryFilter !== 'all' || insuranceFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first vehicle.'}
            </p>
            {!(searchTerm || makeFilter !== 'all' || batteryFilter !== 'all' || insuranceFilter !== 'all') && (
              <div className="mt-6">
                <Link to="/vehicles/new">
                  <Button variant="primary" leftIcon={<Plus size={16} />}>
                    Add Vehicle
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