import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  X, 
  ClipboardCheck, 
  Car, 
  User, 
  MapPin, 
  Calendar, 
  Clock, 
  Fuel, 
  Camera, 
  Video, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Plus,
  Trash2,
  Eye
} from 'lucide-react';
import { addCheckInOut, customers, vehicles, getCustomerById, getVehicleById } from '../data/mock-data';
import { CheckInOut, CheckType, CheckStatus, ServiceItem, VehicleInspectionPhotos } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatDateTime, generateId } from '../lib/utils';

// Placeholder URL for demo purposes

export function AddCheckInOut() {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string>('');
  
  const [formData, setFormData] = useState({
    vehicleId: '',
    customerId: '',
    date: new Date().toISOString().split('T')[0],
    type: CheckType.CHECK_IN as CheckType,
    location: '',
    contact: '',
    status: CheckStatus.CHECKED_IN as CheckStatus,
    fuelLevel: 0,
    mileage: 0,
    tirePressure: {
      passengerFront: 0,
      passengerRear: 0,
      driverFront: 0,
      driverRear: 0,
    },
    carCover: false,
    killSwitch: false,
    startupDirections: '',
    deliveryAddress: '',
    notes: '',
  });

  const [photos, setPhotos] = useState<VehicleInspectionPhotos>({});
  const [serviceItems, setServiceItems] = useState<Omit<ServiceItem, 'id' | 'checkInOutId' | 'createdAt' | 'updatedAt'>[]>([]);
  const [newServiceItem, setNewServiceItem] = useState({
    description: '',
    cost: 0,
    completed: false,
  });

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

  const handleVehicleChange = (vehicleId: string) => {
    const vehicle = getVehicleById(vehicleId);
    if (vehicle) {
      setFormData(prev => ({
        ...prev,
        vehicleId,
        customerId: vehicle.customerId,
        location: vehicle.storageLocation,
        mileage: vehicle.odometer,
        fuelLevel: vehicle.fuelLevel,
        tirePressure: {
          passengerFront: vehicle.tirePressurePreferred.front,
          passengerRear: vehicle.tirePressurePreferred.rear,
          driverFront: vehicle.tirePressurePreferred.front,
          driverRear: vehicle.tirePressurePreferred.rear,
        },
      }));
    }
  };

  const handleCustomerChange = (customerId: string) => {
    const customer = getCustomerById(customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        contact: `${customer.firstName} ${customer.lastName}`,
        location: customer.storageLocation,
      }));
    }
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

  const toggleServiceItemCompleted = (index: number) => {
    setServiceItems(prev => prev.map((item, i) => 
      i === index ? { ...item, completed: !item.completed } : item
    ));
  };

  // Photo upload handlers
  const handlePhotoUpload = (photoType: keyof VehicleInspectionPhotos, multiple: boolean = true) => {
    // In a real app, this would open a file picker and upload photos
    // For now, we'll simulate with placeholder URLs
    
    if (multiple) {
      setPhotos(prev => ({
        ...prev,
        [photoType]: [...(prev[photoType] as string[] || [])],
      }));
    } else {
      setPhotos(prev => ({
        ...prev,
        [photoType]: [...(prev[photoType] as string[] || [])],
      }));
    }
  };

  const removePhoto = (photoType: keyof VehicleInspectionPhotos, index?: number) => {
    if (index !== undefined) {
      // Remove specific photo from array
      setPhotos(prev => ({
        ...prev,
        [photoType]: (prev[photoType] as string[])?.filter((_, i) => i !== index),
      }));
    } else {
      // Remove single photo
      setPhotos(prev => ({
        ...prev,
        [photoType]: undefined,
      }));
    }
  };

  // Signature pad functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setSignature(canvas.toDataURL());
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.vehicleId) {
      newErrors.vehicleId = 'Vehicle is required';
    }
    
    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
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
      
      const now = new Date().toISOString();
      
      const newCheckInOut = addCheckInOut({
        ...formData,
        checkInDate: formData.type === CheckType.CHECK_IN ? now : undefined,
        checkOutDate: formData.type === CheckType.CHECK_OUT ? now : undefined,
        signature: signature || undefined,
        photos: Object.keys(photos).length > 0 ? photos : undefined,
      });
      
      // Add service items if any
      if (serviceItems.length > 0) {
        // In a real app, you would save these to the backend
        console.log('Service items to save:', serviceItems);
      }
      
      setSaveStatus('success');
      
      // Navigate to the new check-in/out detail page after a short delay
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

  const selectedVehicle = formData.vehicleId ? getVehicleById(formData.vehicleId) : null;
  const selectedCustomer = formData.customerId ? getCustomerById(formData.customerId) : null;
  const customerVehicles = formData.customerId ? vehicles.filter(v => v.customerId === formData.customerId) : [];

  const vehicleOptions = vehicles.map(vehicle => {
    const customer = getCustomerById(vehicle.customerId);
    const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown';
    return {
      value: vehicle.id,
      label: `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate}) - ${customerName}`,
    };
  });

  const customerOptions = customers.map(customer => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName} (${customer.email})`,
  }));

  // Photo upload component
  const PhotoUploadSection = ({ 
    title, 
    photoType, 
    multiple = true,
    description 
  }: { 
    title: string; 
    photoType: keyof VehicleInspectionPhotos;
    multiple?: boolean;
    description?: string;
  }) => {
    const currentPhotos = photos[photoType];
    const hasPhotos = multiple ? 
      (Array.isArray(currentPhotos) && currentPhotos.length > 0) : 
      !!currentPhotos;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-700">{title}</h4>
            {description && (
              <p className="text-xs text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePhotoUpload(photoType, multiple)}
            leftIcon={<Camera size={14} />}
          >
            Add {multiple ? 'Photos' : 'Photo'}
          </Button>
        </div>
        
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px]">
          {hasPhotos ? (
            <div className="flex flex-wrap gap-2">
              {multiple ? (
                (currentPhotos as string[])?.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={photo} 
                      alt={`${title} ${index + 1}`}
                      className="w-20 h-20 object-cover rounded border"
                    />
                    <button
                      onClick={() => removePhoto(photoType, index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="relative group">
                  <img 
                    src={currentPhotos as string} 
                    alt={title}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <button
                    onClick={() => removePhoto(photoType)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <Camera className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm">No {multiple ? 'photos' : 'photo'} uploaded</p>
              <p className="text-xs text-gray-400 mt-1">
                Click "Add {multiple ? 'Photos' : 'Photo'}" to upload
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Count total photos
  const totalPhotos = Object.values(photos).reduce((count, photoSet) => {
    if (Array.isArray(photoSet)) {
      return count + photoSet.length;
    } else if (photoSet) {
      return count + 1;
    }
    return count;
  }, 0);

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
              <ClipboardCheck className="mr-3" size={28} />
              Add Check In/Out Record
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
                  error={errors.date}
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
                  label="Contact *"
                  value={formData.contact}
                  onChange={(e) => handleInputChange('contact', e.target.value)}
                  error={errors.contact}
                  placeholder="Contact person name"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <Input
                  label="Location *"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  error={errors.location}
                  placeholder="Storage location"
                />
                <Input
                  label="Delivery Address (Optional)"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                  placeholder="Delivery address for check-out"
                />
              </div>
            </CardContent>
          </Card>

          {/* Vehicle & Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" size={20} />
                Vehicle & Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                <Select
                  label="Customer *"
                  value={formData.customerId}
                  onChange={(e) => handleCustomerChange(e.target.value)}
                  error={errors.customerId}
                  options={[
                    { value: '', label: 'Select a customer...' },
                    ...customerOptions,
                  ]}
                />
                
                {formData.customerId && (
                  <Select
                    label="Vehicle *"
                    value={formData.vehicleId}
                    onChange={(e) => handleVehicleChange(e.target.value)}
                    error={errors.vehicleId}
                    options={[
                      { value: '', label: 'Select a vehicle...' },
                      ...customerVehicles.map(vehicle => ({
                        value: vehicle.id,
                        label: `${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.licensePlate})`,
                      })),
                    ]}
                  />
                )}
                
                {!formData.customerId && (
                  <Select
                    label="Vehicle *"
                    value={formData.vehicleId}
                    onChange={(e) => handleVehicleChange(e.target.value)}
                    error={errors.vehicleId}
                    options={[
                      { value: '', label: 'Select a vehicle...' },
                      ...vehicleOptions,
                    ]}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          {/* Vehicle Condition */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Fuel className="mr-2" size={20} />
                Vehicle Condition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Fuel Level (%) *"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.fuelLevel}
                  onChange={(e) => handleInputChange('fuelLevel', parseInt(e.target.value) || 0)}
                  error={errors.fuelLevel}
                />
                <Input
                  label="Mileage *"
                  type="number"
                  min="0"
                  value={formData.mileage}
                  onChange={(e) => handleInputChange('mileage', parseInt(e.target.value) || 0)}
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

          {/* Basic Vehicle Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Camera className="mr-2" size={20} />
                  Basic Vehicle Photos ({totalPhotos > 0 && `${totalPhotos} uploaded`})
                </div>
                <Badge variant={totalPhotos > 0 ? 'success' : 'outline'} className="text-xs">
                  {totalPhotos > 0 ? `${totalPhotos} Photos` : 'No Photos'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <PhotoUploadSection
                  title="Driver Side Photo"
                  photoType="driverPic"
                  multiple={false}
                  description="Full side view of driver side"
                />
                <PhotoUploadSection
                  title="Passenger Side Photo"
                  photoType="passengerPic"
                  multiple={false}
                  description="Full side view of passenger side"
                />
                <PhotoUploadSection
                  title="Front Photo"
                  photoType="frontPic"
                  multiple={false}
                  description="Front view of vehicle"
                />
                <PhotoUploadSection
                  title="Rear Photo"
                  photoType="rearPic"
                  multiple={false}
                  description="Rear view of vehicle"
                />
              </div>
              
              {/* Walk Around Video */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700">Walk Around Video</h4>
                    <p className="text-xs text-gray-500 mt-1">Complete 360° walk around the vehicle</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePhotoUpload('walkAroundVideo', false)}
                    leftIcon={<Video size={14} />}
                  >
                    Record Video
                  </Button>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 min-h-[100px]">
                  {photos.walkAroundVideo ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Video className="h-5 w-5 text-secondary-600" />
                      <span className="text-sm text-gray-700">Walk around video recorded</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePhoto('walkAroundVideo')}
                        leftIcon={<Trash2 size={14} />}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <Video className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm">No video recorded</p>
                      <p className="text-xs text-gray-400 mt-1">Click "Record Video" to start</p>
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
            <CardContent className="space-y-8">
              {/* Engine Bay */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Engine Bay</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Engine Bay Photos"
                    photoType="engineBayPics"
                    description="Engine compartment overview"
                  />
                  <PhotoUploadSection
                    title="Hood Photos"
                    photoType="hoodPics"
                    description="Hood exterior and interior"
                  />
                </div>
              </div>

              {/* Front Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Front Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Grille Photos"
                    photoType="grillePics"
                    description="Front grille and emblem"
                  />
                  <PhotoUploadSection
                    title="Headlight Photos"
                    photoType="headlightPics"
                    description="Both headlights and turn signals"
                  />
                  <PhotoUploadSection
                    title="Front Bumper Photos"
                    photoType="frontBumperPics"
                    description="Front bumper and license plate"
                  />
                </div>
              </div>

              {/* Passenger Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Front Fender Photos"
                    photoType="passengerSideFrontFenderPics"
                    description="Passenger side front fender"
                  />
                  <PhotoUploadSection
                    title="Front Wheel Photos"
                    photoType="passengerSideFrontWheelPics"
                    description="Passenger side front wheel and tire"
                  />
                  <PhotoUploadSection
                    title="Pillar Photos"
                    photoType="passengerSidePillarPics"
                    description="A, B, and C pillars"
                  />
                  <PhotoUploadSection
                    title="Door Photos"
                    photoType="passengerSideDoorPics"
                    description="Passenger side doors"
                  />
                  <PhotoUploadSection
                    title="Door Handle Photos"
                    photoType="passengerSideDoorHandlePics"
                    description="Door handles and locks"
                  />
                  <PhotoUploadSection
                    title="Rear Fender Photos"
                    photoType="passengerSideRearFenderPics"
                    description="Passenger side rear fender"
                  />
                  <PhotoUploadSection
                    title="Rear Wheel Photos"
                    photoType="passengerSideRearWheelPics"
                    description="Passenger side rear wheel and tire"
                  />
                  <PhotoUploadSection
                    title="Mirror Photos"
                    photoType="passengerSideMirrorPics"
                    description="Passenger side mirror"
                  />
                </div>
              </div>

              {/* Rear Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rear Section</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Trunk Exterior Photos"
                    photoType="trunkExteriorPics"
                    description="Trunk lid and rear window"
                  />
                  <PhotoUploadSection
                    title="Trunk Interior Photos"
                    photoType="trunkInteriorPics"
                    description="Trunk compartment and spare tire"
                  />
                  <PhotoUploadSection
                    title="Rear Light Photos"
                    photoType="rearLightPics"
                    description="Taillights and brake lights"
                  />
                  <PhotoUploadSection
                    title="Bumper Photos"
                    photoType="bumperPics"
                    description="Rear bumper and exhaust"
                  />
                </div>
              </div>

              {/* Driver Side */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Side</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Rear Fender Photos"
                    photoType="driverSideRearFenderPics"
                    description="Driver side rear fender"
                  />
                  <PhotoUploadSection
                    title="Rear Wheel Photos"
                    photoType="driverSideRearWheelPics"
                    description="Driver side rear wheel and tire"
                  />
                  <PhotoUploadSection
                    title="Pillar Photos"
                    photoType="driverSidePillarPics"
                    description="A, B, and C pillars"
                  />
                  <PhotoUploadSection
                    title="Door Photos"
                    photoType="driverSideDoorPics"
                    description="Driver side doors"
                  />
                  <PhotoUploadSection
                    title="Door Handle Photos"
                    photoType="driverSideDoorHandlePics"
                    description="Door handles and locks"
                  />
                  <PhotoUploadSection
                    title="Front Fender Photos"
                    photoType="driverSideFrontFenderPics"
                    description="Driver side front fender"
                  />
                  <PhotoUploadSection
                    title="Front Wheel Photos"
                    photoType="driverSideFrontWheelPics"
                    description="Driver side front wheel and tire"
                  />
                  <PhotoUploadSection
                    title="Mirror Photos"
                    photoType="driverSideMirrorPics"
                    description="Driver side mirror"
                  />
                </div>
              </div>

              {/* Roof */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Roof</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <PhotoUploadSection
                    title="Roof Photos"
                    photoType="roofPics"
                    description="Roof, sunroof, and antenna"
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
                    description="Dashboard with odometer and fuel gauge visible"
                  />
                  <PhotoUploadSection
                    title="Entertainment Center Photos"
                    photoType="entertainmentCenterPics"
                    description="Radio, navigation, and controls"
                  />
                  <PhotoUploadSection
                    title="Center Console Interior Photos"
                    photoType="centerConsoleInteriorPics"
                    description="Center console storage compartments"
                  />
                  <PhotoUploadSection
                    title="Center Console Exterior Photos"
                    photoType="centerConsoleExteriorPics"
                    description="Center console exterior and cup holders"
                  />
                  <PhotoUploadSection
                    title="Driver Side Door Trim Photos"
                    photoType="driverSideDoorTrimPics"
                    description="Driver door panels and controls"
                  />
                  <PhotoUploadSection
                    title="Driver Side Seat Photos"
                    photoType="driverSideSeatPics"
                    description="Driver seat condition"
                  />
                  <PhotoUploadSection
                    title="Driver Side Floor Mat Photos"
                    photoType="driverSideFloorMatPics"
                    description="Driver side floor and mats"
                  />
                  <PhotoUploadSection
                    title="Passenger Side Door Trim Photos"
                    photoType="passengerSideDoorTrimPics"
                    description="Passenger door panels and controls"
                  />
                  <PhotoUploadSection
                    title="Passenger Side Seat Photos"
                    photoType="passengerSideSeatPics"
                    description="Passenger seat condition"
                  />
                  <PhotoUploadSection
                    title="Passenger Side Floor Mat Photos"
                    photoType="passengerSideFloorMatPics"
                    description="Passenger side floor and mats"
                  />
                  <PhotoUploadSection
                    title="Glove Box Interior Photos"
                    photoType="gloveBoxInteriorPics"
                    description="Glove box contents and condition"
                  />
                  <PhotoUploadSection
                    title="Glove Box Exterior Photos"
                    photoType="gloveBoxExteriorPics"
                    description="Glove box exterior and handle"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Service Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClipboardCheck className="mr-2" size={20} />
                  Service Items ({serviceItems.length})
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addServiceItem}
                  leftIcon={<Plus size={14} />}
                  disabled={!newServiceItem.description || newServiceItem.cost <= 0}
                >
                  Add Service
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Service Item */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Service Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Service Description"
                    value={newServiceItem.description}
                    onChange={(e) => setNewServiceItem(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Oil change, tire rotation, etc."
                  />
                  <Input
                    label="Cost ($)"
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
                            <CheckCircle size={14} className="text-green-600" />
                          )}
                        </div>
                        <span className="text-sm font-medium text-gray-900">${item.cost.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleServiceItemCompleted(index)}
                          leftIcon={item.completed ? <X size={14} /> : <CheckCircle size={14} />}
                        >
                          {item.completed ? 'Undo' : 'Complete'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeServiceItem(index)}
                          leftIcon={<Trash2 size={14} />}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total Cost:</span>
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
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Signature Pad</span>
                    <Button variant="outline" size="sm" onClick={clearSignature}>
                      Clear
                    </Button>
                  </div>
                  
                  <canvas
                    ref={canvasRef}
                    width={500}
                    height={200}
                    className="border border-gray-300 rounded bg-white cursor-crosshair w-full"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  />
                  
                  <p className="text-xs text-gray-500 mt-2">
                    Click and drag to sign. Use a mouse or touch device for best results.
                  </p>
                </div>
                
                {signature && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Signature captured successfully</span>
                    </div>
                  </div>
                )}
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
                <span className="text-sm text-gray-600">Type</span>
                <Badge variant={formData.type === CheckType.CHECK_IN ? 'warning' : 'success'} className="text-xs">
                  {formData.type === CheckType.CHECK_IN ? 'Check In' : 'Check Out'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <Badge 
                  variant={
                    formData.status === CheckStatus.CHECKED_OUT ? 'success' :
                    formData.status === CheckStatus.IN_SERVICE ? 'default' : 'warning'
                  } 
                  className="text-xs"
                >
                  {formData.status === CheckStatus.CHECKED_OUT ? 'Checked Out' :
                   formData.status === CheckStatus.IN_SERVICE ? 'In Service' : 'Checked In'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm font-medium">{formData.date || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="text-sm font-medium">{formData.location || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Contact</span>
                <span className="text-sm font-medium">{formData.contact || 'Not set'}</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Customer */}
          {selectedCustomer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" size={16} />
                  Customer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {selectedCustomer.firstName} {selectedCustomer.lastName}
                  </h4>
                  <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                  <p className="text-sm text-gray-500">{selectedCustomer.phone}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs">
                    {selectedCustomer.type}
                  </Badge>
                  <Badge variant="default" className="text-xs">
                    {selectedCustomer.membershipLevel}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Selected Vehicle */}
          {selectedVehicle && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Car className="mr-2" size={16} />
                  Vehicle
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    {selectedVehicle.year} {selectedVehicle.make} {selectedVehicle.model}
                  </h4>
                  <p className="text-sm text-gray-600">{selectedVehicle.licensePlate}</p>
                  <p className="text-sm text-gray-500">VIN: {selectedVehicle.vin.slice(-8)}</p>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Fuel:</span>
                    <span className="font-medium">{selectedVehicle.fuelLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Odometer:</span>
                    <span className="font-medium">{selectedVehicle.odometer.toLocaleString()} mi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Battery:</span>
                    <span className="font-medium">{selectedVehicle.batteryType}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Photo Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Camera className="mr-2" size={16} />
                Photo Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Photos</span>
                <span className="font-semibold text-primary-600">{totalPhotos}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Basic Photos</span>
                <span className="font-semibold">
                  {[photos.driverPic, photos.passengerPic, photos.frontPic, photos.rearPic].filter(Boolean).length}/4
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Walk Around Video</span>
                <Badge variant={photos.walkAroundVideo ? 'success' : 'outline'} className="text-xs">
                  {photos.walkAroundVideo ? 'Recorded' : 'Not Recorded'}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Interior Photos</span>
                <span className="font-semibold">
                  {[
                    photos.dashboardPics,
                    photos.driverSideSeatPics,
                    photos.passengerSideSeatPics,
                    photos.centerConsoleInteriorPics
                  ].filter(photoSet => photoSet && photoSet.length > 0).length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Exterior Photos</span>
                <span className="font-semibold">
                  {[
                    photos.engineBayPics,
                    photos.frontBumperPics,
                    photos.rearLightPics,
                    photos.roofPics
                  ].filter(photoSet => photoSet && photoSet.length > 0).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Service Summary */}
          {serviceItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Service Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Services</span>
                  <span className="font-semibold">{serviceItems.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">
                    {serviceItems.filter(item => item.completed).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Pending</span>
                  <span className="font-semibold text-warning-600">
                    {serviceItems.filter(item => !item.completed).length}
                  </span>
                </div>
                
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Total Cost</span>
                    <span className="font-bold text-lg text-primary-600">
                      ${serviceItems.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}
                    </span>
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
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  leftIcon={<Camera size={16} />}
                  onClick={() => {
                    // Scroll to photos section
                    document.querySelector('[data-section="photos"]')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Add Photos
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  leftIcon={<Video size={16} />}
                  onClick={() => handlePhotoUpload('walkAroundVideo', false)}
                >
                  Record Video
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start" 
                  leftIcon={<Plus size={16} />}
                  onClick={() => {
                    // Scroll to service items section
                    document.querySelector('[data-section="services"]')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Add Service
                </Button>
                <Button variant="outline" className="w-full justify-start" leftIcon={<Eye size={16} />}>
                  Preview Record
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}