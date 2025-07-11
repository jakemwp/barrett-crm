import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Edit, 
  X, 
  Car, 
  User, 
  Calendar, 
  FileText, 
  Clock, 
  CheckSquare,
  Plus,
  Trash2,
  Download,
  Camera,
  Video
} from 'lucide-react';
import { getCheckInOutById, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckStatus, CheckType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PhotoUpload } from '../components/ui/PhotoUpload';
import { VideoUpload } from '../components/ui/VideoUpload';

export function CheckInOutDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkInOut, setCheckInOut] = useState<CheckInOut | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CheckInOut | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const checkData = getCheckInOutById(id);
      
      if (checkData) {
        setCheckInOut(checkData);
        setFormData(checkData);
      } else {
        navigate('/check-in-out');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleInputChange = (field: keyof CheckInOut, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleNestedInputChange = (parentField: keyof CheckInOut, childField: string, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [parentField]: {
          ...(formData[parentField] as any),
          [childField]: value,
        },
      });
    }
  };

  const handlePhotoChange = (photoType: string, urls: string[]) => {
    if (formData) {
      const newPhotos = {
        ...formData.photos,
        [photoType]: urls.length === 1 ? urls[0] : urls.length > 1 ? urls : undefined
      };
      
      setFormData({
        ...formData,
        photos: newPhotos,
      });
    }
  };

  const handleVideoChange = (url: string | null) => {
    if (formData) {
      const newPhotos = {
        ...formData.photos,
        walkAroundVideo: url || undefined
      };
      
      setFormData({
        ...formData,
        photos: newPhotos,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      // In a real app, this would make an API call
      setCheckInOut(formData);
      setIsEditing(false);
      // Show success message
    }
  };

  const handleCancel = () => {
    setFormData(checkInOut);
    setIsEditing(false);
  };

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!checkInOut || !formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Check-in/out record not found</h2>
        <p className="mt-2 text-gray-600">The record you're looking for doesn't exist.</p>
        <Link to="/check-in-out" className="mt-4 inline-block">
          <Button variant="primary">Back to Check In/Out</Button>
        </Link>
      </div>
    );
  }

  const customer = getCustomerById(checkInOut.customerId);
  const vehicle = getVehicleById(checkInOut.vehicleId);
  const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';
  const vehicleInfo = vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';

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

  const status = statusConfig[checkInOut.status];
  const type = typeConfig[checkInOut.type];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/check-in-out">
            <Button variant="outline" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Check #{checkInOut.id.substring(0, 8).toUpperCase()}
            </h1>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant={status.variant} className="text-xs">
                {status.label}
              </Badge>
              <Badge variant={type.variant} className="text-xs">
                {type.label}
              </Badge>
              <span className="text-sm text-gray-500">{formatDateDisplay(checkInOut.date)}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={handleCancel} leftIcon={<X size={16} />}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSave} leftIcon={<Save size={16} />}>
                Save Changes
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" leftIcon={<Download size={16} />}>
                Export PDF
              </Button>
              <Button variant="primary" onClick={() => setIsEditing(true)} leftIcon={<Edit size={16} />}>
                Edit Record
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" size={20} />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  disabled={!isEditing}
                />
                <Select
                  label="Type"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as CheckType)}
                  disabled={!isEditing}
                  options={[
                    { value: CheckType.CHECK_IN, label: 'Check In' },
                    { value: CheckType.CHECK_OUT, label: 'Check Out' },
                  ]}
                />
                <Input
                  label="Location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Contact"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  disabled={!isEditing}
                />
                <Select
                  label="Status"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as CheckStatus)}
                  disabled={!isEditing}
                  options={[
                    { value: CheckStatus.CHECKED_IN, label: 'Checked In' },
                    { value: CheckStatus.IN_SERVICE, label: 'In Service' },
                    { value: CheckStatus.CHECKED_OUT, label: 'Checked Out' },
                  ]}
                />
                <Input
                  label="Delivery Address"
                  value={formData.deliveryAddress || ''}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Condition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" size={20} />
                Vehicle Condition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fuel Level (%)"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.fuelLevel || ''}
                  onChange={(e) => handleInputChange('fuelLevel', parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                />
                <Input
                  label="Mileage"
                  type="number"
                  value={formData.mileage || ''}
                  onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
                  disabled={!isEditing}
                />
              </div>

              {/* Tire Pressure */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tire Pressure</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    label="Passenger Front"
                    type="number"
                    value={formData.tirePressure?.passengerFront || ''}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'passengerFront', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Passenger Rear"
                    type="number"
                    value={formData.tirePressure?.passengerRear || ''}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'passengerRear', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Driver Front"
                    type="number"
                    value={formData.tirePressure?.driverFront || ''}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'driverFront', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Driver Rear"
                    type="number"
                    value={formData.tirePressure?.driverRear || ''}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'driverRear', parseInt(e.target.value) || 0)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Vehicle Preparation */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Preparation</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.carCover || false}
                        onChange={(e) => handleInputChange('carCover', e.target.checked)}
                        disabled={!isEditing}
                        className="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Car Cover</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.killSwitch || false}
                        onChange={(e) => handleInputChange('killSwitch', e.target.checked)}
                        disabled={!isEditing}
                        className="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Kill Switch</span>
                    </label>
                  </div>
                  
                  <Textarea
                    label="Startup Directions"
                    value={formData.startupDirections || ''}
                    onChange={(e) => handleInputChange('startupDirections', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2" size={20} />
                Basic Vehicle Photos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoUpload
                  title="Driver Side Photo"
                  description="Photo of the driver side of the vehicle"
                  multiple={false}
                  maxSize={10}
                  initialPhotos={formData.photos?.driverPic ? [formData.photos.driverPic] : []}
                  onPhotosChange={(urls) => handlePhotoChange('driverPic', urls)}
                  disabled={!isEditing}
                />
                
                <PhotoUpload
                  title="Passenger Side Photo"
                  description="Photo of the passenger side of the vehicle"
                  multiple={false}
                  maxSize={10}
                  initialPhotos={formData.photos?.passengerPic ? [formData.photos.passengerPic] : []}
                  onPhotosChange={(urls) => handlePhotoChange('passengerPic', urls)}
                  disabled={!isEditing}
                />
                
                <PhotoUpload
                  title="Front Photo"
                  description="Photo of the front of the vehicle"
                  multiple={false}
                  maxSize={10}
                  initialPhotos={formData.photos?.frontPic ? [formData.photos.frontPic] : []}
                  onPhotosChange={(urls) => handlePhotoChange('frontPic', urls)}
                  disabled={!isEditing}
                />
                
                <PhotoUpload
                  title="Rear Photo"
                  description="Photo of the rear of the vehicle"
                  multiple={false}
                  maxSize={10}
                  initialPhotos={formData.photos?.rearPic ? [formData.photos.rearPic] : []}
                  onPhotosChange={(urls) => handlePhotoChange('rearPic', urls)}
                  disabled={!isEditing}
                />
              </div>
              
              {/* Walk Around Video */}
              <VideoUpload
                title="Walk Around Video"
                description="Record or select a video showing the vehicle's exterior condition"
                initialVideo={formData.photos?.walkAroundVideo}
                onVideoChange={handleVideoChange}
                disabled={!isEditing}
                maxSize={100}
              />
            </CardContent>
          </Card>

          {/* Detailed Inspection Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2" size={20} />
                Detailed Inspection Photos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Engine Bay */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engine Bay</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Engine Bay Photos"
                    description="Multiple photos of the engine bay"
                    multiple={true}
                    maxSize={10}
                    initialPhotos={formData.photos?.engineBayPics || []}
                    onPhotosChange={(urls) => handlePhotoChange('engineBayPics', urls)}
                    disabled={!isEditing}
                  />
                  
                  <PhotoUpload
                    title="Hood Photos"
                    description="Photos of the hood exterior and interior"
                    multiple={true}
                    maxSize={10}
                    initialPhotos={formData.photos?.hoodPics || []}
                    onPhotosChange={(urls) => handlePhotoChange('hoodPics', urls)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Interior */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interior</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Dashboard Photos"
                    description="Include odometer and fuel level readings"
                    multiple={true}
                    maxSize={10}
                    initialPhotos={formData.photos?.dashboardPics || []}
                    onPhotosChange={(urls) => handlePhotoChange('dashboardPics', urls)}
                    disabled={!isEditing}
                  />
                  
                  <PhotoUpload
                    title="Interior Overview"
                    description="General interior condition photos"
                    multiple={true}
                    maxSize={10}
                    initialPhotos={formData.photos?.interiorPics || []}
                    onPhotosChange={(urls) => handlePhotoChange('interiorPics', urls)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notes and Signature */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" size={20} />
                Notes and Signature
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Textarea
                label="Notes"
                value={formData.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                disabled={!isEditing}
                rows={4}
                placeholder="Add any additional notes about the vehicle condition, special instructions, or observations..."
              />
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Customer Signature</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center text-gray-500">
                    {formData.signature ? (
                      <div className="flex items-center justify-center space-x-2">
                        <FileText className="h-5 w-5" />
                        <span className="text-sm">Signature captured</span>
                      </div>
                    ) : (
                      <div>
                        <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm">No signature captured</p>
                        {isEditing && (
                          <Button variant="outline" size="sm" className="mt-2">
                            Capture Signature
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Record Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Record Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer</span>
                <Link to={`/clients/${checkInOut.customerId}`} className="text-sm font-medium text-primary-600 hover:underline">
                  {customerName}
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vehicle</span>
                <Link to={`/vehicles/${checkInOut.vehicleId}`} className="text-sm font-medium text-primary-600 hover:underline">
                  {vehicleInfo}
                </Link>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium">{formatDateDisplay(checkInOut.date)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="text-sm font-medium">{checkInOut.location}</span>
              </div>
            </CardContent>
          </Card>

          {/* Service Items */}
          {checkInOut.serviceItems && checkInOut.serviceItems.length > 0 && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle>Service Items</CardTitle>
                {isEditing && (
                  <Button variant="outline" size="sm" leftIcon={<Plus size={14} />}>
                    Add Item
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {checkInOut.serviceItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm ${item.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                            {item.description}
                          </span>
                          {item.completed && (
                            <CheckSquare size={14} className="text-green-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">${item.cost.toFixed(2)}</span>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="sm">
                          <Trash2 size={14} />
                        </Button>
                      )}
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-gray-900">
                        ${checkInOut.serviceItems.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" leftIcon={<User size={16} />}>
                  Contact Customer
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Car size={16} />}>
                  View Vehicle Details
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Calendar size={16} />}>
                  Schedule Follow-up
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Download size={16} />}>
                  Download Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}