"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  socialLogin: (provider: 'google' | 'github') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for stored user session on mount
    const storedUser = localStorage.getItem('bc_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock logic: if email contains 'admin', set as admin
    const isAdmin = email.includes('admin');
    
    const newUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      isAdmin
    };

    setUser(newUser);
    localStorage.setItem('bc_user', JSON.stringify(newUser));
    setLoading(false);
    
    // Redirect to home for everyone, including admins
    router.push('/');
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const isAdmin = email.includes('admin');
    const newUser = {
      id: '2',
      email,
      name,
      isAdmin
    };
    
    setUser(newUser);
    localStorage.setItem('bc_user', JSON.stringify(newUser));
    setLoading(false);
    router.push('/');
  };

  const logout = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    setUser(null);
    localStorage.removeItem('bc_user');
    setLoading(false);
    router.push('/login');
  };

  const forgotPassword = async (email: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(`Password reset email sent to ${email}`);
    setLoading(false);
  };

  const socialLogin = async (provider: 'google' | 'github') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser = {
      id: '3',
      email: `user@${provider}.com`,
      name: `${provider} User`,
      isAdmin: false
    };
    
    setUser(newUser);
    localStorage.setItem('bc_user', JSON.stringify(newUser));
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, forgotPassword, socialLogin }}>
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
