"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FeatureFlags {
  showAcademy: boolean;
}

interface FeatureFlagsContextType {
  flags: FeatureFlags;
  toggleFlag: (key: keyof FeatureFlags) => void;
}

const defaultFlags: FeatureFlags = {
  showAcademy: true,
};

const FeatureFlagsContext = createContext<FeatureFlagsContextType | undefined>(undefined);

export function FeatureFlagProvider({ children }: { children: React.ReactNode }) {
  const [flags, setFlags] = useState<FeatureFlags>(defaultFlags);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('bc_feature_flags');
    if (stored) {
      try {
        setFlags({ ...defaultFlags, ...JSON.parse(stored) });
      } catch (e) {
        console.error("Failed to parse feature flags", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleFlag = (key: keyof FeatureFlags) => {
    setFlags(prev => {
      const newFlags = { ...prev, [key]: !prev[key] };
      localStorage.setItem('bc_feature_flags', JSON.stringify(newFlags));
      return newFlags;
    });
  };

  return (
    <FeatureFlagsContext.Provider value={{ flags, toggleFlag }}>
      {children}
    </FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags() {
  const context = useContext(FeatureFlagsContext);
  if (context === undefined) {
    throw new Error('useFeatureFlags must be used within a FeatureFlagProvider');
  }
  return context;
}
