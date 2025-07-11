import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, User, Car, Clipboard, Camera, Video, FileText } from 'lucide-react';
import { CheckInOut, CheckStatus, CheckType } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDateTime } from '../../lib/utils';

interface CheckInOutCardProps {
  checkInOut: CheckInOut;
  customerName: string;
  vehicleInfo: string;
}

export function CheckInOutCard({ checkInOut, customerName, vehicleInfo }: CheckInOutCardProps) {
  const statusConfig = {
    [CheckStatus.CHECKED_IN]: {
      label: 'Checked In',
      variant: 'warning' as const,
      icon: <Clock size={16} className="mr-1" />,
    },
    [CheckStatus.IN_SERVICE]: {
      label: 'In Service',
      variant: 'default' as const,
      icon: <Clipboard size={16} className="mr-1" />,
    },
    [CheckStatus.CHECKED_OUT]: {
      label: 'Checked Out',
      variant: 'success' as const,
      icon: <CheckSquare size={16} className="mr-1" />,
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

  const status = statusConfig[checkInOut.status];
  const type = typeConfig[checkInOut.type];

  // Count photos and videos
  const photoCount = checkInOut.photos ? Object.values(checkInOut.photos).flat().filter(Boolean).length : 0;
  const hasWalkAroundVideo = checkInOut.photos?.walkAroundVideo;

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <Link to={`/check-in-out/${checkInOut.id}`} className="block">
              <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600">
                Check #{checkInOut.id.substring(0, 8).toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500 mt-1">{checkInOut.date}</p>
            </Link>
            <div className="flex flex-col items-end space-y-1">
              <Badge variant={status.variant} className="flex items-center text-xs">
                {status.icon}
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
              <Link to={`/clients/${checkInOut.customerId}`} className="font-medium hover:text-primary-600">
                {customerName}
              </Link>
            </div>
            
            <div className="flex items-center text-sm text-gray-700">
              <Car size={16} className="flex-shrink-0 mr-2 text-gray-400" />
              <Link to={`/vehicles/${checkInOut.vehicleId}`} className="hover:text-primary-600">
                {vehicleInfo}
              </Link>
            </div>
            
            <div className="flex items-center text-sm text-gray-700">
              <Clock size={16} className="flex-shrink-0 mr-2 text-gray-400" />
              <span>Check-in: {formatDateTime(checkInOut.checkInDate || checkInOut.date)}</span>
            </div>
            
            {checkInOut.checkOutDate && (
              <div className="flex items-center text-sm text-gray-700">
                <CheckSquare size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                <span>Check-out: {formatDateTime(checkInOut.checkOutDate)}</span>
              </div>
            )}

            {/* Vehicle Condition */}
            {(checkInOut.fuelLevel || checkInOut.mileage) && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-xs font-medium text-gray-500 uppercase mb-2">Vehicle Condition</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {checkInOut.fuelLevel && (
                    <div>
                      <span className="text-gray-600">Fuel: </span>
                      <span className="font-medium">{checkInOut.fuelLevel}%</span>
                    </div>
                  )}
                  {checkInOut.mileage && (
                    <div>
                      <span className="text-gray-600">Mileage: </span>
                      <span className="font-medium">{checkInOut.mileage.toLocaleString()}</span>
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
                {checkInOut.signature && (
                  <div className="flex items-center text-success-600">
                    <FileText size={14} className="mr-1" />
                    <span className="text-xs">Signed</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {checkInOut.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">{checkInOut.notes}</p>
            </div>
          )}
          
          {checkInOut.serviceItems && checkInOut.serviceItems.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase mb-2">Services</p>
              <div className="space-y-1">
                {checkInOut.serviceItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className={item.completed ? 'line-through text-gray-500' : ''}>
                      {item.description}
                    </span>
                    <span className="font-medium">${item.cost.toFixed(2)}</span>
                  </div>
                ))}
                {checkInOut.serviceItems.length > 3 && (
                  <p className="text-xs text-primary-600">
                    +{checkInOut.serviceItems.length - 3} more services
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}