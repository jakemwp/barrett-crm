import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  Edit,
  Trash2,
  Shield,
  CheckCircle,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { getInitials, formatDate, generateId } from '../lib/utils';
import { users, addUser, updateUser } from '../data/mock-data';
import { User } from '../types';

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'email' | 'role' | 'createdAt' | 'lastLogin';
type SortOrder = 'asc' | 'desc';

export function UserManagement() {
  const [userList, setUserList] = useState<User[]>(users);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Staff' as User['role'],
    phone: '',
    department: '',
    isActive: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [createStatus, setCreateStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [createError, setCreateError] = useState('');

  const handleCreateUser = async () => {
    if (!createUserForm.firstName || !createUserForm.lastName || !createUserForm.email || !createUserForm.password) {
      setCreateError('Please fill in all required fields');
      return;
    }

    // Check if email already exists
    if (userList.some(user => user.email.toLowerCase() === createUserForm.email.toLowerCase())) {
      setCreateError('A user with this email already exists');
      return;
    }

    setCreateStatus('creating');
    setCreateError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = addUser({
        firstName: createUserForm.firstName,
        lastName: createUserForm.lastName,
        email: createUserForm.email,
        password: createUserForm.password,
        role: createUserForm.role,
        phone: createUserForm.phone || null,
        department: createUserForm.department || null,
        isActive: createUserForm.isActive,
      });

      setUserList(prev => [...prev, newUser]);
      setCreateStatus('success');
      
      // Reset form
      setCreateUserForm({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Staff',
        phone: '',
        department: '',
        isActive: true,
      });

      setTimeout(() => {
        setShowCreateModal(false);
        setCreateStatus('idle');
      }, 1500);
    } catch (error: any) {
      setCreateStatus('error');
      setCreateError(error.message || 'Failed to create user');
    }
  };

  const toggleUserStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const updatedUser = updateUser(userId, { isActive: !currentStatus });
      if (updatedUser) {
        setUserList(prev => prev.map(user => 
          user.id === userId ? updatedUser : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = userList.filter(user => {
      const matchesSearch = 
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && user.isActive) ||
        (statusFilter === 'inactive' && !user.isActive);
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'lastLogin':
          aValue = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
          bValue = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
          break;
        default:
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortOrder === 'asc' 
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

    return filtered;
  }, [userList, searchTerm, roleFilter, statusFilter, sortField, sortOrder]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const roleColors = {
    'Admin': 'error',
    'Manager': 'warning',
    'Staff': 'default',
    'Viewer': 'outline'
  } as const;

  const UserCard = ({ user }: { user: User }) => {
    const initials = getInitials(user.firstName, user.lastName);
    
    return (
      <Card className="h-full hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-4">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <Avatar initials={initials} size="lg" />
            )}
            
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={roleColors[user.role]} className="text-xs">
                  {user.role}
                </Badge>
                <Badge variant={user.isActive ? 'success' : 'outline'} className="text-xs">
                  {user.isActive ? 'Active' : 'Inactive'}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            {user.phone && (
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Phone:</span>
                <span>{user.phone}</span>
              </div>
            )}
            {user.department && (
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Department:</span>
                <span>{user.department}</span>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <span className="font-medium mr-2">Created:</span>
              <span>{formatDate(user.createdAt)}</span>
            </div>
            {user.lastLogin && (
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Last Login:</span>
                <span>{formatDate(user.lastLogin)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </Button>
            <Button 
              variant={user.isActive ? 'outline' : 'primary'} 
              size="sm" 
              onClick={() => toggleUserStatus(user.id, user.isActive)}
              leftIcon={user.isActive ? <XCircle size={14} /> : <CheckCircle size={14} />}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const UserListItem = ({ user }: { user: User }) => {
    const initials = getInitials(user.firstName, user.lastName);
    
    return (
      <tr className="border-b border-gray-100 hover:bg-gray-50">
        <td className="py-4 px-4">
          <div className="flex items-center space-x-3">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <Avatar initials={initials} size="sm" />
            )}
            <div>
              <div className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </div>
              <div className="text-sm text-gray-500">{user.email}</div>
            </div>
          </div>
        </td>
        <td className="py-4 px-4">
          <Badge variant={roleColors[user.role]} className="text-xs">
            {user.role}
          </Badge>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm text-gray-900">{user.department || '-'}</span>
        </td>
        <td className="py-4 px-4">
          <Badge variant={user.isActive ? 'success' : 'outline'} className="text-xs">
            {user.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm text-gray-600">
            {user.lastLogin ? formatDate(user.lastLogin) : 'Never'}
          </span>
        </td>
        <td className="py-4 px-4">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => toggleUserStatus(user.id, user.isActive)}
              leftIcon={user.isActive ? <XCircle size={14} /> : <CheckCircle size={14} />}
            >
              {user.isActive ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center">
            <Users className="mr-3" size={28} />
            User Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage system users and their permissions
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Export
          </Button>
          <Button 
            variant="primary" 
            leftIcon={<Plus size={16} />}
            onClick={() => setShowCreateModal(true)}
          >
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{userList.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {userList.filter(u => u.isActive).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Administrators</p>
              <p className="text-2xl font-bold text-red-600">
                {userList.filter(u => u.role === 'Admin').length}
              </p>
            </div>
            <Shield className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Staff Members</p>
              <p className="text-2xl font-bold text-blue-600">
                {userList.filter(u => u.role === 'Staff').length}
              </p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                placeholder="Search users by name, email, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'Admin', label: 'Administrator' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Staff', label: 'Staff' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
            />
            
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: 'all', label: 'All Status' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
            />
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 size={16} />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'primary' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Sort Controls */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
          <span className="text-sm font-medium text-gray-700 mr-2">Sort by:</span>
          {[
            { field: 'name' as SortField, label: 'Name' },
            { field: 'email' as SortField, label: 'Email' },
            { field: 'role' as SortField, label: 'Role' },
            { field: 'createdAt' as SortField, label: 'Created' },
            { field: 'lastLogin' as SortField, label: 'Last Login' },
          ].map(({ field, label }) => (
            <Button
              key={field}
              variant={sortField === field ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => toggleSort(field)}
              rightIcon={
                sortField === field ? (
                  sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />
                ) : undefined
              }
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {filteredAndSortedUsers.length} User{filteredAndSortedUsers.length !== 1 ? 's' : ''}
          </h2>
          
          {(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearchTerm('');
                setRoleFilter('all');
                setStatusFilter('all');
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredAndSortedUsers.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedUsers.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedUsers.map((user) => (
                    <UserListItem key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Get started by adding your first user.'}
            </p>
            {!(searchTerm || roleFilter !== 'all' || statusFilter !== 'all') && (
              <div className="mt-6">
                <Button 
                  variant="primary" 
                  leftIcon={<Plus size={16} />}
                  onClick={() => setShowCreateModal(true)}
                >
                  Add User
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Create User Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setCreateStatus('idle');
          setCreateError('');
        }}
        title="Create New User"
        size="lg"
      >
        <div className="space-y-6">
          {createStatus === 'error' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <div className="flex items-center space-x-2">
                <XCircle className="h-4 w-4 text-red-600" />
                <span className="text-sm text-red-800">{createError}</span>
              </div>
            </div>
          )}

          {createStatus === 'success' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="text-sm text-green-800">User created successfully!</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              value={createUserForm.firstName}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter first name"
              disabled={createStatus === 'creating'}
            />
            <Input
              label="Last Name *"
              value={createUserForm.lastName}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Enter last name"
              disabled={createStatus === 'creating'}
            />
            <Input
              label="Email *"
              type="email"
              value={createUserForm.email}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Enter email address"
              disabled={createStatus === 'creating'}
            />
            <div className="relative">
              <Input
                label="Password *"
                type={showPassword ? 'text' : 'password'}
                value={createUserForm.password}
                onChange={(e) => setCreateUserForm(prev => ({ ...prev, password: e.target.value }))}
                placeholder="Enter password"
                disabled={createStatus === 'creating'}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                disabled={createStatus === 'creating'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Select
              label="Role *"
              value={createUserForm.role}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, role: e.target.value as User['role'] }))}
              disabled={createStatus === 'creating'}
              options={[
                { value: 'Staff', label: 'Staff' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Admin', label: 'Administrator' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
            />
            <Input
              label="Phone"
              value={createUserForm.phone}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter phone number"
              disabled={createStatus === 'creating'}
            />
            <Input
              label="Department"
              value={createUserForm.department}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, department: e.target.value }))}
              placeholder="Enter department"
              disabled={createStatus === 'creating'}
            />
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={createUserForm.isActive}
                onChange={(e) => setCreateUserForm(prev => ({ ...prev, isActive: e.target.checked }))}
                disabled={createStatus === 'creating'}
                className="checkbox"
              />
              <span className="text-sm font-medium text-gray-700">Active User</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
              disabled={createStatus === 'creating'}
            >
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreateUser}
              isLoading={createStatus === 'creating'}
              leftIcon={<Plus size={16} />}
            >
              {createStatus === 'creating' ? 'Creating...' : 'Create User'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}