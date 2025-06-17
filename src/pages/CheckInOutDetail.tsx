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
  MapPin, 
  Camera, 
  Video, 
  FileText, 
  Clock, 
  CheckSquare,
  Upload,
  Trash2,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { getCheckInOutById, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckStatus, CheckType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatDateTime, formatDate } from '../lib/utils';

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

  const PhotoUploadSection = ({ 
    title, 
    photos, 
    onPhotosChange, 
    multiple = true 
  }: { 
    title: string; 
    photos?: string | string[]; 
    onPhotosChange: (photos: string | string[]) => void;
    multiple?: boolean;
  }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
        {isEditing ? (
          <div className="text-center">
            <Camera className="mx-auto h-8 w-8 text-gray-400" />
            <div className="mt-2">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Upload {multiple ? 'Photos' : 'Photo'}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {multiple ? 'Select multiple files' : 'Select a file'}
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            {photos ? (
              <div className="flex flex-wrap gap-2">
                {Array.isArray(photos) ? (
                  photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img 
                        src={photo} 
                        alt={`${title} ${index + 1}`}
                        className="w-20 h-20 object-cover rounded border"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-0 right-0 p-1 bg-white rounded-full shadow"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="relative">
                    <img 
                      src={photos} 
                      alt={title}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 p-1 bg-white rounded-full shadow"
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm">No photos uploaded</p>
            )}
          </div>
        )}
      </div>
    </div>
  );

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
              <span className="text-sm text-gray-500">{formatDate(checkInOut.date)}</span>
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
                <PhotoUploadSection
                  title="Driver Side Photo"
                  photos={formData.photos?.driverPic}
                  onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverPic', photos)}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Passenger Side Photo"
                  photos={formData.photos?.passengerPic}
                  onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerPic', photos)}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Front Photo"
                  photos={formData.photos?.frontPic}
                  onPhotosChange={(photos) => handleNestedInputChange('photos', 'frontPic', photos)}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Rear Photo"
                  photos={formData.photos?.rearPic}
                  onPhotosChange={(photos) => handleNestedInputChange('photos', 'rearPic', photos)}
                  multiple={false}
                />
              </div>
              
              {/* Walk Around Video */}
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Walk Around Video</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  {isEditing ? (
                    <div className="text-center">
                      <Video className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Video
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">MP4, MOV, or AVI format</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      {formData.photos?.walkAroundVideo ? (
                        <div className="flex items-center justify-center space-x-2">
                          <Video className="h-5 w-5" />
                          <span className="text-sm">Walk around video available</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm">No video uploaded</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
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
            <CardContent className="space-y-6">
              {/* Engine Bay */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engine Bay</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Engine Bay Photos"
                    photos={formData.photos?.engineBayPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'engineBayPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Hood Photos"
                    photos={formData.photos?.hoodPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'hoodPics', photos)}
                  />
                </div>
              </div>

              {/* Front Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Front Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Grille Photos"
                    photos={formData.photos?.grillePics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'grillePics', photos)}
                  />
                  <PhotoUploadSection
                    title="Headlight Photos"
                    photos={formData.photos?.headlightPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'headlightPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Front Bumper Photos"
                    photos={formData.photos?.frontBumperPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'frontBumperPics', photos)}
                  />
                </div>
              </div>

              {/* Passenger Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Front Fender Photos"
                    photos={formData.photos?.passengerSideFrontFenderPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideFrontFenderPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Front Wheel Photos"
                    photos={formData.photos?.passengerSideFrontWheelPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideFrontWheelPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Pillar Photos"
                    photos={formData.photos?.passengerSidePillarPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSidePillarPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Door Photos"
                    photos={formData.photos?.passengerSideDoorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideDoorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Door Handle Photos"
                    photos={formData.photos?.passengerSideDoorHandlePics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideDoorHandlePics', photos)}
                  />
                  <PhotoUploadSection
                    title="Rear Fender Photos"
                    photos={formData.photos?.passengerSideRearFenderPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideRearFenderPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Rear Wheel Photos"
                    photos={formData.photos?.passengerSideRearWheelPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideRearWheelPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Mirror Photos"
                    photos={formData.photos?.passengerSideMirrorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideMirrorPics', photos)}
                  />
                </div>
              </div>

              {/* Rear Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rear Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Trunk Exterior Photos"
                    photos={formData.photos?.trunkExteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'trunkExteriorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Trunk Interior Photos"
                    photos={formData.photos?.trunkInteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'trunkInteriorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Rear Light Photos"
                    photos={formData.photos?.rearLightPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'rearLightPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Bumper Photos"
                    photos={formData.photos?.bumperPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'bumperPics', photos)}
                  />
                </div>
              </div>

              {/* Driver Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Rear Fender Photos"
                    photos={formData.photos?.driverSideRearFenderPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideRearFenderPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Rear Wheel Photos"
                    photos={formData.photos?.driverSideRearWheelPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideRearWheelPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Pillar Photos"
                    photos={formData.photos?.driverSidePillarPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSidePillarPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Door Photos"
                    photos={formData.photos?.driverSideDoorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideDoorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Door Handle Photos"
                    photos={formData.photos?.driverSideDoorHandlePics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideDoorHandlePics', photos)}
                  />
                  <PhotoUploadSection
                    title="Front Fender Photos"
                    photos={formData.photos?.driverSideFrontFenderPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideFrontFenderPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Front Wheel Photos"
                    photos={formData.photos?.driverSideFrontWheelPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideFrontWheelPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Mirror Photos"
                    photos={formData.photos?.driverSideMirrorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideMirrorPics', photos)}
                  />
                </div>
              </div>

              {/* Roof */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roof</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Roof Photos"
                    photos={formData.photos?.roofPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'roofPics', photos)}
                  />
                </div>
              </div>

              {/* Interior */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interior</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Dashboard Photos (Include Odometer & Fuel)"
                    photos={formData.photos?.dashboardPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'dashboardPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Entertainment Center Photos"
                    photos={formData.photos?.entertainmentCenterPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'entertainmentCenterPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Center Console Interior Photos"
                    photos={formData.photos?.centerConsoleInteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'centerConsoleInteriorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Center Console Exterior Photos"
                    photos={formData.photos?.centerConsoleExteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'centerConsoleExteriorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Driver Side Door Trim Photos"
                    photos={formData.photos?.driverSideDoorTrimPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideDoorTrimPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Driver Side Seat Photos"
                    photos={formData.photos?.driverSideSeatPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideSeatPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Driver Side Floor Mat Photos"
                    photos={formData.photos?.driverSideFloorMatPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'driverSideFloorMatPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Passenger Side Door Trim Photos"
                    photos={formData.photos?.passengerSideDoorTrimPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideDoorTrimPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Passenger Side Seat Photos"
                    photos={formData.photos?.passengerSideSeatPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideSeatPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Passenger Side Floor Mat Photos"
                    photos={formData.photos?.passengerSideFloorMatPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'passengerSideFloorMatPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Glove Box Interior Photos"
                    photos={formData.photos?.gloveBoxInteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'gloveBoxInteriorPics', photos)}
                  />
                  <PhotoUploadSection
                    title="Glove Box Exterior Photos"
                    photos={formData.photos?.gloveBoxExteriorPics}
                    onPhotosChange={(photos) => handleNestedInputChange('photos', 'gloveBoxExteriorPics', photos)}
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
                  {isEditing ? (
                    <div className="text-center">
                      <FileText className="mx-auto h-8 w-8 text-gray-400" />
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Upload className="mr-2 h-4 w-4" />
                          Capture Signature
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Digital signature pad</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      {formData.signature ? (
                        <div className="flex items-center justify-center space-x-2">
                          <FileText className="h-5 w-5" />
                          <span className="text-sm">Signature captured</span>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <p className="text-sm">No signature captured</p>
                      )}
                    </div>
                  )}
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
                <Link to={`/customers/${checkInOut.customerId}`} className="text-sm font-medium text-primary-600 hover:underline">
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
                <span className="text-sm text-gray-600">Check-in Date</span>
                <span className="text-sm font-medium">{formatDateTime(checkInOut.checkInDate || checkInOut.date)}</span>
              </div>
              
              {checkInOut.checkOutDate && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Check-out Date</span>
                  <span className="text-sm font-medium">{formatDateTime(checkInOut.checkOutDate)}</span>
                </div>
              )}
              
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