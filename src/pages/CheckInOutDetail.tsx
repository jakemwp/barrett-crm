import React, { useState, useEffect, useRef } from 'react';
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
  Download,
  Smartphone,
  FolderOpen
} from 'lucide-react';
import { getCheckInOutById, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckStatus, CheckType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function CheckInOutDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [checkInOut, setCheckInOut] = useState<CheckInOut | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<CheckInOut | null>(null);
  const [loading, setLoading] = useState(true);

  // File input refs for different photo sections
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

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

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const handleFileUpload = (photoType: string, files: FileList | null, multiple = true) => {
    if (!files || files.length === 0) return;

    // In a real app, you would upload these files to a server
    // For now, we'll create local URLs for preview
    const fileUrls: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file);
        fileUrls.push(url);
      }
    }

    if (fileUrls.length > 0) {
      const newValue = multiple ? fileUrls : fileUrls[0];
      handleNestedInputChange('photos', photoType, newValue);
    }
  };

  const handleVideoUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.type.startsWith('video/')) {
      const url = URL.createObjectURL(file);
      handleNestedInputChange('photos', 'walkAroundVideo', url);
    }
  };

  const triggerFileInput = (photoType: string) => {
    const input = fileInputRefs.current[photoType];
    if (input) {
      input.click();
    }
  };

  const removePhoto = (photoType: string, index?: number) => {
    if (formData?.photos) {
      const currentPhotos = formData.photos[photoType as keyof typeof formData.photos];
      
      if (Array.isArray(currentPhotos) && typeof index === 'number') {
        const newPhotos = currentPhotos.filter((_, i) => i !== index);
        handleNestedInputChange('photos', photoType, newPhotos.length > 0 ? newPhotos : undefined);
      } else {
        handleNestedInputChange('photos', photoType, undefined);
      }
    }
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
    photoType,
    photos, 
    multiple = true 
  }: { 
    title: string; 
    photoType: string;
    photos?: string | string[]; 
    multiple?: boolean;
  }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">{title}</h4>
      
      {/* Hidden file input */}
      <input
        ref={(el) => fileInputRefs.current[photoType] = el}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFileUpload(photoType, e.target.files, multiple)}
        className="hidden"
        capture="environment" // Prefer rear camera on mobile devices
      />
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        {isEditing ? (
          <div className="text-center space-y-4">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Add {multiple ? 'Photos' : 'Photo'}</h5>
              <p className="text-xs text-gray-500 mb-4">
                {multiple ? 'Select multiple photos' : 'Select a photo'} for this section
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => triggerFileInput(photoType)}
              >
                <Smartphone className="mr-2 h-4 w-4" />
                Take Photo
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => triggerFileInput(photoType)}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Choose from Storage
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: JPG, PNG, HEIC
            </p>
          </div>
        ) : (
          <div className="text-center">
            {photos ? (
              <div className="flex flex-wrap gap-2 justify-center">
                {Array.isArray(photos) ? (
                  photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="w-20 h-20 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                        <img 
                          src={photo} 
                          alt={`${title} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to camera icon if image fails to load
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <Camera className="h-6 w-6 text-gray-400 hidden" />
                      </div>
                      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                          onClick={() => removePhoto(photoType, index)}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                      {isEditing && (
                        <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-1 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200"
                            onClick={() => removePhoto(photoType, index)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="relative group">
                    <div className="w-20 h-20 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                      <img 
                        src={photos} 
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <Camera className="h-6 w-6 text-gray-400 hidden" />
                    </div>
                    <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                    {isEditing && (
                      <div className="absolute -bottom-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="p-1 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200"
                          onClick={() => removePhoto(photoType)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">
                <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm">No photos uploaded</p>
                {isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => triggerFileInput(photoType)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add {multiple ? 'Photos' : 'Photo'}
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  const VideoUploadSection = () => (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Walk Around Video</h4>
      
      {/* Hidden video input */}
      <input
        ref={(el) => fileInputRefs.current['walkAroundVideo'] = el}
        type="file"
        accept="video/*"
        onChange={(e) => handleVideoUpload(e.target.files)}
        className="hidden"
        capture="environment"
      />
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
        {isEditing ? (
          <div className="text-center space-y-4">
            <Video className="mx-auto h-12 w-12 text-gray-400" />
            <div>
              <h5 className="text-sm font-medium text-gray-700 mb-2">Add Walk Around Video</h5>
              <p className="text-xs text-gray-500 mb-4">
                Record or select a video showing the vehicle's exterior condition
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => triggerFileInput('walkAroundVideo')}
              >
                <Video className="mr-2 h-4 w-4" />
                Record Video
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center"
                onClick={() => triggerFileInput('walkAroundVideo')}
              >
                <FolderOpen className="mr-2 h-4 w-4" />
                Choose from Storage
              </Button>
            </div>
            
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: MP4, MOV, AVI (max 100MB)
            </p>
          </div>
        ) : (
          <div className="text-center">
            {formData.photos?.walkAroundVideo ? (
              <div className="relative group">
                <div className="w-32 h-20 bg-gray-200 rounded border flex items-center justify-center overflow-hidden">
                  <video 
                    src={formData.photos.walkAroundVideo}
                    className="w-full h-full object-cover"
                    controls={false}
                    muted
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                {isEditing && (
                  <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 bg-red-100 text-red-600 rounded-full shadow-md hover:bg-red-200"
                      onClick={() => handleNestedInputChange('photos', 'walkAroundVideo', undefined)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">
                <Video className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm">No video uploaded</p>
                {isEditing && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => triggerFileInput('walkAroundVideo')}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Video
                  </Button>
                )}
              </div>
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
                <PhotoUploadSection
                  title="Driver Side Photo"
                  photoType="driverPic"
                  photos={formData.photos?.driverPic}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Passenger Side Photo"
                  photoType="passengerPic"
                  photos={formData.photos?.passengerPic}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Front Photo"
                  photoType="frontPic"
                  photos={formData.photos?.frontPic}
                  multiple={false}
                />
                <PhotoUploadSection
                  title="Rear Photo"
                  photoType="rearPic"
                  photos={formData.photos?.rearPic}
                  multiple={false}
                />
              </div>
              
              {/* Walk Around Video */}
              <VideoUploadSection />
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
                    photoType="engineBayPics"
                    photos={formData.photos?.engineBayPics}
                  />
                  <PhotoUploadSection
                    title="Hood Photos"
                    photoType="hoodPics"
                    photos={formData.photos?.hoodPics}
                  />
                </div>
              </div>

              {/* Interior */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interior</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Dashboard Photos (Include Odometer & Fuel)"
                    photoType="dashboardPics"
                    photos={formData.photos?.dashboardPics}
                  />
                  <PhotoUploadSection
                    title="Interior Overview"
                    photoType="interiorPics"
                    photos={formData.photos?.entertainmentCenterPics}
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