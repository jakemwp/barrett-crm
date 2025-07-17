import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Car, 
  User, 
  Building, 
  Shield, 
  Fuel, 
  Battery, 
  Calendar, 
  Wrench, 
  CheckCircle, 
  AlertCircle,
  Users,
  Plus,
  Trash2,
  DollarSign,
  MapPin,
  Key,
  Phone,
  Mail
} from 'lucide-react';
import { addVehicle, customers, getCustomerById } from '../data/mock-data';
import { Vehicle, AuthorizedDriver, AuthorizedContact } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { formatCurrency, getInitials, generateId } from '../lib/utils';

export function AddVehicle() {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    customerId: '',
    year: new Date().getFullYear(),
    make: '',
    model: '',
    vin: '',
    storageLocation: '',
    fairMarketValue: 0,
    insuranceRiderRequired: false,
    insuranceRiderAmount: 0,
    licensePlate: '',
    proofOfOwnership: null as string | null,
    registration: {
      number: '',
      expirationDate: '',
      state: '',
    },
    tirePressureDefault: {
      front: 32,
      rear: 30,
    },
    tirePressurePreferred: {
      front: 34,
      rear: 32,
    },
    maintenanceSchedule: {
      lastService: '',
      nextService: '',
      serviceInterval: 6,
      notes: '',
    },
    odometer: 0,
    image: '',
    fuelLevel: 100,
    batteryType: 'Standard' as Vehicle['batteryType'],
    color: '',
  });

  const [authorizedDrivers, setAuthorizedDrivers] = useState<Omit<AuthorizedDriver, 'id'>[]>([]);
  const [authorizedContacts, setAuthorizedContacts] = useState<Omit<AuthorizedContact, 'id'>[]>([]);
  
  const [newDriver, setNewDriver] = useState({
    name: '',
    phone: '',
    email: '',
    licenseNumber: '',
    relationship: '',
  });

  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: '',
    canDropoff: false,
    canPickup: false,
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

  const handleCustomerChange = (customerId: string) => {
    const customer = getCustomerById(customerId);
    if (customer) {
      setFormData(prev => ({
        ...prev,
        customerId,
        storageLocation: customer.storageLocation,
      }));
      
      // Add customer as primary authorized driver
      if (!authorizedDrivers.some(driver => driver.email === customer.email)) {
        setAuthorizedDrivers(prev => [{
          name: `${customer.firstName} ${customer.lastName}`,
          phone: customer.phone,
          email: customer.email,
          licenseNumber: '',
          relationship: 'Owner',
        }, ...prev]);
      }
    }
  };

  const addAuthorizedDriver = () => {
    if (newDriver.name && newDriver.email) {
      setAuthorizedDrivers(prev => [...prev, { ...newDriver }]);
      setNewDriver({
        name: '',
        phone: '',
        email: '',
        licenseNumber: '',
        relationship: '',
      });
    }
  };

  const removeAuthorizedDriver = (index: number) => {
    setAuthorizedDrivers(prev => prev.filter((_, i) => i !== index));
  };

  const addAuthorizedContact = () => {
    if (newContact.name && newContact.phone) {
      setAuthorizedContacts(prev => [...prev, { ...newContact }]);
      setNewContact({
        name: '',
        phone: '',
        email: '',
        relationship: '',
        canDropoff: false,
        canPickup: false,
      });
    }
  };

  const removeAuthorizedContact = (index: number) => {
    setAuthorizedContacts(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerId) {
      newErrors.customerId = 'Customer is required';
    }
    
    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }
    
    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }
    
    if (!formData.vin.trim()) {
      newErrors.vin = 'VIN is required';
    }
    
    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }
    
    if (!formData.proofOfOwnership) {
      newErrors.proofOfOwnership = 'Proof of ownership is required';
    }
    
    if (!formData.storageLocation.trim()) {
      newErrors.storageLocation = 'Storage location is required';
    }
    
    if (formData.fairMarketValue <= 0) {
      newErrors.fairMarketValue = 'Fair market value must be greater than 0';
    }
    
    if (formData.year < 1900 || formData.year > new Date().getFullYear() + 1) {
      newErrors.year = 'Please enter a valid year';
    }
    
    if (formData.odometer < 0) {
      newErrors.odometer = 'Odometer cannot be negative';
    }
    
    if (formData.fuelLevel < 0 || formData.fuelLevel > 100) {
      newErrors.fuelLevel = 'Fuel level must be between 0 and 100';
    }
    
    if (!formData.registration.number.trim()) {
      newErrors['registration.number'] = 'Registration number is required';
    }
    
    if (!formData.registration.state.trim()) {
      newErrors['registration.state'] = 'Registration state is required';
    }
    
    if (!formData.registration.expirationDate) {
      newErrors['registration.expirationDate'] = 'Registration expiration date is required';
    }
    
    if (formData.insuranceRiderRequired && formData.insuranceRiderAmount <= 0) {
      newErrors.insuranceRiderAmount = 'Insurance rider amount is required when insurance is required';
    }
    
    if (authorizedDrivers.length === 0) {
      newErrors.authorizedDrivers = 'At least one authorized driver is required';
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
      
      const newVehicle = addVehicle({
        ...formData,
        authorizedDrivers: authorizedDrivers.map(driver => ({
          ...driver,
          id: generateId(),
        })),
        authorizedContacts: authorizedContacts.map(contact => ({
          ...contact,
          id: generateId(),
        })),
      });
      
      setSaveStatus('success');
      
      // Navigate to the new vehicle's detail page after a short delay
      setTimeout(() => {
        navigate(`/vehicles/${newVehicle.id}`);
      }, 1500);
      
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    navigate('/vehicles');
  };

  // Auto-generate next service date based on last service and interval
  React.useEffect(() => {
    if (formData.maintenanceSchedule.lastService && formData.maintenanceSchedule.serviceInterval) {
      const lastServiceDate = new Date(formData.maintenanceSchedule.lastService);
      const nextServiceDate = new Date(lastServiceDate);
      nextServiceDate.setMonth(nextServiceDate.getMonth() + formData.maintenanceSchedule.serviceInterval);
      
      setFormData(prev => ({
        ...prev,
        maintenanceSchedule: {
          ...prev.maintenanceSchedule,
          nextService: nextServiceDate.toISOString().split('T')[0],
        },
      }));
    }
  }, [formData.maintenanceSchedule.lastService, formData.maintenanceSchedule.serviceInterval]);

  const selectedCustomer = formData.customerId ? getCustomerById(formData.customerId) : null;

  const clientOptions = customers.map(customer => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName} (${customer.email})`,
  }));

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
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Car className="mr-3" size={28} />
              Add Vehicle
            </h1>
            <p className="text-gray-600 mt-1">
              Create a new vehicle record with detailed information
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-600 mr-4">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm">Vehicle created successfully!</span>
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
            {saveStatus === 'saving' ? 'Creating Vehicle...' : 'Create Vehicle'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicle Information Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Vehicle Owner
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                label="Client *"
                value={formData.customerId}
                onChange={(e) => handleCustomerChange(e.target.value)}
                error={errors.customerId}
                options={[
                  { value: '', label: 'Select a client...' },
                  ...clientOptions,
                ]}
              />
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" size={20} />
                Vehicle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Year *"
                    type="number"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    value={formData.year}
                    onChange={(e) => handleInputChange('year', parseInt(e.target.value))}
                    error={errors.year}
                    placeholder="2024"
                  />
                  <Input
                    label="Make *"
                    value={formData.make}
                    onChange={(e) => handleInputChange('make', e.target.value)}
                    error={errors.make}
                    placeholder="Toyota, Honda, Ford, etc."
                  />
                  <Input
                    label="Model *"
                    value={formData.model}
                    onChange={(e) => handleInputChange('model', e.target.value)}
                    error={errors.model}
                    placeholder="Camry, Accord, F-150, etc."
                  />
                  <Input
                    label="Color"
                    value={formData.color}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="Silver, Black, White, etc."
                  />
                  <Input
                    label="License Plate *"
                    value={formData.licensePlate}
                    onChange={(e) => handleInputChange('licensePlate', e.target.value.toUpperCase())}
                    error={errors.licensePlate}
                    placeholder="ABC123"
                  />
                  <Input
                    label="VIN *"
                    value={formData.vin}
                    onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                    error={errors.vin}
                    placeholder="17-character VIN"
                  />
                  <Select
                    label="Proof of Ownership *"
                    value={formData.proofOfOwnership || ''}
                    onChange={(e) => handleInputChange('proofOfOwnership', e.target.value || null)}
                    error={errors.proofOfOwnership}
                    options={[
                      { value: '', label: 'Please Select' },
                      { value: 'Vehicle Registration', label: 'Vehicle Registration' },
                      { value: 'Temporary Operating Permit', label: 'Temporary Operating Permit' },
                      { value: 'Proof of Insurance', label: 'Proof of Insurance' },
                    ]}
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Odometer *"
                    type="number"
                    min="0"
                    value={formData.odometer}
                    onChange={(e) => handleInputChange('odometer', parseInt(e.target.value) || 0)}
                    error={errors.odometer}
                    placeholder="Current mileage"
                  />
                  <Input
                    label="Fair Market Value *"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.fairMarketValue}
                    onChange={(e) => handleInputChange('fairMarketValue', parseFloat(e.target.value) || 0)}
                    error={errors.fairMarketValue}
                    placeholder="Vehicle value in USD"
                  />
                  <Input
                    label="Fuel Level (%) *"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.fuelLevel}
                    onChange={(e) => handleInputChange('fuelLevel', parseInt(e.target.value) || 0)}
                    error={errors.fuelLevel}
                  />
                  <Select
                    label="Battery Type *"
                    value={formData.batteryType}
                    onChange={(e) => handleInputChange('batteryType', e.target.value)}
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

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                <Input
                  label="Storage Location *"
                  value={formData.storageLocation}
                  onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                  error={errors.storageLocation}
                  placeholder="Building A - Section 1 - Spot 12"
                  helperText="Auto-populated from customer information"
                />
              </div>
            </CardContent>
          </Card>

          {/* Insurance Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2" size={20} />
                Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.insuranceRiderRequired}
                  onChange={(e) => handleInputChange('insuranceRiderRequired', e.target.checked)}
                  className="checkbox"
                />
                <span className="text-sm font-medium text-gray-700">Insurance Rider Required</span>
              </label>
              
              {formData.insuranceRiderRequired && (
                <Input
                  label="Insurance Rider Amount *"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.insuranceRiderAmount}
                  onChange={(e) => handleInputChange('insuranceRiderAmount', parseFloat(e.target.value) || 0)}
                  error={errors.insuranceRiderAmount}
                  placeholder="Insurance coverage amount"
                />
              )}
            </CardContent>
          </Card>

          {/* Registration Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2" size={20} />
                Registration Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  label="Registration Number *"
                  value={formData.registration.number}
                  onChange={(e) => handleNestedInputChange('registration', 'number', e.target.value)}
                  error={errors['registration.number']}
                  placeholder="REG123456"
                />
                <Input
                  label="State *"
                  value={formData.registration.state}
                  onChange={(e) => handleNestedInputChange('registration', 'state', e.target.value.toUpperCase())}
                  error={errors['registration.state']}
                  placeholder="CA"
                  maxLength={2}
                />
                <Input
                  label="Expiration Date *"
                  type="date"
                  value={formData.registration.expirationDate}
                  onChange={(e) => handleNestedInputChange('registration', 'expirationDate', e.target.value)}
                  error={errors['registration.expirationDate']}
                />
              </div>
            </CardContent>
          </Card>

          {/* Tire Pressure Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Car className="mr-2" size={20} />
                Tire Pressure Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Default Pressure (PSI)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Front"
                      type="number"
                      min="0"
                      value={formData.tirePressureDefault.front}
                      onChange={(e) => handleNestedInputChange('tirePressureDefault', 'front', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Rear"
                      type="number"
                      min="0"
                      value={formData.tirePressureDefault.rear}
                      onChange={(e) => handleNestedInputChange('tirePressureDefault', 'rear', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-3">Preferred Pressure (PSI)</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Front"
                      type="number"
                      min="0"
                      value={formData.tirePressurePreferred.front}
                      onChange={(e) => handleNestedInputChange('tirePressurePreferred', 'front', parseInt(e.target.value) || 0)}
                    />
                    <Input
                      label="Rear"
                      type="number"
                      min="0"
                      value={formData.tirePressurePreferred.rear}
                      onChange={(e) => handleNestedInputChange('tirePressurePreferred', 'rear', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2" size={20} />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Last Service Date"
                  type="date"
                  value={formData.maintenanceSchedule.lastService}
                  onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'lastService', e.target.value)}
                />
                <Input
                  label="Next Service Date"
                  type="date"
                  value={formData.maintenanceSchedule.nextService}
                  onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'nextService', e.target.value)}
                  helperText="Auto-calculated based on last service and interval"
                />
                <Input
                  label="Service Interval (months)"
                  type="number"
                  min="1"
                  value={formData.maintenanceSchedule.serviceInterval}
                  onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'serviceInterval', parseInt(e.target.value) || 6)}
                />
              </div>
              
              <Textarea
                label="Maintenance Notes"
                value={formData.maintenanceSchedule.notes}
                onChange={(e) => handleNestedInputChange('maintenanceSchedule', 'notes', e.target.value)}
                rows={3}
                placeholder="Special maintenance instructions or notes..."
              />
            </CardContent>
          </Card>

          {/* Authorized Drivers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="mr-2" size={20} />
                  Authorized Drivers ({authorizedDrivers.length})
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addAuthorizedDriver}
                  leftIcon={<Plus size={14} />}
                  disabled={!newDriver.name || !newDriver.email}
                >
                  Add Driver
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.authorizedDrivers && (
                <div className="text-sm text-red-600">{errors.authorizedDrivers}</div>
              )}
              
              {/* Add New Driver */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Authorized Driver</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                  />
                  <Input
                    label="Email *"
                    type="email"
                    value={newDriver.email}
                    onChange={(e) => setNewDriver(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                  <Input
                    label="Phone"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                  <Input
                    label="License Number"
                    value={newDriver.licenseNumber}
                    onChange={(e) => setNewDriver(prev => ({ ...prev, licenseNumber: e.target.value }))}
                    placeholder="D1234567"
                  />
                  <Select
                    label="Relationship"
                    value={newDriver.relationship}
                    onChange={(e) => setNewDriver(prev => ({ ...prev, relationship: e.target.value }))}
                    options={[
                      { value: '', label: 'Select relationship...' },
                      { value: 'Owner', label: 'Owner' },
                      { value: 'Spouse', label: 'Spouse' },
                      { value: 'Child', label: 'Child' },
                      { value: 'Parent', label: 'Parent' },
                      { value: 'Sibling', label: 'Sibling' },
                      { value: 'Friend', label: 'Friend' },
                      { value: 'Employee', label: 'Employee' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />
                </div>
              </div>

              {/* Authorized Drivers List */}
              {authorizedDrivers.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Authorized Drivers</h4>
                  {authorizedDrivers.map((driver, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Avatar initials={getInitials(driver.name.split(' ')[0] || '', driver.name.split(' ')[1] || '')} size="sm" />
                          <div>
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
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAuthorizedDriver(index)}
                        leftIcon={<Trash2 size={14} />}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Authorized Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Phone className="mr-2" size={20} />
                  Authorized Contacts ({authorizedContacts.length})
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={addAuthorizedContact}
                  leftIcon={<Plus size={14} />}
                  disabled={!newContact.name || !newContact.phone}
                >
                  Add Contact
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Contact */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Add New Authorized Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Full Name *"
                    value={newContact.name}
                    onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Emergency Contact"
                  />
                  <Input
                    label="Phone *"
                    value={newContact.phone}
                    onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@example.com"
                  />
                  <Select
                    label="Relationship"
                    value={newContact.relationship}
                    onChange={(e) => setNewContact(prev => ({ ...prev, relationship: e.target.value }))}
                    options={[
                      { value: '', label: 'Select relationship...' },
                      { value: 'Emergency', label: 'Emergency Contact' },
                      { value: 'Family', label: 'Family Member' },
                      { value: 'Friend', label: 'Friend' },
                      { value: 'Colleague', label: 'Colleague' },
                      { value: 'Other', label: 'Other' },
                    ]}
                  />
                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newContact.canDropoff}
                          onChange={(e) => setNewContact(prev => ({ ...prev, canDropoff: e.target.checked }))}
                          className="checkbox"
                        />
                        <span className="text-sm font-medium text-gray-700">Can Drop Off</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={newContact.canPickup}
                          onChange={(e) => setNewContact(prev => ({ ...prev, canPickup: e.target.checked }))}
                          className="checkbox"
                        />
                        <span className="text-sm font-medium text-gray-700">Can Pick Up</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Authorized Contacts List */}
              {authorizedContacts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-700">Authorized Contacts</h4>
                  {authorizedContacts.map((contact, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Avatar initials={getInitials(contact.name.split(' ')[0] || '', contact.name.split(' ')[1] || '')} size="sm" />
                          <div>
                            <h5 className="font-medium text-gray-900">{contact.name}</h5>
                            <p className="text-sm text-gray-600">{contact.phone}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {contact.email && (
                                <span className="text-xs text-gray-500">{contact.email}</span>
                              )}
                              {contact.relationship && (
                                <Badge variant="outline" className="text-xs">
                                  {contact.relationship}
                                </Badge>
                              )}
                              {contact.canDropoff && (
                                <Badge variant="success" className="text-xs">
                                  Drop Off
                                </Badge>
                              )}
                              {contact.canPickup && (
                                <Badge variant="warning" className="text-xs">
                                  Pick Up
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAuthorizedContact(index)}
                        leftIcon={<Trash2 size={14} />}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Vehicle Preview & Summary */}
        <div className="space-y-6">
          {/* Vehicle Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-12 rounded-md bg-primary-600 text-white flex items-center justify-center font-medium text-sm mx-auto mb-3">
                  <Car size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formData.year || 'Year'} {formData.make || 'Make'} {formData.model || 'Model'}
                </h3>
                <p className="text-sm text-gray-600">{formData.licensePlate || 'License Plate'}</p>
                <p className="text-sm text-gray-500">VIN: {formData.vin.slice(-8) || 'VIN'}</p>
              </div>
            </CardContent>
          </Card>

          {/* Selected Customer */}
          {selectedCustomer && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2" size={16} />
                  Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Avatar initials={getInitials(selectedCustomer.firstName, selectedCustomer.lastName)} size="sm" />
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {selectedCustomer.firstName} {selectedCustomer.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{selectedCustomer.email}</p>
                    <p className="text-sm text-gray-500">{selectedCustomer.phone}</p>
                  </div>
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

          {/* Vehicle Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Fuel className="mr-2" size={16} />
                Vehicle Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Fuel className={`mr-2 ${getFuelLevelColor(formData.fuelLevel)}`} size={16} />
                  <span className="text-sm text-gray-600">Fuel Level</span>
                </div>
                <span className={`font-semibold ${getFuelLevelColor(formData.fuelLevel)}`}>
                  {formData.fuelLevel}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Battery className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Battery Type</span>
                </div>
                <Badge variant={getBatteryTypeColor(formData.batteryType)} className="text-xs">
                  {formData.batteryType}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <DollarSign className="mr-2 text-success-600" size={16} />
                  <span className="text-sm text-gray-600">Market Value</span>
                </div>
                <span className="font-semibold text-success-600">
                  {formatCurrency(formData.fairMarketValue)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Odometer</span>
                </div>
                <span className="font-semibold">{formData.odometer.toLocaleString()} mi</span>
              </div>
              
              {formData.insuranceRiderRequired && (
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
            </CardContent>
          </Card>

          {/* Storage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2" size={16} />
                Storage Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Location</span>
                <span className="font-semibold text-sm">{formData.storageLocation || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Registration State</span>
                <span className="font-semibold">{formData.registration.state || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Registration Expires</span>
                <span className="font-semibold text-sm">
                  {formData.registration.expirationDate || 'Not set'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Authorized Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2" size={16} />
                Authorized Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Authorized Drivers</span>
                <span className="font-semibold">{authorizedDrivers.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emergency Contacts</span>
                <span className="font-semibold">{authorizedContacts.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Can Drop Off</span>
                <span className="font-semibold text-green-600">
                  {authorizedContacts.filter(c => c.canDropoff).length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Can Pick Up</span>
                <span className="font-semibold text-blue-600">
                  {authorizedContacts.filter(c => c.canPickup).length}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Maintenance Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wrench className="mr-2" size={16} />
                Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Service Interval</span>
                <span className="font-semibold">{formData.maintenanceSchedule.serviceInterval} months</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Service</span>
                <span className="font-semibold text-sm">
                  {formData.maintenanceSchedule.lastService || 'Never'}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Next Service</span>
                <span className="font-semibold text-sm text-primary-600">
                  {formData.maintenanceSchedule.nextService || 'Not scheduled'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}