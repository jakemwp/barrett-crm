import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Car, 
  ClipboardCheck, 
  User, 
  Phone, 
  Mail, 
  MapPin,
  Calendar,
  Clock,
  CheckSquare,
  Fuel,
  Battery,
  Shield,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getVehiclesByCustomerId, checkInOuts, getCheckInOutById } from '../data/mock-data';
import { CheckStatus, CheckType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency, formatDate } from '../lib/utils';

export function CustomerPortal() {
  const { user } = useAuth();
  
  if (!user || user.role !== 'Customer') {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
        <p className="mt-2 text-gray-600">You don't have permission to access this page.</p>
      </div>
    );
  }

  // Get customer's vehicles
  const customerVehicles = getVehiclesByCustomerId(user.customerId || '');
  
  // Get customer's check-in/out records
  const customerCheckInOuts = checkInOuts.filter(record => 
    record.customerId === user.customerId
  ).sort((a, b) => new Date(b.date || '').getTime() - new Date(a.date || '').getTime());

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

  const getFuelLevelColor = (level: number) => {
    if (level >= 75) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBatteryTypeColor = (type: string) => {
    switch (type) {
      case 'Lithium': return 'success';
      case 'AGM': return 'warning';
      case 'Standard': return 'default';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium text-xl">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600 mt-1">
              Customer Portal - View your vehicles and service records
            </p>
          </div>
        </div>
        
        {/* Customer Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <Mail className="mr-2 text-gray-400" size={16} />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 text-gray-400" size={16} />
            <span className="text-sm text-gray-600">{user.phone || 'No phone provided'}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 text-gray-400" size={16} />
            <span className="text-sm text-gray-600">{user.department || 'No location provided'}</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">My Vehicles</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customerVehicles.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Car size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Service Records</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customerCheckInOuts.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
                <ClipboardCheck size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Active Services</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {customerCheckInOuts.filter(r => 
                    r.status === CheckStatus.CHECKED_IN || r.status === CheckStatus.IN_SERVICE
                  ).length}
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center text-warning-600">
                <Clock size={24} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* My Vehicles */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Car className="mr-2" size={20} />
            My Vehicles ({customerVehicles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customerVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customerVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    {vehicle.image && (
                      <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={vehicle.image} 
                          alt={`${vehicle.make || ''} ${vehicle.model || ''}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {vehicle.year || ''} {vehicle.make || ''} {vehicle.model || ''}
                        </h3>
                        <p className="text-sm text-gray-600">{vehicle.licensePlate || 'No Plate'}</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Storage Location:</span>
                          <span className="font-medium">{vehicle.storageLocation || 'Not assigned'}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Odometer:</span>
                          <span className="font-medium">{(vehicle.odometer ?? 0).toLocaleString()} mi</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Fuel className={`mr-1 ${getFuelLevelColor(vehicle.fuelLevel)}`} size={14} />
                            <span className="text-gray-600">Fuel Level:</span>
                          </div>
                          <span className={`font-medium ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                            {vehicle.fuelLevel}%
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <Battery className="mr-1 text-gray-400" size={14} />
                            <span className="text-gray-600">Battery:</span>
                          </div>
                          <Badge variant={getBatteryTypeColor(vehicle.batteryType)} className="text-xs">
                            {vehicle.batteryType}
                          </Badge>
                        </div>
                        
                        {vehicle.insuranceRiderRequired && (
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                              <Shield className="mr-1 text-blue-600" size={14} />
                              <span className="text-gray-600">Insurance:</span>
                            </div>
                            <Badge variant="warning" className="text-xs">
                              Required
                            </Badge>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Fair Market Value:</span>
                          <span className="font-medium text-green-600">
                            {formatCurrency(vehicle.fairMarketValue)}
                          </span>
                        </div>
                      </div>
                      
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any vehicles stored with us yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardCheck className="mr-2" size={20} />
            Service History ({customerCheckInOuts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customerCheckInOuts.length > 0 ? (
            <div className="space-y-4">
              {customerCheckInOuts.map((record) => {
                const vehicle = customerVehicles.find(v => v.id === record.vehicleId);
                const vehicleInfo = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
                const status = statusConfig[record.status];
                const type = typeConfig[record.type || CheckType.CHECK_IN];
                const serviceCount = record.serviceItems?.length || 0;
                const totalCost = record.serviceItems?.reduce((sum, item) => sum + item.cost, 0) || 0;
                
                return (
                  <Card key={record.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Service #{record.id.substring(0, 8).toUpperCase()}
                          </h3>
                          <p className="text-sm text-gray-600">{vehicleInfo}</p>
                          <p className="text-sm text-gray-500">{formatDateDisplay(record.date || '')}</p>
                        </div>
                        <div className="flex flex-col items-end space-y-1">
                          <Badge variant={status.variant} className="text-xs">
                            {status.label}
                          </Badge>
                          <Badge variant={type.variant} className="text-xs">
                            {type.label}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{record.location}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Contact:</span>
                            <span className="font-medium">{record.contact}</span>
                          </div>
                          {record.checkInDate && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Check-in:</span>
                              <span className="font-medium">{formatDateDisplay(record.checkInDate)}</span>
                            </div>
                          )}
                          {record.checkOutDate && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Check-out:</span>
                              <span className="font-medium">{formatDateDisplay(record.checkOutDate)}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          {record.fuelLevel && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Fuel Level:</span>
                              <span className="font-medium">{record.fuelLevel}%</span>
                            </div>
                          )}
                          {record.mileage && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Mileage:</span>
                              <span className="font-medium">{record.mileage.toLocaleString()} mi</span>
                            </div>
                          )}
                          {serviceCount > 0 && (
                            <>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Services:</span>
                                <span className="font-medium">{serviceCount} item{serviceCount !== 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Total Cost:</span>
                                <span className="font-medium text-green-600">{formatCurrency(totalCost)}</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {record.notes && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Notes:</span> {record.notes}
                          </p>
                        </div>
                      )}
                      
                      {record.serviceItems && record.serviceItems.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Service Items:</h4>
                          <div className="space-y-1">
                            {record.serviceItems.map((item) => (
                              <div key={item.id} className="flex justify-between text-sm">
                                <span className={item.completed ? 'line-through text-gray-500' : ''}>
                                  {item.description}
                                </span>
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium">{formatCurrency(item.cost)}</span>
                                  {item.completed && (
                                    <CheckSquare size={14} className="text-green-600" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <ClipboardCheck className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No service records</h3>
              <p className="mt-1 text-sm text-gray-500">
                You don't have any service records yet.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}