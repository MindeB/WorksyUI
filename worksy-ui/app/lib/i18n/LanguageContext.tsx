"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Locale, translations } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: typeof translations.en;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  // Load saved language preference on mount
  useEffect(() => {
    // Check cookie first (for consistency with server)
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] as Locale;

    if (cookieLocale && (cookieLocale === 'en' || cookieLocale === 'lt')) {
      setLocaleState(cookieLocale);
      localStorage.setItem('locale', cookieLocale);
    } else {
      // Fallback to localStorage
      const savedLocale = localStorage.getItem('locale') as Locale;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'lt')) {
        setLocaleState(savedLocale);
        document.cookie = `locale=${savedLocale}; path=/; max-age=31536000`;
      }
    }
  }, []);

  // Save language preference when it changes
  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem('locale', newLocale);
    // Also save to cookie for server-side access
    document.cookie = `locale=${newLocale}; path=/; max-age=31536000`; // 1 year
    // Refresh the page to re-render server components with new language
    window.location.reload();
  };

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}
