import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { currentUser, users } from '../data/mock-data';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const checkStoredSession = () => {
      try {
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          // Verify user still exists in mock data and is active
          const existingUser = users.find(u => u.id === userData.id && u.isActive);
          if (existingUser) {
            setUser(existingUser);
          } else {
            // Clear invalid session
            localStorage.removeItem('auth_user');
          }
        }
      } catch (error) {
        console.error('Error checking stored session:', error);
        localStorage.removeItem('auth_user');
      } finally {
        setLoading(false);
      }
    };

    checkStoredSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user in mock data
      const foundUser = users.find(u => 
        u.email.toLowerCase() === email.toLowerCase() && 
        u.password === password &&
        u.isActive
      );

      if (!foundUser) {
        throw new Error('Invalid email or password');
      }

      // Update last login in mock data (in a real app, this would be persisted)
      foundUser.lastLogin = new Date().toISOString();

      // Store session
      localStorage.setItem('auth_user', JSON.stringify(foundUser));
      setUser(foundUser);
    } catch (error: any) {
      console.error('Error signing in:', error);
      throw new Error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Clear session
      localStorage.removeItem('auth_user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}