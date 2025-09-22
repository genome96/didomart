import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';
import { User, LoginCredentials, RegisterData } from '@/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isEditor: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const token = Cookies.get('token');
      const storedUser = Cookies.get('user');

      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
        
        // Verify token is still valid
        try {
          const response = await api.get('/auth/me');
          setUser(response.data.data);
        } catch (error) {
          // Token is invalid, clear auth state
          logout();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { token, user: userData } = response.data;

      // Store auth data
      Cookies.set('token', token, { expires: 30 }); // 30 days
      Cookies.set('user', JSON.stringify(userData), { expires: 30 });
      
      setUser(userData);
      
      toast.success('Login successful!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return false;
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      const response = await api.post('/auth/register', data);
      const { token, user: userData } = response.data;

      // Store auth data
      Cookies.set('token', token, { expires: 30 });
      Cookies.set('user', JSON.stringify(userData), { expires: 30 });
      
      setUser(userData);
      
      toast.success('Registration successful!');
      return true;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return false;
    }
  };

  const logout = () => {
    // Clear auth data
    Cookies.remove('token');
    Cookies.remove('user');
    setUser(null);
    
    // Redirect to home if on admin pages
    if (router.pathname.startsWith('/admin')) {
      router.push('/');
    }
    
    toast.success('Logged out successfully');
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isEditor = user?.role === 'editor' || isAdmin;

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
    isEditor,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
