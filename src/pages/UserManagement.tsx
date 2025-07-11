import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { getInitials, formatDate } from '../lib/utils';
import { supabase } from '../lib/supabase-client';

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Staff' | 'Viewer';
  avatar?: string | null;
  phone?: string | null;
  department?: string | null;
  last_login?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

type ViewMode = 'grid' | 'list';
type SortField = 'name' | 'email' | 'role' | 'created_at' | 'last_login';
type SortOrder = 'asc' | 'desc';

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    role: 'Staff' as User['role'],
    phone: '',
    department: '',
    is_active: true,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [createStatus, setCreateStatus] = useState<'idle' | 'creating' | 'success' | 'error'>('idle');
  const [createError, setCreateError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('first_name');
      
      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createUserForm.first_name || !createUserForm.last_name || !createUserForm.email || !createUserForm.password) {
      setCreateError('Please fill in all required fields');
      return;
    }

    setCreateStatus('creating');
    setCreateError('');

    try {
      const { data, error } = await supabase
        .from('users')
        .insert([{
          first_name: createUserForm.first_name,
          last_name: createUserForm.last_name,
          email: createUserForm.email,
          password: createUserForm.password, // In production, this should be hashed
          role: createUserForm.role,
          phone: createUserForm.phone || null,
          department: createUserForm.department || null,
          is_active: createUserForm.is_active,
        }])
        .select()
        .single();

      if (error) throw error;

      setUsers(prev => [...prev, data]);
      setCreateStatus('success');
      
      // Reset form
      setCreateUserForm({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        role: 'Staff',
        phone: '',
        department: '',
        is_active: true,
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
      const { error } = await supabase
        .from('users')
        .update({ is_active: !currentStatus })
        .eq('id', userId);

      if (error) throw error;

      setUsers(prev => prev.map(user => 
        user.id === userId ? { ...user, is_active: !currentStatus } : user
      ));
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const filteredAndSortedUsers = React.useMemo(() => {
    let filtered = users.filter(user => {
      const matchesSearch = 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.department && user.department.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && user.is_active) ||
        (statusFilter === 'inactive' && !user.is_active);
      
      return matchesSearch && matchesRole && matchesStatus;
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = `${a.first_name} ${a.last_name}`;
          bValue = `${b.first_name} ${b.last_name}`;
          break;
        case 'email':
          aValue = a.email;
          bValue = b.email;
          break;
        case 'role':
          aValue = a.role;
          bValue = b.role;
          break;
        case 'created_at':
          aValue = new Date(a.created_at).getTime();
          bValue = new Date(b.created_at).getTime();
          break;
        case 'last_login':
          aValue = a.last_login ? new Date(a.last_login).getTime() : 0;
          bValue = b.last_login ? new Date(b.last_login).getTime() : 0;
          break;
        default:
          aValue = `${a.first_name} ${a.last_name}`;
          bValue = `${b.first_name} ${b.last_name}`;
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
  }, [users, searchTerm, roleFilter, statusFilter, sortField, sortOrder]);

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
    const initials = getInitials(user.first_name, user.last_name);
    
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
                {user.first_name} {user.last_name}
              </h3>
              <p className="text-sm text-gray-600 truncate">{user.email}</p>
              
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant={roleColors[user.role]} className="text-xs">
                  {user.role}
                </Badge>
                <Badge variant={user.is_active ? 'success' : 'outline'} className="text-xs">
                  {user.is_active ? 'Active' : 'Inactive'}
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
              <span>{formatDate(user.created_at)}</span>
            </div>
            {user.last_login && (
              <div className="flex items-center text-gray-600">
                <span className="font-medium mr-2">Last Login:</span>
                <span>{formatDate(user.last_login)}</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" leftIcon={<Edit size={14} />}>
              Edit
            </Button>
            <Button 
              variant={user.is_active ? 'outline' : 'primary'} 
              size="sm" 
              onClick={() => toggleUserStatus(user.id, user.is_active)}
              leftIcon={user.is_active ? <XCircle size={14} /> : <CheckCircle size={14} />}
            >
              {user.is_active ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const UserListItem = ({ user }: { user: User }) => {
    const initials = getInitials(user.first_name, user.last_name);
    
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
                {user.first_name} {user.last_name}
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
          <Badge variant={user.is_active ? 'success' : 'outline'} className="text-xs">
            {user.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </td>
        <td className="py-4 px-4">
          <span className="text-sm text-gray-600">
            {user.last_login ? formatDate(user.last_login) : 'Never'}
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
              onClick={() => toggleUserStatus(user.id, user.is_active)}
              leftIcon={user.is_active ? <XCircle size={14} /> : <CheckCircle size={14} />}
            >
              {user.is_active ? 'Deactivate' : 'Activate'}
            </Button>
          </div>
        </td>
      </tr>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

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
              <p className="text-2xl font-bold text-gray-900">{users.length}</p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.is_active).length}
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
                {users.filter(u => u.role === 'Admin').length}
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
                {users.filter(u => u.role === 'Staff').length}
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
            { field: 'created_at' as SortField, label: 'Created' },
            { field: 'last_login' as SortField, label: 'Last Login' },
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
              value={createUserForm.first_name}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, first_name: e.target.value }))}
              placeholder="Enter first name"
              disabled={createStatus === 'creating'}
            />
            <Input
              label="Last Name *"
              value={createUserForm.last_name}
              onChange={(e) => setCreateUserForm(prev => ({ ...prev, last_name: e.target.value }))}
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
                checked={createUserForm.is_active}
                onChange={(e) => setCreateUserForm(prev => ({ ...prev, is_active: e.target.checked }))}
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