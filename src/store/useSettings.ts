import { useState, useEffect } from 'react';
import { SiteSettings } from '../types';

const defaultSettings: SiteSettings = {
  logoUrl: '', // Empty means use text logo
  adminPassword: 'admin123', // Default password
};

export function useSettings() {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('amora_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('amora_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings,
  };
}
