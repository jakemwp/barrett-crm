import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Car, 
  Wrench, 
  ArrowRight, 
  Clock, 
  CheckSquare,
  AlertCircle,
  ChevronRight,
  ClipboardCheck
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardFooter 
} from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  customers, 
  vehicles, 
  checkInOuts, 
  getCustomerById,
  getVehicleById
} from '../data/mock-data';
import { CheckStatus } from '../types';

export function Dashboard() {
  // Get recently serviced vehicles (checked out in the last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const recentlyServiced = checkInOuts
    .filter(record => 
      record.status === CheckStatus.CHECKED_OUT && 
      record.checkOutDate && 
      new Date(record.checkOutDate) >= sevenDaysAgo
    )
    .slice(0, 3);

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="flex space-x-2">
          <Link to="/clients/new">
            <Button variant="primary" leftIcon={<Users size={16} />}>
              Add Client
            </Button>
          </Link>
          <Link to="/vehicles/new">
            <Button variant="outline" leftIcon={<Car size={16} />}>
              Add Vehicle
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{customers.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                <Users size={24} />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/clients" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                View All Clients
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vehicles</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{vehicles.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-secondary-100 flex items-center justify-center text-secondary-600">
                <Car size={24} />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/vehicles" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                View All Vehicles
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Check In/Out Records</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{checkInOuts.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-warning-100 flex items-center justify-center text-warning-600">
                <ClipboardCheck size={24} />
              </div>
            </div>
            <div className="mt-4">
              <Link to="/check-in-out" className="text-sm font-medium text-primary-600 hover:text-primary-800 flex items-center">
                View All Records
                <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link to="/check-in-out/new">
              <Button 
                className="h-auto py-6 flex flex-col items-center justify-center space-y-2 w-full"
                variant="outline"
              >
                <Car size={24} />
                <span>Check-In Vehicle</span>
              </Button>
            </Link>
            
            <Link to="/clients/new">
              <Button 
                className="h-auto py-6 flex flex-col items-center justify-center space-y-2 w-full"
                variant="outline"
              >
                <Users size={24} />
                <span>Add Client</span>
              </Button>
            </Link>
            
            <Link to="/vehicles/new">
              <Button 
                className="h-auto py-6 flex flex-col items-center justify-center space-y-2 w-full"
                variant="outline"
              >
                <Car size={24} />
                <span>Add Vehicle</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <Link 
            to="/check-in-out"
            className="text-sm text-primary-600 hover:text-primary-800"
          >
            View All
          </Link>
        </CardHeader>
        <CardContent>
          {recentlyServiced.length > 0 ? (
            <div className="space-y-4">
              {recentlyServiced.map(record => {
                const customer = getCustomerById(record.customerId);
                const vehicle = getVehicleById(record.vehicleId);
                
                const customerName = customer 
                  ? `${customer.firstName} ${customer.lastName}` 
                  : 'Unknown Customer';
                
                const vehicleInfo = vehicle 
                  ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` 
                  : 'Unknown Vehicle';
                
                return (
                  <div key={record.id} className="flex items-center p-4 rounded-md border border-gray-200 hover:bg-gray-50">
                    <div className="mr-4 flex-shrink-0 h-12 w-12 rounded-full bg-success-50 flex items-center justify-center text-success-600">
                      <CheckSquare size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{customerName}</p>
                      <p className="text-sm text-gray-600">{vehicleInfo}</p>
                      <p className="text-sm text-gray-500">
                        Completed: {formatDateDisplay(record.checkOutDate || record.date)}
                      </p>
                    </div>
                    <Link 
                      to={`/check-in-out/${record.id}`}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      <ChevronRight size={20} />
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-gray-100 p-3 mb-4">
                <AlertCircle size={24} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Recent Activity</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no vehicles that have been serviced in the last 7 days.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t">
          <Link to="/check-in-out/new">
            <Button variant="primary" className="w-full">
              Start New Service
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}