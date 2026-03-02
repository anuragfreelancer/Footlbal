// src/contexts/LanguageContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import localizationStrings from './Localization';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('English');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('Lng');
        if (storedLanguage) {
          setLanguage(storedLanguage);
          localizationStrings.setLanguage(storedLanguage);
        }
      } catch (e) {}
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (newLanguage) => {
    setLanguage(newLanguage);
    localizationStrings.setLanguage(newLanguage);
    try {
      await AsyncStorage.setItem('Lng', newLanguage);
    } catch (e) {}
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

/** Use in any component that uses localizationStrings so it re-renders when language changes. */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export default LanguageContext;
