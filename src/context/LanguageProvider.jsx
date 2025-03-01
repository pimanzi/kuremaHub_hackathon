import { useLocalStorageState } from '../hooks/useLocaleStorageState';
import i18next from 'i18next';
import { createContext, useEffect } from 'react';

export const LanguageContext =
  createContext <
  Language >
  {
    language: 'en',
    setLanguage: () => {},
  };

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useLocalStorageState('en', 'language');
  useEffect(
    function () {
      i18next.changeLanguage(language);
    },
    [language]
  );
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
