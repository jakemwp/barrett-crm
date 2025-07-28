import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Edit, 
  X, 
  Car, 
  Plus, 
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Shield,
  Fuel,
  Battery,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Clock
} from 'lucide-react';
import { getVehicleById, getCustomerById, checkInOuts } from '../data/mock-data';
import { Vehicle, CheckInOut, CheckStatus, CheckType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency, getInitials } from '../lib/utils';
import { Avatar } from '../components/ui/Avatar';

export function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const vehicleData = getVehicleById(id);
      
      if (vehicleData) {
        setVehicle(vehicleData);
        setFormData(vehicleData);
      } else {
        navigate('/vehicles');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleInputChange = (field: keyof Vehicle, value: any) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleNestedInputChange = (parentField: keyof Vehicle, childField: string, value: any) => {
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
      setVehicle(formData);
      setIsEditing(false);
      // Show success message
    }
  };

  const handleCancel = () => {
    setFormData(vehicle);
    setIsEditing(false);
  };

  const handleNewCheckIn = () => {
    // Navigate to add check-in/out page with vehicle ID as query parameter
    navigate(`/check-in-out/new?vehicleId=${id}`);
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

  if (!vehicle || !formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Vehicle not found</h2>
        <p className="mt-2 text-gray-600">The vehicle you're looking for doesn't exist.</p>
        <Link to="/vehicles" className="mt-4 inline-block">
          <Button variant="primary">Back to Vehicles</Button>
        </Link>
      </div>
    );
  }

  const customer = getCustomerById(vehicle.customerId);
  const customerName = customer ? `${customer.firstName} ${customer.lastName}` : 'Unknown Customer';

  // Get check-in/out records for this vehicle
  const vehicleCheckInOuts = checkInOuts.filter(record => record.vehicleId === vehicle.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/vehicles">
            <Button variant="outline" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4">
            {vehicle.image && (
              <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={vehicle.image} 
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {vehicle.year} {vehicle.make} {vehicle.model}
              </h1>
              <p className="text-sm text-gray-600">
                ID: {vehicle.id.length >= 4 ? vehicle.id.substring(0, 8).toUpperCase() : vehicle.id.toUpperCase()} • 
                {vehicle.licensePlate} • VIN: {vehicle.vin}
              </p>
              <p className="text-sm text-gray-500">
                Owner: <Link to={`/clients/${vehicle.customerId}`} className="text-primary-600 hover:underline">
                  {customerName}
                </Link>
              </p>
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
            <Button variant="primary" onClick={() => setIsEditing(true)} leftIcon={<Edit size={16} />}>
              Edit Vehicle
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Information Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" size={20} />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Year"
                    type="number"
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Make"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Model"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Color"
                    value={formData.color || ''}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="License Plate"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="VIN"
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Proof of Ownership"
                    value={formData.proofOfOwnership || ''}
                    onChange={(e) => handleInputChange('proofOfOwnership', e.target.value || null)}
                    disabled={!isEditing}
                    options={[
                      { value: '', label: 'Please Select' },
                      { value: 'Vehicle Registration', label: 'Vehicle Registration' },
                      { value: 'Temporary Operating Permit', label: 'Temporary Operating Permit' },
                      { value: 'Proof of Insurance', label: 'Proof of Insurance' },
                    ]}
                  />
                </div>
              </div>

              {/* Vehicle Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Odometer"
                    type="number"
                    value={formData.odometer || ''}
                    onChange={(e) => handleInputChange('odometer', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Fair Market Value"
                    type="number"
                    step="0.01"
                    value={formData.fairMarketValue}
                    onChange={(e) => handleInputChange('fairMarketValue', parseFloat(e.target.value))}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Fuel Level (%)"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.fuelLevel}
                    onChange={(e) => handleInputChange('fuelLevel', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Battery Type"
                    value={formData.batteryType}
                    onChange={(e) => handleInputChange('batteryType', e.target.value)}
                    disabled={!isEditing}
                    options={[
                      { value: '', label: 'Please Select' },
                      { value: 'Lead-Acid Flooded', label: 'Lead-Acid Flooded' },
                      { value: 'Lead-Acid Sealed (AGM)', label: 'Lead-Acid Sealed (AGM)' },
                      { value: 'Lead-Acid Sealed (Gel)', label: 'Lead-Acid Sealed (Gel)' },
                      { value: 'Lithium-Ion (EV)', label: 'Lithium-Ion (EV)' },
                      { value: 'Lithium-Ion (Plug-In Hybrid EV)', label: 'Lithium-Ion (Plug-In Hybrid EV)' },
                      { value: 'Lithium-Ion (Hybrid EV)', label: 'Lithium-Ion (Hybrid EV)' },
                    ]}
                  />
                </div>
              </div>

              {/* Storage Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                <Select
                  label="Storage Location"
                  value={formData.storageLocation}
                  onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                  disabled={!isEditing}
                  options={[
                    { value: 'Moorpark', label: 'Moorpark' },
                    { value: 'Westlake Village', label: 'Westlake Village' },
                  ]}
                />
              </div>

              {/* Insurance Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.insuranceRiderRequired}
                      onChange={(e) => handleInputChange('insuranceRiderRequired', e.target.checked)}
                      disabled={!isEditing}
                      className="checkbox"
                    />
                    <span className="text-sm font-medium text-gray-700">Insurance Rider Required</span>
                  </label>
                  
                  {formData.insuranceRiderRequired && (
                    <Input
                      label="Insurance Rider Amount"
                      type="number"
                      step="0.01"
                      value={formData.insuranceRiderAmount || ''}
                      onChange={(e) => handleInputChange('insuranceRiderAmount', parseFloat(e.target.value))}
                      disabled={!isEditing}
                    />
                  )}
                </div>
              </div>

              {/* Registration Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Registration Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="State"
                    value={formData.registration.state}
                    onChange={(e) => handleNestedInputChange('registration', 'state', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Expiration Date"
                    type="date"
                    value={formData.registration.expirationDate}
                    onChange={(e) => handleNestedInputChange('registration', 'expirationDate', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Tire Pressure Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tire Pressure Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Default Pressure (PSI)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Front"
                        type="number"
                        value={formData.tirePressureDefault.front}
                        onChange={(e) => handleNestedInputChange('tirePressureDefault', 'front', parseInt(e.target.value))}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Rear"
                        type="number"
                        value={formData.tirePressureDefault.rear}
                        onChange={(e) => handleNestedInputChange('tirePressureDefault', 'rear', parseInt(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-md font-medium text-gray-700 mb-3">Preferred Pressure (PSI)</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Front"
                        type="number"
                        value={formData.tirePressurePreferred.front}
                        onChange={(e) => handleNestedInputChange('tirePressurePreferred', 'front', parseInt(e.target.value))}
                        disabled={!isEditing}
                      />
                      <Input
                        label="Rear"
                        type="number"
                        value={formData.tirePressurePreferred.rear}
                        onChange={(e) => handleNestedInputChange('tirePressurePreferred', 'rear', parseInt(e.target.value))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Maintenance Schedule */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Last Service Date"
                    type="date"
                    value={formData.maintenanceSchedule.lastService || ''}
                    onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'lastService', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Next Service Date"
                    type="date"
                    value={formData.maintenanceSchedule.nextService || ''}
                    onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'nextService', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Service Interval (months)"
                    type="number"
                    value={formData.maintenanceSchedule.serviceInterval}
                    onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'serviceInterval', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="mt-4">
                  <Textarea
                    label="Maintenance Notes"
                    value={formData.maintenanceSchedule.notes || ''}
                    onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'notes', e.target.value)}
                    disabled={!isEditing}
                    rows={3}
                  />
                </div>
              </div>

              {/* Authorized Drivers */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Authorized Drivers ({vehicle.authorizedDrivers.length})</h3>
                {vehicle.authorizedDrivers.length > 0 ? (
                  <div className="space-y-3">
                    {vehicle.authorizedDrivers.map((driver) => (
                      <div key={driver.id} className="flex items-center p-3 border border-gray-200 rounded-md">
                        <Avatar initials={getInitials(driver.name.split(' ')[0] || '', driver.name.split(' ')[1] || '')} size="sm" />
                        <div className="ml-3 flex-1">
                          <h5 className="font-medium text-gray-900">{driver.name}</h5>
                          <p className="text-sm text-gray-600">{driver.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            {driver.phone && (
                              <span className="text-xs text-gray-500">{driver.phone}</span>
                            )}
                            {driver.relationship && (
                              <Badge variant="outline" className="text-xs">
                                {driver.relationship}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No authorized drivers added</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Summary & Quick Stats */}
        <div className="space-y-6">
          {/* Vehicle Status */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Fuel className={`mr-2 ${getFuelLevelColor(vehicle.fuelLevel)}`} size={16} />
                  <span className="text-sm text-gray-600">Fuel Level</span>
                </div>
                <span className={`font-semibold ${getFuelLevelColor(vehicle.fuelLevel)}`}>
                  {vehicle.fuelLevel}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Battery className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Battery Type</span>
                </div>
                <Badge variant={getBatteryTypeColor(vehicle.batteryType)} className="text-xs">
                  {vehicle.batteryType}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-success-600" size={16} />
                  <span className="text-sm text-gray-600">Market Value</span>
                </div>
                <span className="font-semibold text-success-600">
                  {formatCurrency(vehicle.fairMarketValue)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Odometer</span>
                </div>
                <span className="font-semibold">{(vehicle.odometer ?? 0).toLocaleString()} mi</span>
              </div>
              
              {vehicle.insuranceRiderRequired && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Shield className="mr-2 text-blue-600" size={16} />
                    <span className="text-sm text-gray-600">Insurance</span>
                  </div>
                  <Badge variant="warning" className="text-xs">
                    Required
                  </Badge>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {new Date(vehicle.registration.expirationDate) > new Date() ? (
                    <CheckCircle className="mr-2 text-green-600" size={16} />
                  ) : (
                    <AlertTriangle className="mr-2 text-red-600" size={16} />
                  )}
                  <span className="text-sm text-gray-600">Registration</span>
                </div>
                <span className={`font-semibold text-xs ${
                  new Date(vehicle.registration.expirationDate) > new Date() 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {formatDateDisplay(vehicle.registration.expirationDate)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Info */}
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Wrench className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Last Service</span>
                </div>
                <span className="text-sm font-medium">
                  {vehicle.maintenanceSchedule.lastService 
                    ? formatDateDisplay(vehicle.maintenanceSchedule.lastService)
                    : 'Never'
                  }
                </span>
              </div>
              
              {vehicle.maintenanceSchedule.nextService && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-primary-600" size={16} />
                    <span className="text-sm text-gray-600">Next Service</span>
                  </div>
                  <span className="text-sm font-medium text-primary-600">
                    {formatDateDisplay(vehicle.maintenanceSchedule.nextService)}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Interval</span>
                </div>
                <span className="text-sm font-medium">
                  {vehicle.maintenanceSchedule.serviceInterval} months
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Owner Information */}
          <Card>
            <CardHeader>
              <CardTitle>Owner Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customer && (
                <>
                  <div className="flex items-center space-x-3">
                    <Avatar initials={getInitials(customer.firstName, customer.lastName)} size="sm" />
                    <div>
                      <Link to={`/clients/${customer.id}`} className="font-medium text-primary-600 hover:underline">
                        {customerName}
                      </Link>
                      <p className="text-xs text-gray-500">{customer.type} • {customer.membershipLevel}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Phone className="mr-2 text-gray-400" size={14} />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-2 text-gray-400" size={14} />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Building className="mr-2 text-gray-400" size={14} />
                      <span>{customer.storageLocation}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Check In/Out Records Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center">
            <Car className="mr-2" size={20} />
            Check In/Out Records ({vehicleCheckInOuts.length})
          </CardTitle>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
            onClick={handleNewCheckIn}
          >
            New Check-In
          </Button>
        </CardHeader>
        <CardContent>
          {vehicleCheckInOuts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleCheckInOuts.map((record) => {
                    const status = statusConfig[record.status];
                    const type = typeConfig[record.type];
                    
                    return (
                      <tr key={record.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div className="text-sm font-medium text-gray-900">{formatDateDisplay(record.date)}</div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={type.variant} className="text-xs">
                            {type.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={status.variant} className="text-xs">
                            {status.label}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-900">{record.contact}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{record.location}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Link to={`/check-in-out/${record.id}`}>
                              <Button variant="primary" size="sm">
                                View Details
                              </Button>
                            </Link>
                            <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Car className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No check-in/out records</h3>
              <p className="mt-1 text-sm text-gray-500">
                This vehicle doesn't have any service records yet.
              </p>
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  leftIcon={<Plus size={16} />}
                  onClick={handleNewCheckIn}
                >
                  Create First Check-In
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}