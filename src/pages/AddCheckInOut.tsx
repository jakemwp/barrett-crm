import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
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
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2
} from 'lucide-react';
import { addCheckInOut, customers, vehicles, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckStatus, CheckType, ServiceItem } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { PhotoUpload } from '../components/ui/PhotoUpload';
import { VideoUpload } from '../components/ui/VideoUpload';
import { generateId } from '../lib/utils';

export function AddCheckInOut() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    customerId: searchParams.get('customerId') || '',
    vehicleId: searchParams.get('vehicleId') || '',
    date: new Date().toISOString().split('T')[0],
    type: CheckType.CHECK_IN as CheckType,
    location: '',
    contact: '',
    status: CheckStatus.CHECKED_IN as CheckStatus,
    checkInDate: new Date().toISOString(),
    checkOutDate: '',
    fuelLevel: 100,
    mileage: 0,
    tirePressure: {
      passengerFront: 32,
      passengerRear: 30,
      driverFront: 32,
      driverRear: 30,
    },
    carCover: false,
    killSwitch: false,
    startupDirections: '',
    deliveryAddress: '',
    notes: '',
    signature: '',
  });

  const [photos, setPhotos] = useState<Record<string, string[]>>({});
  const [walkAroundVideo, setWalkAroundVideo] = useState<string | null>(null);
  const [serviceItems, setServiceItems] = useState<Omit<ServiceItem, 'id' | 'checkInOutId' | 'createdAt' | 'updatedAt'>[]>([]);
  const [newServiceItem, setNewServiceItem] = useState({
    description: '',
    cost: 0,
    completed: false,
  });

  // Auto-populate customer and vehicle info if IDs are provided
  useEffect(() => {
    const customerIdFromUrl = searchParams.get('customerId');
    if (customerIdFromUrl && !formData.customerId) {
      handleInputChange('customerId', customerIdFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (formData.customerId) {
      const customer = getCustomerById(formData.customerId);
      if (customer) {
        setFormData(prev => ({
          ...prev,
          location: customer.storageLocation,
          contact: `${customer.firstName} ${customer.lastName}`,
        }));
      }
    }
  }, [formData.customerId]);

  useEffect(() => {
    if (formData.vehicleId) {
      const vehicle = getVehicleById(formData.vehicleId);
      if (vehicle) {
        setFormData(prev => ({
          ...prev,
          mileage: vehicle.odometer || 0,
          fuelLevel: vehicle.fuelLevel,
          tirePressure: {
            passengerFront: vehicle.tirePressurePreferred.front,
            passengerRear: vehicle.tirePressurePreferred.rear,
            driverFront: vehicle.tirePressurePreferred.front,
            driverRear: vehicle.tirePressurePreferred.rear,
          },
        }));
      }
    }
  }, [formData.vehicleId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
    
    // Reset vehicle selection when customer changes
    if (field === 'customerId' && value !== prev.customerId) {
      setFormData(prevData => ({
        ...prevData,
        customerId: value,
        vehicleId: '', // Reset vehicle selection
      }));
    }
  };

  const handleNestedInputChange = (parentField: string, childField: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as any),
        [childField]: value,
      },
    }));
  };

  const handlePhotoChange = (photoType: string, urls: string[]) => {
    setPhotos(prev => ({
      ...prev,
      [photoType]: urls
    }));
  };

  const handleVideoChange = (url: string | null) => {
    setWalkAroundVideo(url);
  };

  const addServiceItem = () => {
    if (newServiceItem.description && newServiceItem.cost > 0) {
      setServiceItems(prev => [...prev, { ...newServiceItem }]);
      setNewServiceItem({
        description: '',
        cost: 0,
        completed: false,
      });
    }
  };

  const removeServiceItem = (index: number) => {
    setServiceItems(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }
    
    if (!formData.vehicleId) {
      newErrors.vehicleId = 'Vehicle is required';
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
    }
    
    if (formData.fuelLevel < 0 || formData.fuelLevel > 100) {
      newErrors.fuelLevel = 'Fuel level must be between 0 and 100';
    }
    
    if (formData.mileage < 0) {
      newErrors.mileage = 'Mileage cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setSaveStatus('error');
      return;
    }
    
    setSaveStatus('saving');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Prepare photos object
      const photosData = {
        ...photos,
        walkAroundVideo: walkAroundVideo || undefined,
      };

      // Prepare service items with IDs
      const serviceItemsData = serviceItems.map(item => ({
        ...item,
        id: generateId(),
        checkInOutId: '', // Will be set by the backend
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      
      const newCheckInOut = addCheckInOut({
        ...formData,
        photos: photosData,
        serviceItems: serviceItemsData,
      });
      
      setSaveStatus('success');
      
      // Navigate to the new record's detail page after a short delay
      setTimeout(() => {
        navigate(`/check-in-out/${newCheckInOut.id}`);
      }, 1500);
      
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    navigate('/check-in-out');
  };

  const clientOptions = customers.map(customer => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName} (${customer.email})`,
  }));

  const vehicleOptions = vehicles
    .filter(vehicle => !formData.customerId || vehicle.customerId === formData.customerId)
    .map(vehicle => ({
      value: vehicle.id,
      label: `${vehicle.year || ''} ${vehicle.make || ''} ${vehicle.model || ''} (${vehicle.licensePlate || 'No Plate'})`,
    }));

  const selectedCustomer = formData.customerId ? getCustomerById(formData.customerId) : null;
  const selectedVehicle = formData.vehicleId ? getVehicleById(formData.vehicleId) : null;

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
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Car className="mr-3" size={28} />
              New Check In/Out
            </h1>
            <p className="text-gray-600 mt-1">
              Create a new vehicle check-in or check-out record
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-600 mr-4">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm">Record created successfully!</span>
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="flex items-center text-red-600 mr-4">
              <AlertCircle size={16} className="mr-1" />
              <span className="text-sm">Please fix the errors below</span>
            </div>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleCancel} 
            leftIcon={<X size={16} />}
            disabled={saveStatus === 'saving'}
          >
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSave} 
            leftIcon={<Save size={16} />}
            isLoading={saveStatus === 'saving'}
          >
            {saveStatus === 'saving' ? 'Creating Record...' : 'Create Record'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer and Vehicle Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Client & Vehicle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Client *"
                  value={formData.customerId}
                  onChange={(e) => handleInputChange('customerId', e.target.value)}
                  error={errors.customerId}
                  options={[
                    { value: '', label: 'Select a client...' },
                    ...clientOptions,
                  ]}
                />
                <Select
                  label="Vehicle *"
                  value={formData.vehicleId}
                  onChange={(e) => handleInputChange('vehicleId', e.target.value)}
                  error={errors.vehicleId}
                  options={[
                    { value: '', label: 'Select a vehicle...' },
                    ...vehicleOptions,
                  ]}
                  disabled={!formData.customerId}
                />
              </div>
            </CardContent>
          </Card>

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
                  label="Date *"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                />
                <Select
                  label="Type *"
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value as CheckType)}
                  options={[
                    { value: CheckType.CHECK_IN, label: 'Check In' },
                    { value: CheckType.CHECK_OUT, label: 'Check Out' },
                  ]}
                />
                <Input
                  label="Location *"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  error={errors.location}
                  placeholder="Storage location"
                />
                <Input
                  label="Contact *"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  error={errors.contact}
                  placeholder="Contact person"
                />
                <Select
                  label="Status *"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value as CheckStatus)}
                  options={[
                    { value: CheckStatus.CHECKED_IN, label: 'Checked In' },
                    { value: CheckStatus.IN_SERVICE, label: 'In Service' },
                    { value: CheckStatus.CHECKED_OUT, label: 'Checked Out' },
                  ]}
                />
                <Input
                  label="Delivery Address"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  placeholder="Optional delivery address"
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
                  label="Fuel Level (%) *"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.fuelLevel}
                  onChange={(e) => handleInputChange('fuelLevel', parseFloat(e.target.value) || 0)}
                  error={errors.fuelLevel}
                />
                <Input
                  label="Mileage *"
                  type="number"
                  step="0.1"
                  min="0"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', parseFloat(e.target.value) || 0)}
                  error={errors.mileage}
                />
              </div>

              {/* Tire Pressure */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tire Pressure (PSI)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Input
                    label="Passenger Front"
                    type="number"
                    min="0"
                    value={formData.tirePressure.passengerFront}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'passengerFront', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    label="Passenger Rear"
                    type="number"
                    min="0"
                    value={formData.tirePressure.passengerRear}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'passengerRear', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    label="Driver Front"
                    type="number"
                    min="0"
                    value={formData.tirePressure.driverFront}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'driverFront', parseInt(e.target.value) || 0)}
                  />
                  <Input
                    label="Driver Rear"
                    type="number"
                    min="0"
                    value={formData.tirePressure.driverRear}
                    onChange={(e) => handleNestedInputChange('tirePressure', 'driverRear', parseInt(e.target.value) || 0)}
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
                        checked={formData.carCover}
                        onChange={(e) => handleInputChange('carCover', e.target.checked)}
                        className="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Car Cover</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.killSwitch}
                        onChange={(e) => handleInputChange('killSwitch', e.target.checked)}
                        className="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Kill Switch</span>
                    </label>
                  </div>
                  
                  <Textarea
                    label="Startup Directions"
                    value={formData.startupDirections}
                    onChange={(e) => handleInputChange('startupDirections', e.target.value)}
                    rows={3}
                    placeholder="Special instructions for starting the vehicle..."
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
                  onPhotosChange={(urls) => handlePhotoChange('driverPic', urls)}
                />
                
                <PhotoUpload
                  title="Passenger Side Photo"
                  description="Photo of the passenger side of the vehicle"
                  multiple={false}
                  maxSize={10}
                  onPhotosChange={(urls) => handlePhotoChange('passengerPic', urls)}
                />
                
                <PhotoUpload
                  title="Front Photo"
                  description="Photo of the front of the vehicle"
                  multiple={false}
                  maxSize={10}
                  onPhotosChange={(urls) => handlePhotoChange('frontPic', urls)}
                />
                
                <PhotoUpload
                  title="Rear Photo"
                  description="Photo of the rear of the vehicle"
                  multiple={false}
                  maxSize={10}
                  onPhotosChange={(urls) => handlePhotoChange('rearPic', urls)}
                />
              </div>
              
              {/* Walk Around Video */}
              <VideoUpload
                title="Walk Around Video"
                description="Record or select a video showing the vehicle's exterior condition"
                onVideoChange={handleVideoChange}
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
                    onPhotosChange={(urls) => handlePhotoChange('engineBayPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Hood Photos"
                    description="Photos of the hood exterior and interior"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('hoodPics', urls)}
                  />
                </div>
              </div>

              {/* Front Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Front Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Grille Photos *"
                    description="Photos of the front grille"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('grillePics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Headlight Photos *"
                    description="Photos of both headlights"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('headlightPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Front Bumper Photos *"
                    description="Photos of the front bumper"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('frontBumperPics', urls)}
                  />
                </div>
              </div>

              {/* Passenger Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Passenger Side Front Fender Photos *"
                    description="Photos of the passenger side front fender"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideFrontFenderPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Front Wheel Photos *"
                    description="Photos of the passenger side front wheel"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideFrontWheelPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Pillar Photos *"
                    description="Photos of the passenger side pillars"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSidePillarPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Door Photos *"
                    description="Photos of the passenger side doors"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideDoorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Door Handle Photos *"
                    description="Photos of the passenger side door handles"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideDoorHandlePics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Rear Fender Photos *"
                    description="Photos of the passenger side rear fender"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideRearFenderPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Rear Wheel Photos *"
                    description="Photos of the passenger side rear wheel"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideRearWheelPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Mirror Photos *"
                    description="Photos of the passenger side mirror"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideMirrorPics', urls)}
                  />
                </div>
              </div>

              {/* Rear Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rear Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Trunk Photos (Exterior) *"
                    description="Photos of the trunk exterior"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('trunkExteriorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Trunk Photos (Interior) *"
                    description="Photos of the trunk interior"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('trunkInteriorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Rear Light Photos *"
                    description="Photos of the rear lights"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('rearLightPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Rear Bumper Photos *"
                    description="Photos of the rear bumper"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('bumperPics', urls)}
                  />
                </div>
              </div>

              {/* Driver Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Driver Side Rear Fender Photos *"
                    description="Photos of the driver side rear fender"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideRearFenderPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Rear Wheel Photos *"
                    description="Photos of the driver side rear wheel"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideRearWheelPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Pillar Photos *"
                    description="Photos of the driver side pillars"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSidePillarPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Door Photos *"
                    description="Photos of the driver side doors"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideDoorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Door Handle Photos *"
                    description="Photos of the driver side door handles"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideDoorHandlePics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Front Fender Photos *"
                    description="Photos of the driver side front fender"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideFrontFenderPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Front Wheel Photos *"
                    description="Photos of the driver side front wheel"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideFrontWheelPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Mirror Photos *"
                    description="Photos of the driver side mirror"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideMirrorPics', urls)}
                  />
                </div>
              </div>

              {/* Top and Roof */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top and Roof</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Roof Photos *"
                    description="Photos of the vehicle roof"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('roofPics', urls)}
                  />
                </div>
              </div>
              {/* Interior */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Interior</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUpload
                    title="Driver Side Door Trim Photos *"
                    description="Photos of the driver side door trim"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideDoorTrimPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Seat Photos *"
                    description="Photos of the driver side seat"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideSeatPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Driver Side Floor Mat Photos *"
                    description="Photos of the driver side floor mats"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('driverSideFloorMatPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Dashboard Photos (Odometer & Fuel Level Included) *"
                    description="Include clear shots of odometer and fuel level readings"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('dashboardPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Entertainment Center Photos *"
                    description="Photos of the entertainment/infotainment system"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('entertainmentCenterPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Center Console Photos (Interior & Exterior) *"
                    description="Photos of the center console interior and exterior"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('centerConsoleInteriorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Door Trim Photos *"
                    description="Photos of the passenger side door trim"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideDoorTrimPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Seat Photos *"
                    description="Photos of the passenger side seat"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideSeatPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Passenger Side Floor Mat Photos *"
                    description="Photos of the passenger side floor mats"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('passengerSideFloorMatPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Glove Box Photos (Interior & Exterior) *"
                    description="Photos of the glove box interior and exterior"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('gloveBoxInteriorPics', urls)}
                  />
                  
                  <PhotoUpload
                    title="Interior Overview"
                    description="General interior condition photos"
                    multiple={true}
                    maxSize={10}
                    onPhotosChange={(urls) => handlePhotoChange('interiorPics', urls)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Items */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center">
                <CheckSquare className="mr-2" size={20} />
                Service Items ({serviceItems.length})
              </CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={addServiceItem}
                leftIcon={<Plus size={14} />}
                disabled={!newServiceItem.description || newServiceItem.cost <= 0}
              >
                Add Item
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Service Item */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Service Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Description *"
                    value={newServiceItem.description}
                    onChange={(e) => setNewServiceItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Service description"
                  />
                  <Input
                    label="Cost *"
                    type="number"
                    step="0.01"
                    min="0"
                    value={newServiceItem.cost}
                    onChange={(e) => setNewServiceItem(prev => ({ ...prev, cost: parseFloat(e.target.value) || 0 }))}
                    placeholder="0.00"
                  />
                  <div className="flex items-end">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newServiceItem.completed}
                        onChange={(e) => setNewServiceItem(prev => ({ ...prev, completed: e.target.checked }))}
                        className="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700">Completed</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Service Items List */}
              {serviceItems.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Service Items</h4>
                  {serviceItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeServiceItem(index)}
                        leftIcon={<Trash2 size={14} />}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-gray-900">
                        ${serviceItems.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
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
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={4}
                placeholder="Add any additional notes about the vehicle condition, special instructions, or observations..."
              />
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-700">Customer Signature</h4>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <div className="text-center text-gray-500">
                    <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm">Signature capture will be available in the detail view</p>
                    <Button variant="outline" size="sm" className="mt-2" disabled>
                      Capture Signature
                    </Button>
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
                <span className="text-sm font-medium">
                  {selectedCustomer ? `${selectedCustomer.firstName} ${selectedCustomer.lastName}` : 'Not selected'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Vehicle</span>
                <span className="text-sm font-medium">
                  {selectedVehicle ? `${selectedVehicle.year} ${selectedVehicle.make} ${selectedVehicle.model}` : 'Not selected'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Type</span>
                <Badge variant={formData.type === CheckType.CHECK_IN ? 'warning' : 'success'} className="text-xs">
                  {formData.type === CheckType.CHECK_IN ? 'Check In' : 'Check Out'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge 
                  variant={
                    formData.status === CheckStatus.CHECKED_IN ? 'warning' :
                    formData.status === CheckStatus.IN_SERVICE ? 'default' : 'success'
                  } 
                  className="text-xs"
                >
                  {formData.status === CheckStatus.CHECKED_IN ? 'Checked In' :
                   formData.status === CheckStatus.IN_SERVICE ? 'In Service' : 'Checked Out'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium">{formData.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Condition Summary */}
          {selectedVehicle && (
            <Card>
              <CardHeader>
                <CardTitle>Vehicle Condition</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fuel Level</span>
                  <span className="text-sm font-medium">{formData.fuelLevel}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Mileage</span>
                  <span className="text-sm font-medium">{formData.mileage.toLocaleString()} mi</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Car Cover</span>
                  <Badge variant={formData.carCover ? 'success' : 'outline'} className="text-xs">
                    {formData.carCover ? 'Yes' : 'No'}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Kill Switch</span>
                  <Badge variant={formData.killSwitch ? 'warning' : 'outline'} className="text-xs">
                    {formData.killSwitch ? 'Yes' : 'No'}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Service Items Summary */}
          {serviceItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Service Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Items</span>
                  <span className="text-sm font-medium">{serviceItems.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="text-sm font-medium text-green-600">
                    {serviceItems.filter(item => item.completed).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Cost</span>
                  <span className="text-sm font-bold text-gray-900">
                    ${serviceItems.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}