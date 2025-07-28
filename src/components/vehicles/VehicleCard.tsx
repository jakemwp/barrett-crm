import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  Building, 
  DollarSign, 
  Shield, 
  Fuel, 
  Battery,
  Users,
  MapPin,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Vehicle } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, formatCurrency } from '../../lib/utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  customerName?: string;
  showCustomer?: boolean;
}

export function VehicleCard({ vehicle, customerName, showCustomer = false }: VehicleCardProps) {
  const getFuelLevelColor = (level: number) => {
    if (level >= 75) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    if (level >= 25) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBatteryTypeColor = (type: string) => {
    switch (type) {
      case 'Lithium-Ion (EV)':
      case 'Lithium-Ion (Plug-In Hybrid EV)':
      case 'Lithium-Ion (Hybrid EV)':
        return 'success';
      case 'Lead-Acid Sealed (AGM)':
      case 'Lead-Acid Sealed (Gel)':
        return 'warning';
      case 'Lead-Acid Flooded':
        return 'default';
      default: return 'outline';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          {/* Header with vehicle image */}
          <div className="mb-4">
            {vehicle.image && (
              <div className="w-full h-32 mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.make || ''} ${vehicle.model || ''}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="flex justify-between items-start">
              <Link to={`/vehicles/${vehicle.id}`} className="block">
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                  {vehicle.year || ''} {vehicle.make || ''} {vehicle.model || ''}
                </h3>
                <p className="text-sm text-gray-600">{vehicle.licensePlate || 'No Plate'}</p>
              </Link>
              <div className="flex flex-col items-end space-y-1">
                {vehicle.year && (
                  <Badge variant="default" className="text-xs">
                    {vehicle.year}
                  </Badge>
                )}
                {vehicle.insuranceRiderRequired && (
                  <Badge variant="warning" className="text-xs flex items-center">
                    <Shield size={12} className="mr-1" />
                    Insured
                  </Badge>
                )}
              </div>
            </div>
            
            {showCustomer && customerName && (
              <p className="mt-2 text-sm text-gray-500">
                Owner: <Link to={`/customers/${vehicle.customerId}`} className="text-primary-600 hover:underline">{customerName}</Link>
              </p>
            )}
          </div>
          
          {/* Vehicle Details */}
          <div className="flex-1 space-y-3">
            {vehicle.storageLocation && (
              <div className="flex items-center text-sm text-gray-600">
                <Building size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <span className="truncate">{vehicle.storageLocation}</span>
              </div>
            )}
            
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign size={16} className="flex-shrink-0 mr-2 text-gray-400" />
              <span>Fair Market Value: {formatCurrency(vehicle.fairMarketValue)}</span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center text-sm">
                <Fuel size={16} className={`flex-shrink-0 mr-1 ${getFuelLevelColor(vehicle.fuelLevel)}`} />
                <span className={getFuelLevelColor(vehicle.fuelLevel)}>
                  {vehicle.fuelLevel}%
                </span>
              </div>
              
              <div className="flex items-center text-sm">
                <Battery size={16} className="flex-shrink-0 mr-1 text-gray-400" />
                <Badge variant={getBatteryTypeColor(vehicle.batteryType)} className="text-xs">
                  {vehicle.batteryType}
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs uppercase font-medium">VIN</p>
                <p className="font-mono text-xs truncate">{vehicle.vin || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase font-medium">Odometer</p>
                <p className="font-semibold">{(vehicle.odometer ?? 0).toLocaleString()} mi</p>
              </div>
            </div>
            
            {vehicle.color && (
              <div className="flex items-center text-sm text-gray-600">
                <div 
                  className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                  style={{ backgroundColor: vehicle.color.toLowerCase() }}
                />
                <span>{vehicle.color}</span>
              </div>
            )}
          </div>
          
          {/* Authorized Drivers */}
          {vehicle.authorizedDrivers && vehicle.authorizedDrivers.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Users size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <span className="font-medium">
                  {vehicle.authorizedDrivers.length} Authorized Driver{vehicle.authorizedDrivers.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="space-y-1">
                {vehicle.authorizedDrivers.slice(0, 2).map((driver) => (
                  <div key={driver.id} className="text-xs text-gray-600">
                    {driver.name} {driver.relationship ? `(${driver.relationship})` : ''}
                  </div>
                ))}
                {vehicle.authorizedDrivers.length > 2 && (
                  <div className="text-xs text-primary-600">
                    +{vehicle.authorizedDrivers.length - 2} more
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Registration Status */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Registration:</span>
              <div className="flex items-center">
                {vehicle.registration?.expirationDate ? (
                  <>
                    {new Date(vehicle.registration.expirationDate) > new Date() ? (
                      <CheckCircle size={16} className="text-green-600 mr-1" />
                    ) : (
                      <AlertTriangle size={16} className="text-red-600 mr-1" />
                    )}
                    <span className={`font-medium ${
                      new Date(vehicle.registration.expirationDate) > new Date() 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}>
                      {formatDate(vehicle.registration.expirationDate)}
                    </span>
                  </>
                ) : (
                  <span className="font-medium text-gray-400">Not available</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}