import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { useAuth } from '../contexts/AuthContext';
import { users } from '../data/mock-data';

export function Login() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (loginStatus === 'error') {
      setLoginStatus('idle');
      setErrorMessage('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setLoginStatus('error');
      setErrorMessage('Please enter both email and password');
      return;
    }

    setLoginStatus('loading');

    try {
      await signIn(formData.email, formData.password);
      setLoginStatus('success');
      
      // Navigate to dashboard after successful login
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error: any) {
      setLoginStatus('error');
      setErrorMessage(error.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillDemoCredentials = (email: string, password: string) => {
    setFormData({ email, password });
  };

  // Get demo users from mock data
  const demoUsers = users.filter(user => user.isActive).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mb-4">
            <User className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Barrett Automotive</h1>
          <p className="text-gray-600 mt-2">Employee Portal</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Sign In to Your Account</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Status Messages */}
              {loginStatus === 'error' && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                  <span className="text-sm text-red-800">{errorMessage}</span>
                </div>
              )}

              {loginStatus === 'success' && (
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800">Login successful! Redirecting...</span>
                </div>
              )}

              {/* Email Field */}
              <div className="relative">
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Enter your email"
                  disabled={loginStatus === 'loading' || loginStatus === 'success'}
                  className="pl-10"
                />
                <User className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                  disabled={loginStatus === 'loading' || loginStatus === 'success'}
                  className="pl-10 pr-10"
                />
                <Lock className="absolute left-3 top-8 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-8 text-gray-400 hover:text-gray-600"
                  disabled={loginStatus === 'loading' || loginStatus === 'success'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={loginStatus === 'loading'}
                disabled={loginStatus === 'loading' || loginStatus === 'success'}
                leftIcon={loginStatus === 'success' ? <CheckCircle size={16} /> : <LogIn size={16} />}
              >
                {loginStatus === 'loading' ? 'Signing In...' : 
                 loginStatus === 'success' ? 'Success!' : 'Sign In'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 text-center mb-4">Demo Accounts (for testing):</p>
              <div className="space-y-2">
                {demoUsers.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    className="w-full text-left justify-start"
                    onClick={() => fillDemoCredentials(user.email, user.password)}
                    disabled={loginStatus === 'loading' || loginStatus === 'success'}
                  >
                    <div className="flex items-center w-full">
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        user.role === 'Admin' ? 'bg-red-500' :
                        user.role === 'Manager' ? 'bg-yellow-500' :
                        user.role === 'Staff' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="font-medium">{user.firstName} {user.lastName}</span>
                      <span className="ml-auto text-xs text-gray-500">{user.role}</span>
                    </div>
                  </Button>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Click any demo account to auto-fill credentials, then click "Sign In"
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <p className="text-xs text-gray-500">
                Need help? Contact your system administrator
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Secure employee access to Barrett Automotive Group's<br />
            vehicle storage management system
          </p>
        </div>
      </div>
    </div>
  );
}