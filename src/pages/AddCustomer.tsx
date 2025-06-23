import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  X, 
  User, 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  DollarSign, 
  Key, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Users
} from 'lucide-react';
import { addCustomer } from '../data/mock-data';
import { Customer } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export function AddCustomer() {
  const navigate = useNavigate();
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    type: 'Individual' as Customer['type'],
    membershipLevel: 'Basic' as Customer['membershipLevel'],
    storageLocation: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    storageSpots: 1,
    showPandaDocForm: false,
    password: '',
    manualPrice: 0,
  });

  const handleInputChange = (field: string, value: string | number | boolean) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    
    if (!formData.storageLocation.trim()) {
      newErrors.storageLocation = 'Storage location is required';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    
    if (formData.storageSpots < 1) {
      newErrors.storageSpots = 'Storage spots must be at least 1';
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
      
      const newCustomer = addCustomer({
        ...formData,
        dateCreated: new Date().toISOString().split('T')[0],
        numRows: 1, // Default value since field is removed from UI
      });
      
      setSaveStatus('success');
      
      // Navigate to the new customer's detail page after a short delay
      setTimeout(() => {
        navigate(`/customers/${newCustomer.id}`);
      }, 1500);
      
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    navigate('/customers');
  };

  // Auto-generate storage location based on type and membership
  React.useEffect(() => {
    if (formData.type && formData.membershipLevel) {
      const buildingMap = {
        'Individual': 'A',
        'Business': 'B',
        'Corporate': 'C',
      };
      
      const sectionMap = {
        'Basic': '1',
        'Premium': '2',
        'VIP': '3',
        'Enterprise': '4',
      };
      
      const building = buildingMap[formData.type];
      const section = sectionMap[formData.membershipLevel];
      
      if (building && section) {
        setFormData(prev => ({
          ...prev,
          storageLocation: `Building ${building} - Section ${section}`,
        }));
      }
    }
  }, [formData.type, formData.membershipLevel]);

  // Auto-generate password
  React.useEffect(() => {
    if (formData.firstName && formData.lastName && !formData.password) {
      const password = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}123`;
      setFormData(prev => ({
        ...prev,
        password,
      }));
    }
  }, [formData.firstName, formData.lastName]);

  // Auto-set pricing based on membership level
  React.useEffect(() => {
    const pricingMap = {
      'Basic': 75,
      'Premium': 150,
      'VIP': 200,
      'Enterprise': 300,
    };
    
    const basePrice = pricingMap[formData.membershipLevel];
    const totalPrice = basePrice * formData.storageSpots;
    
    setFormData(prev => ({
      ...prev,
      manualPrice: totalPrice,
    }));
  }, [formData.membershipLevel, formData.storageSpots]);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Users className="mr-3" size={28} />
              Add Customer
            </h1>
            <p className="text-gray-600 mt-1">
              Create a new customer account with storage information
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-600 mr-4">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm">Customer created successfully!</span>
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
            {saveStatus === 'saving' ? 'Creating Customer...' : 'Create Customer'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Information Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name *"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    error={errors.firstName}
                    placeholder="Enter first name"
                  />
                  <Input
                    label="Last Name *"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    error={errors.lastName}
                    placeholder="Enter last name"
                  />
                  <Select
                    label="Customer Type *"
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value as Customer['type'])}
                    options={[
                      { value: 'Individual', label: 'Individual' },
                      { value: 'Business', label: 'Business' },
                      { value: 'Corporate', label: 'Corporate' },
                    ]}
                  />
                  <Select
                    label="Membership Level *"
                    value={formData.membershipLevel}
                    onChange={(e) => handleInputChange('membershipLevel', e.target.value as Customer['membershipLevel'])}
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
                    label="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    placeholder="customer@example.com"
                  />
                  <Input
                    label="Phone Number *"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    error={errors.phone}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                <div className="space-y-4">
                  <Input
                    label="Street Address *"
                    value={formData.streetAddress}
                    onChange={(e) => handleInputChange('streetAddress', e.target.value)}
                    error={errors.streetAddress}
                    placeholder="123 Main Street"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="City *"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      error={errors.city}
                      placeholder="City"
                    />
                    <Input
                      label="State *"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      error={errors.state}
                      placeholder="State"
                    />
                    <Input
                      label="ZIP Code *"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      error={errors.zipCode}
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              {/* Storage Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Storage Location *"
                    value={formData.storageLocation}
                    onChange={(e) => handleInputChange('storageLocation', e.target.value)}
                    error={errors.storageLocation}
                    placeholder="Building A - Section 1"
                    helperText="Auto-generated based on type and membership"
                  />
                  <Input
                    label="Storage Spots *"
                    type="number"
                    min="1"
                    value={formData.storageSpots}
                    onChange={(e) => handleInputChange('storageSpots', parseInt(e.target.value) || 1)}
                    error={errors.storageSpots}
                  />
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Password *"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={errors.password}
                    placeholder="Enter password"
                    helperText="Auto-generated based on name"
                  />
                  <Input
                    label="Monthly Price"
                    type="number"
                    step="0.01"
                    value={formData.manualPrice}
                    onChange={(e) => handleInputChange('manualPrice', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                    helperText="Auto-calculated based on membership"
                  />
                </div>

                <div className="mt-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.showPandaDocForm}
                      onChange={(e) => handleInputChange('showPandaDocForm', e.target.checked)}
                      className="checkbox"
                    />
                    <span className="text-sm font-medium text-gray-700">Show PandaDoc Form</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Preview & Pricing */}
        <div className="space-y-6">
          {/* Customer Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Preview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center font-medium text-xl mx-auto mb-3">
                  {formData.firstName.charAt(0)}{formData.lastName.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {formData.firstName || 'First'} {formData.lastName || 'Last'}
                </h3>
                <p className="text-sm text-gray-600">{formData.email || 'email@example.com'}</p>
                <div className="flex justify-center space-x-2 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {formData.type}
                  </Badge>
                  <Badge variant="default" className="text-xs">
                    {formData.membershipLevel}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2" size={16} />
                Pricing Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Membership Level</span>
                <Badge variant="default" className="text-xs">
                  {formData.membershipLevel}
                </Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Storage Spots</span>
                <span className="font-semibold">{formData.storageSpots}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Base Price per Spot</span>
                <span className="font-semibold">
                  ${(formData.manualPrice / formData.storageSpots || 0).toFixed(2)}
                </span>
              </div>
              
              <div className="pt-3 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">Total Monthly Price</span>
                  <span className="font-bold text-lg text-primary-600">
                    ${formData.manualPrice.toFixed(2)}
                  </span>
                </div>
              </div>
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
                <span className="text-sm text-gray-600">Storage Spots</span>
                <span className="font-semibold">{formData.storageSpots}</span>
              </div>
            </CardContent>
          </Card>

          {/* PandaDoc Form Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" size={16} />
                PandaDoc Form
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="mr-2 text-primary-600" size={16} />
                  <span className="text-sm text-gray-600">Form Status</span>
                </div>
                <Badge variant={formData.showPandaDocForm ? 'success' : 'outline'}>
                  {formData.showPandaDocForm ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Contact Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{formData.email || 'No email provided'}</span>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-2 text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{formData.phone || 'No phone provided'}</span>
              </div>
              
              <div className="flex items-start">
                <MapPin className="mr-2 text-gray-400 mt-0.5" size={16} />
                <div className="text-sm text-gray-600">
                  {formData.streetAddress && (
                    <>
                      <div>{formData.streetAddress}</div>
                      <div>
                        {formData.city}{formData.city && formData.state && ', '}{formData.state} {formData.zipCode}
                      </div>
                    </>
                  )}
                  {!formData.streetAddress && 'No address provided'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}