import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Shield, 
  Mail, 
  Phone, 
  Calendar,
  CheckCircle,
  XCircle,
  Crown
} from 'lucide-react';
import { users, addUser, updateUser, deleteUser } from '../data/mock-data';
import { User } from '../types';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Modal } from '../components/ui/Modal';
import { formatDate, getInitials } from '../lib/utils';

export function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<User | null>(null);

  const [newUser, setNewUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'Staff' as User['role'],
    phone: '',
    department: '',
    isActive: true,
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = async () => {
    try {
      const user = addUser(newUser);
      setShowAddModal(false);
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: 'Staff',
        phone: '',
        department: '',
        isActive: true,
      });
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    
    try {
      updateUser(editingUser.id, editingUser);
      setEditingUser(null);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  const handleDeleteUser = async (user: User) => {
    try {
      deleteUser(user.id);
      setDeleteConfirm(null);
      // Show success message
    } catch (error) {
      // Show error message
    }
  };

  const roleColors = {
    'Admin': 'error',
    'Manager': 'warning',
    'Staff': 'default',
    'Viewer': 'outline',
  } as const;

  const roleStats = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
        
        <Button 
          variant="primary" 
          leftIcon={<Plus size={16} />}
          onClick={() => setShowAddModal(true)}
        >
          Add User
        </Button>
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
              <p className="text-sm font-medium text-gray-500">Administrators</p>
              <p className="text-2xl font-bold text-red-600">{roleStats.Admin || 0}</p>
            </div>
            <Crown className="h-8 w-8 text-red-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold text-green-600">
                {users.filter(u => u.isActive).length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Staff Members</p>
              <p className="text-2xl font-bold text-blue-600">{roleStats.Staff || 0}</p>
            </div>
            <Shield className="h-8 w-8 text-blue-600" />
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
          </div>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {filteredUsers.length} User{filteredUsers.length !== 1 ? 's' : ''}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length > 0 ? (
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
                  {filteredUsers.map((user) => {
                    const initials = getInitials(user.firstName, user.lastName);
                    
                    return (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                              <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant={roleColors[user.role]} className="text-xs">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-900">
                            {user.department || 'Not assigned'}
                          </span>
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
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              leftIcon={<Edit size={14} />}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteConfirm(user)}
                              leftIcon={<Trash2 size={14} />}
                              className="text-red-600 hover:text-red-700"
                            >
                              Delete
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
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || roleFilter !== 'all' || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Get started by adding your first user.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        size="lg"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name *"
              value={newUser.firstName}
              onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
              placeholder="Enter first name"
            />
            <Input
              label="Last Name *"
              value={newUser.lastName}
              onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
              placeholder="Enter last name"
            />
            <Input
              label="Email Address *"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              placeholder="user@example.com"
            />
            <Input
              label="Password *"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
              placeholder="Enter password"
            />
            <Input
              label="Phone Number"
              value={newUser.phone}
              onChange={(e) => setNewUser(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="(555) 123-4567"
            />
            <Input
              label="Department"
              value={newUser.department}
              onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
              placeholder="Enter department"
            />
            <Select
              label="Role *"
              value={newUser.role}
              onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as User['role'] }))}
              options={[
                { value: 'Staff', label: 'Staff Member' },
                { value: 'Manager', label: 'Manager' },
                { value: 'Admin', label: 'Administrator' },
                { value: 'Viewer', label: 'Viewer' },
              ]}
            />
            <div className="flex items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newUser.isActive}
                  onChange={(e) => setNewUser(prev => ({ ...prev, isActive: e.target.checked }))}
                  className="checkbox"
                />
                <span className="text-sm font-medium text-gray-700">Active User</span>
              </label>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={handleAddUser}
              disabled={!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.password}
            >
              Add User
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title="Edit User"
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name *"
                value={editingUser.firstName}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, firstName: e.target.value } : null)}
              />
              <Input
                label="Last Name *"
                value={editingUser.lastName}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, lastName: e.target.value } : null)}
              />
              <Input
                label="Email Address *"
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, email: e.target.value } : null)}
              />
              <Input
                label="Phone Number"
                value={editingUser.phone || ''}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, phone: e.target.value } : null)}
              />
              <Input
                label="Department"
                value={editingUser.department || ''}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, department: e.target.value } : null)}
              />
              <Select
                label="Role *"
                value={editingUser.role}
                onChange={(e) => setEditingUser(prev => prev ? { ...prev, role: e.target.value as User['role'] } : null)}
                options={[
                  { value: 'Staff', label: 'Staff Member' },
                  { value: 'Manager', label: 'Manager' },
                  { value: 'Admin', label: 'Administrator' },
                  { value: 'Viewer', label: 'Viewer' },
                ]}
              />
              <div className="flex items-center">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editingUser.isActive}
                    onChange={(e) => setEditingUser(prev => prev ? { ...prev, isActive: e.target.checked } : null)}
                    className="checkbox"
                  />
                  <span className="text-sm font-medium text-gray-700">Active User</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setEditingUser(null)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleUpdateUser}>
                Update User
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Modal
          isOpen={!!deleteConfirm}
          onClose={() => setDeleteConfirm(null)}
          title="Delete User"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete <strong>{deleteConfirm.firstName} {deleteConfirm.lastName}</strong>? 
              This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button 
                variant="danger" 
                onClick={() => handleDeleteUser(deleteConfirm)}
                leftIcon={<Trash2 size={16} />}
              >
                Delete User
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}