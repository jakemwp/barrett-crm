import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Edit, 
  X, 
  Car, 
  Plus, 
  Eye, 
  Trash2,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Key,
  FileText,
  DollarSign,
  Grid,
  Shield,
  Fuel,
  Battery,
  AlertTriangle,
  CheckCircle,
  Wrench,
  Clock,
  CheckSquare,
  ClipboardCheck,
  LogIn,
  LogOut,
  Pen
} from 'lucide-react';
import { getCustomerById, getVehiclesByCustomerId, checkInOuts } from '../data/mock-data';
import { Customer, Vehicle, CheckStatus } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { formatCurrency, formatDate, getInitials } from '../lib/utils';
import { Avatar } from '../components/ui/Avatar';
import { ServiceSignupModal } from '../components/customers/ServiceSignupModal';

interface ServiceAgreementData {
  numberOfCars: number;
  storageLocation: string;
  monthlyPrice: number;
  paymentPeriod: 'monthly' | 'quarterly' | 'annually';
  startDate: string;
  signature: string;
  signedAt: string;
  agreementTerms: string[];
}

export function CustomerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showServiceSignup, setShowServiceSignup] = useState(false);
  const [serviceAgreements, setServiceAgreements] = useState<ServiceAgreementData[]>([]);

  useEffect(() => {
    if (id) {
      const customerData = getCustomerById(id);
      const vehicleData = getVehiclesByCustomerId(id);
      
      if (customerData) {
        setCustomer(customerData);
        setFormData(customerData);
        setVehicles(vehicleData);
      } else {
        navigate('/customers');
      }
      setLoading(false);
    }
  }, [id, navigate]);

  const handleInputChange = (field: keyof Customer, value: string | number | boolean) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleSave = () => {
    if (formData) {
      // In a real app, this would make an API call
      setCustomer(formData);
      setIsEditing(false);
      // Show success message
    }
  };

  const handleCancel = () => {
    setFormData(customer);
    setIsEditing(false);
  };

  const handleServiceSignatureComplete = (agreementData: ServiceAgreementData) => {
    setServiceAgreements(prev => [...prev, agreementData]);
    setShowServiceSignup(false);
    // In a real app, this would save to the backend
    console.log('Service agreement completed:', agreementData);
  };

  const handleAddVehicle = () => {
    // Navigate to add vehicle page with customer ID as query parameter
    navigate(`/vehicles/new?customerId=${id}`);
  };

  const handleVehicleRowClick = (vehicleId: string) => {
    navigate(`/vehicles/${vehicleId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!customer || !formData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900">Client not found</h2>
        <p className="mt-2 text-gray-600">The client you're looking for doesn't exist.</p>
        <Link to="/clients" className="mt-4 inline-block">
          <Button variant="primary">Back to Customers</Button>
        </Link>
      </div>
    );
  }

  const initials = getInitials(customer.firstName, customer.lastName);

  const membershipColors = {
    'Basic': 'default',
    'Premium': 'warning',
    'VIP': 'success',
    'Enterprise': 'error',
    'Archived': 'outline'
  } as const;

  const typeColors = {
    'Individual': 'outline',
    'Business': 'default',
    'Corporate': 'error'
  } as const;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/clients">
            <Button variant="outline" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Avatar initials={initials} size="lg" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {customer.firstName} {customer.lastName}
              </h1>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant={typeColors[customer.type]} className="text-xs">
                  {customer.type}
                </Badge>
                <Badge variant={membershipColors[customer.membershipLevel]} className="text-xs">
                  {customer.membershipLevel}
                </Badge>
              </div>
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
              <Button 
                variant="secondary" 
                onClick={() => setShowServiceSignup(true)} 
                leftIcon={<Pen size={16} />}
              >
                Service Agreement
              </Button>
              <Button variant="primary" onClick={() => setIsEditing(true)} leftIcon={<Edit size={16} />}>
                Edit Client
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
              Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Customer Type"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as Customer['type'])}
                    disabled={!isEditing}
                    options={[
                      { value: 'Individual', label: 'Individual' },
                      { value: 'Business', label: 'Business' },
                      { value: 'Corporate', label: 'Corporate' },
                    ]}
                  />
                  <Select
                    label="Membership Level"
                    value={formData.membershipLevel}
                    onChange={(e) => handleInputChange('membershipLevel', e.target.value as Customer['membershipLevel'])}
                    disabled={!isEditing}
                    options={[
                      { value: 'Basic', label: 'Basic' },
                      { value: 'Premium', label: 'Premium' },
                      { value: 'VIP', label: 'VIP' },
                      { value: 'Enterprise', label: 'Enterprise' },
                    ]}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Street Address"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    disabled={!isEditing}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      disabled={!isEditing}
                    />
                    <Input
                      label="Zip Code"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              {/* Storage Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Storage Location"
                    value={formData.storageLocation}
                    onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Storage Spots"
                    type="number"
                    value={formData.storageSpots}
                    onChange={(e) => handleInputChange('storageSpots', parseInt(e.target.value))}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Manual Price"
                    type="number"
                    step="0.01"
                    value={formData.manualPrice || ''}
                    onChange={(e) => handleInputChange('manualPrice', parseFloat(e.target.value) || 0)}
                    disabled={!isEditing}
                  />
                </div>

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.showPandaDocForm}
                      onChange={(e) => handleInputChange('showPandaDocForm', e.target.checked)}
                      disabled={!isEditing}
                      className="checkbox"
                    />
                    <span className="text-sm font-medium text-gray-700">Show PandaDoc Form</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Summary & Quick Stats */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Car className="mr-2 text-primary-600" size={16} />
                  <span className="text-sm text-gray-600">Vehicles</span>
                </div>
                <span className="font-semibold">{vehicles.length}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="mr-2 text-secondary-600" size={16} />
                  <span className="text-sm text-gray-600">Storage Spots</span>
                </div>
                <span className="font-semibold">{customer.storageSpots}</span>
              </div>
              
              {customer.manualPrice && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="mr-2 text-success-600" size={16} />
                    <span className="text-sm text-gray-600">Monthly Rate</span>
                  </div>
                  <span className="font-semibold text-success-600">
                    {formatCurrency(customer.manualPrice)}
                  </span>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Member Since</span>
                </div>
                <span className="font-semibold">{formatDate(customer.dateCreated)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Service Agreements */}
          {serviceAgreements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2" size={16} />
                  Service Agreements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {serviceAgreements.map((agreement, index) => (
                  <div key={index} className="p-3 border border-gray-200 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        Agreement #{index + 1}
                      </span>
                      <Badge variant="success" className="text-xs">
                        Signed
                      </Badge>
                    </div>
                    <div className="space-y-1 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Cars:</span>
                        <span>{agreement.numberOfCars}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment:</span>
                        <span>{formatCurrency(agreement.monthlyPrice)}/{agreement.paymentPeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Signed:</span>
                        <span>{formatDate(agreement.signedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* PandaDoc Form Status */}
          <Card>
            <CardHeader>
              <CardTitle>PandaDoc Form</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 text-primary-600" size={16} />
                  <span className="text-sm text-gray-600">Form Status</span>
                </div>
                <Badge variant={customer.showPandaDocForm ? 'success' : 'outline'}>
                  {customer.showPandaDocForm ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Info Card */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{customer.email}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{customer.phone}</span>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-2 text-gray-400 mt-0.5" size={16} />
                <div className="text-sm text-gray-600">
                  <div>{customer.streetAddress}</div>
                  <div>{customer.city}, {customer.state} {customer.zipCode}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vehicles Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center">
            <Car className="mr-2" size={20} />
            Customer Vehicles ({vehicles.length})
          </CardTitle>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
            onClick={handleAddVehicle}
          >
            Add Vehicle
          </Button>
        </CardHeader>
        <CardContent>
          {vehicles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Vehicle</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">License Plate</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Storage Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicles.map((vehicle) => {
                    return (
                      <tr 
                        key={vehicle.id} 
                        className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => handleVehicleRowClick(vehicle.id)}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            {vehicle.image && (
                              <div className="w-12 h-8 rounded overflow-hidden bg-gray-100 flex-shrink-0">
                                <img 
                                  src={vehicle.image} 
                                  alt={`${vehicle.make} ${vehicle.model}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">
                                {vehicle.year} {vehicle.make} {vehicle.model}
                              </div>
                              {vehicle.color && (
                                <div className="text-sm text-gray-500">{vehicle.color}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm">{vehicle.licensePlate}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{vehicle.storageLocation}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              <Fuel 
                                size={14} 
                                className={`mr-1 ${
                                  vehicle.fuelLevel >= 75 ? 'text-green-600' :
                                  vehicle.fuelLevel >= 50 ? 'text-yellow-600' :
                                  vehicle.fuelLevel >= 25 ? 'text-orange-600' : 'text-red-600'
                                }`} 
                              />
                              <span className="text-xs">{vehicle.fuelLevel}%</span>
                            </div>
                            
                            <Badge 
                              variant={
                                vehicle.batteryType === 'Lithium' ? 'success' :
                                vehicle.batteryType === 'AGM' ? 'warning' : 'default'
                              } 
                              className="text-xs"
                            >
                              {vehicle.batteryType}
                            </Badge>
                            
                            {vehicle.insuranceRiderRequired && (
                              <Shield size={14} className="text-blue-600" />
                            )}
                            
                            {new Date(vehicle.registration.expirationDate) > new Date() ? (
                              <CheckCircle size={14} className="text-green-600" />
                            ) : (
                              <AlertTriangle size={14} className="text-red-600" />
                            )}
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">No vehicles</h3>
              <p className="mt-1 text-sm text-gray-500">
                This customer doesn't have any vehicles stored yet.
              </p>
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  leftIcon={<Plus size={16} />}
                  onClick={handleAddVehicle}
                >
                  Add First Vehicle
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Service Signup Modal */}
      <ServiceSignupModal
        isOpen={showServiceSignup}
        onClose={() => setShowServiceSignup(false)}
        customer={customer}
        onSignatureComplete={handleServiceSignatureComplete}
      />
    </div>
  );
}