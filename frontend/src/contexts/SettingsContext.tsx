import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@/lib/api';

interface Settings {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  businessHours: string;
  socialMedia: {
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
  shippingInfo: string;
  returnPolicy: string;
  currency: string;
  taxRate: number;
  maintenanceMode: boolean;
}

interface SettingsContextType {
  settings: Settings | null;
  loading: boolean;
  refreshSettings: () => Promise<void>;
}

const defaultSettings: Settings = {
  siteName: 'Your Business',
  siteDescription: 'Your one-stop shop for quality products',
  contactEmail: 'contact@dido.com',
  contactPhone: '+1 (555) 123-4567',
  contactAddress: '123 Business St, City, State 12345',
  businessHours: 'Mon-Fri: 9AM-6PM, Sat: 10AM-4PM, Sun: Closed',
  socialMedia: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  },
  shippingInfo: 'Free shipping on orders over KSh 5,000',
  returnPolicy: '30-day return policy on all items',
  currency: 'KES',
  taxRate: 8.5,
  maintenanceMode: false,
};

const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  loading: true,
  refreshSettings: async () => {},
});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: React.ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);

  const loadSettings = async () => {
    try {
      const response = await api.get('/settings');
      if (response.data.success) {
        setSettings(response.data.data);
      } else {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error loading settings:', error);
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  };

  const refreshSettings = async () => {
    await loadSettings();
  };

  useEffect(() => {
    loadSettings();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};