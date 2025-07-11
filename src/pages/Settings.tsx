import React, { useState, useRef } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Save, 
  Edit, 
  X, 
  Camera, 
  Upload, 
  Eye, 
  EyeOff,
  Shield,
  Bell,
  Globe,
  Palette,
  Database,
  Key,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { currentUser, updateUser } from '../data/mock-data';
import { User as UserType } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/TextArea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { formatDate, formatDateTime, getInitials } from '../lib/utils';

export function Settings() {
  const [user, setUser] = useState<UserType>(currentUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserType>(currentUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: keyof UserType, value: string | boolean) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    
    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    
    setPasswordError('');
    return true;
  };

  const handleSave = async () => {
    setSaveStatus('saving');
    
    try {
      let updatedData = { ...formData };
      
      // Handle password update if provided
      if (newPassword) {
        if (!handlePasswordChange()) {
          setSaveStatus('error');
          return;
        }
        updatedData.password = newPassword;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = updateUser(user.id, updatedData);
      if (updatedUser) {
        setUser(updatedUser);
        setFormData(updatedUser);
        setIsEditing(false);
        setNewPassword('');
        setConfirmPassword('');
        setPasswordError('');
        setSaveStatus('success');
        
        // Reset success status after 3 seconds
        setTimeout(() => setSaveStatus('idle'), 3000);
      } else {
        setSaveStatus('error');
      }
    } catch (error) {
      setSaveStatus('error');
    }
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    setNewPassword('');
    setConfirmPassword('');
    setPasswordError('');
    setSaveStatus('idle');
  };

  const handleAvatarUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to a server
      // For now, we'll just create a local URL
      const imageUrl = URL.createObjectURL(file);
      handleInputChange('avatar', imageUrl);
    }
  };

  const roleColors = {
    'Admin': 'error',
    'Manager': 'warning',
    'Staff': 'default',
    'Viewer': 'outline',
    'Archived': 'outline'
  } as const;

  const initials = getInitials(user.firstName, user.lastName);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <SettingsIcon className="mr-3" size={28} />
            Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {saveStatus === 'success' && (
            <div className="flex items-center text-green-600 mr-4">
              <CheckCircle size={16} className="mr-1" />
              <span className="text-sm">Settings saved successfully</span>
            </div>
          )}
          
          {saveStatus === 'error' && (
            <div className="flex items-center text-red-600 mr-4">
              <AlertCircle size={16} className="mr-1" />
              <span className="text-sm">Failed to save settings</span>
            </div>
          )}
          
          {isEditing ? (
            <>
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
                {saveStatus === 'saving' ? 'Saving...' : 'Save Changes'}
              </Button>
            </>
          ) : (
            <Button 
              variant="primary" 
              onClick={() => setIsEditing(true)} 
              leftIcon={<Edit size={16} />}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2" size={20} />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  {formData.avatar ? (
                    <img 
                      src={formData.avatar} 
                      alt="Profile" 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                  ) : (
                    <Avatar initials={initials} size="lg" className="w-20 h-20 text-xl" />
                  )}
                  
                  {isEditing && (
                    <button
                      onClick={handleAvatarUpload}
                      className="absolute -bottom-2 -right-2 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 transition-colors shadow-lg"
                    >
                      <Camera size={16} />
                    </button>
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant={roleColors[user.role]} className="text-xs">
                      {user.role}
                    </Badge>
                    <Badge variant={user.isActive ? 'success' : 'error'} className="text-xs">
                      {user.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                </div>
                
                {isEditing && (
                  <div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAvatarUpload}
                      leftIcon={<Upload size={14} />}
                    >
                      Upload Photo
                    </Button>
                  </div>
                )}
              </div>

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

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
                  <Input
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Phone Number"
                    value={formData.phone || ''}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Input
                    label="Department"
                    value={formData.department || ''}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    disabled={!isEditing}
                  />
                  <Select
                    label="Role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value as UserType['role'])}
                    disabled={!isEditing}
                    options={[
                      { value: 'Admin', label: 'Administrator' },
                      { value: 'Manager', label: 'Manager' },
                      { value: 'Staff', label: 'Staff Member' },
                      { value: 'Viewer', label: 'Viewer' },
                    ]}
                  />
                </div>
              </div>

              {/* Password Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Password & Security</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      label="Current Password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      disabled={true}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {isEditing && (
                    <>
                      <div className="relative">
                        <Input
                          label="New Password (optional)"
                          type={showNewPassword ? 'text' : 'password'}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="pr-10"
                          helperText="Leave blank to keep current password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                        >
                          {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      
                      {newPassword && (
                        <div className="relative">
                          <Input
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="pr-10"
                            error={passwordError}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Account Status */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h3>
                <div className="space-y-4">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      disabled={!isEditing}
                      className="checkbox"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-700">Active Account</span>
                      <p className="text-xs text-gray-500">Enable or disable this user account</p>
                    </div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Summary & Quick Info */}
        <div className="space-y-6">
          {/* Account Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="mr-2 text-primary-600" size={16} />
                  <span className="text-sm text-gray-600">User ID</span>
                </div>
                <span className="font-mono text-xs text-gray-900">{user.id}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className="mr-2 text-secondary-600" size={16} />
                  <span className="text-sm text-gray-600">Role</span>
                </div>
                <Badge variant={roleColors[user.role]} className="text-xs">
                  {user.role}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building className="mr-2 text-warning-600" size={16} />
                  <span className="text-sm text-gray-600">Department</span>
                </div>
                <span className="font-semibold text-sm">{user.department || 'Not set'}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Member Since</span>
                </div>
                <span className="font-semibold text-sm">{formatDate(user.createdAt)}</span>
              </div>
              
              {user.lastLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="mr-2 text-gray-400" size={16} />
                    <span className="text-sm text-gray-600">Last Login</span>
                  </div>
                  <span className="font-semibold text-sm">{formatDateTime(user.lastLogin)}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center">
                <Mail className="mr-2 text-gray-400" size={16} />
                <span className="text-sm text-gray-600">{user.email}</span>
              </div>
              
              {user.phone && (
                <div className="flex items-center">
                  <Phone className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">{user.phone}</span>
                </div>
              )}
              
              {user.department && (
                <div className="flex items-center">
                  <Building className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">{user.department}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* System Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>System Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Notifications</span>
                </div>
                <Badge variant="success" className="text-xs">
                  Enabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Globe className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Language</span>
                </div>
                <span className="text-sm font-medium">English (US)</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Palette className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Theme</span>
                </div>
                <span className="text-sm font-medium">Light</span>
              </div>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Key className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Two-Factor Auth</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  Disabled
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Database className="mr-2 text-gray-400" size={16} />
                  <span className="text-sm text-gray-600">Data Export</span>
                </div>
                <Button variant="ghost" size="sm">
                  Request
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}