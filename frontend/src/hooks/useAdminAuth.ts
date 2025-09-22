import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export const useAdminAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const adminAuth = localStorage.getItem('adminAuth');
      const adminToken = localStorage.getItem('adminToken');
      
      if (adminAuth === 'true' && adminToken) {
        // Validate token with backend
        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
          const response = await axios.get(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${adminToken}`
            }
          });
          
          if (response.data.success && response.data.data.role === 'admin') {
            setIsAuthenticated(true);
            setUser(response.data.data);
          } else {
            // Invalid token or not admin
            logout();
          }
        } catch (error) {
          console.error('Auth validation failed:', error);
          // Token invalid, clear auth
          logout();
        }
      } else {
        if (router.pathname.startsWith('/admin') && router.pathname !== '/admin') {
          router.push('/admin');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setUser(null);
    if (router.pathname.startsWith('/admin')) {
      router.push('/admin');
    }
  };

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  return {
    isAuthenticated,
    loading,
    user,
    logout,
    getAuthHeaders
  };
};
