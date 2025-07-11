import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase-client';
import { User } from '@supabase/supabase-js';

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
    // Check for active session on mount
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Use Supabase's built-in authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.user) {
        throw new Error('Authentication failed');
      }

      // Optionally fetch additional user profile data from your users table
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('email', email)
          .eq('is_active', true)
          .single();

        if (userError || !userData) {
          console.warn('Could not fetch user profile data:', userError);
        } else {
          // Update last login
          await supabase
            .from('users')
            .update({ last_login: new Date().toISOString() })
            .eq('id', userData.id);
        }
      } catch (profileError) {
        console.warn('Error fetching user profile:', profileError);
      }

      setUser(data.user);
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
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
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