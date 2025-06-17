import React from 'react';
import { Link } from 'react-router-dom';
import { CalendarClock, User, Car, Clock } from 'lucide-react';
import { Appointment } from '../../types';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';

interface AppointmentCardProps {
  appointment: Appointment;
  customerName: string;
  vehicleInfo?: string;
}

export function AppointmentCard({ appointment, customerName, vehicleInfo }: AppointmentCardProps) {
  const statusConfig = {
    'SCHEDULED': {
      label: 'Scheduled',
      variant: 'default' as const,
    },
    'COMPLETED': {
      label: 'Completed',
      variant: 'success' as const,
    },
    'CANCELED': {
      label: 'Canceled',
      variant: 'error' as const,
    },
  };

  const status = statusConfig[appointment.status];
  
  // Format time to display properly (e.g., "2:30 PM")
  const formatTimeDisplay = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hourNum = parseInt(hours, 10);
    const ampm = hourNum >= 12 ? 'PM' : 'AM';
    const hourDisplay = hourNum % 12 === 0 ? 12 : hourNum % 12;
    return `${hourDisplay}:${minutes} ${ampm}`;
  };

  return (
    <Card className="h-full hover:shadow-md transition-shadow duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center">
                <CalendarClock size={18} className="mr-2 text-primary-600" />
                <h3 className="text-lg font-semibold text-gray-900">
                  {new Date(appointment.date).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {formatTimeDisplay(appointment.time)} ({appointment.duration} min)
              </p>
            </div>
            <Badge variant={status.variant} className="text-xs">
              {status.label}
            </Badge>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-center text-sm text-gray-700">
              <User size={16} className="flex-shrink-0 mr-2 text-gray-400" />
              <Link to={`/customers/${appointment.customerId}`} className="font-medium hover:text-primary-600">
                {customerName}
              </Link>
            </div>
            
            {vehicleInfo && (
              <div className="flex items-center text-sm text-gray-700">
                <Car size={16} className="flex-shrink-0 mr-2 text-gray-400" />
                {appointment.vehicleId ? (
                  <Link to={`/vehicles/${appointment.vehicleId}`} className="hover:text-primary-600">
                    {vehicleInfo}
                  </Link>
                ) : (
                  <span>{vehicleInfo}</span>
                )}
              </div>
            )}
            
            <div className="bg-gray-50 p-3 rounded-md">
              <p className="text-sm text-gray-800">{appointment.reason}</p>
            </div>
          </div>
          
          {appointment.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs font-medium text-gray-500 uppercase mb-1">Notes</p>
              <p className="text-sm text-gray-600">{appointment.notes}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
            <Link 
              to={`/appointments/${appointment.id}`}
              className="text-sm font-medium text-primary-600 hover:text-primary-800"
            >
              View Details
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}