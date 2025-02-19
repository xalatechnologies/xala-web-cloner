import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Language } from '../components/seo/seoContent';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentLanguage = useCallback((): Language => {
    return i18n.language as Language;
  }, [i18n.language]);

  const switchLanguage = useCallback((newLanguage: Language) => {
    const currentPath = location.pathname;
    const currentLang = getCurrentLanguage();
    
    // Remove current language prefix if it exists
    let newPath = currentPath.replace(`/${currentLang}`, '');
    
    // Add new language prefix (except for default language on home page)
    if (newLanguage !== 'en' || newPath !== '/') {
      newPath = `/${newLanguage}${newPath}`;
    }
    
    // Change language in i18n
    i18n.changeLanguage(newLanguage);
    
    // Update URL
    navigate(newPath);
    
    // Update HTML lang attribute
    document.documentElement.lang = newLanguage;
    
    // Store preference
    localStorage.setItem('preferredLanguage', newLanguage);
    
  }, [i18n, location.pathname, navigate]);

  const getLanguageFromPath = useCallback((path: string): Language => {
    const match = path.match(/^\/(no|en)/);
    return (match ? match[1] : 'en') as Language;
  }, []);

  const getPathWithoutLanguage = useCallback((path: string): string => {
    return path.replace(/^\/(no|en)/, '') || '/';
  }, []);

  return {
    currentLanguage: getCurrentLanguage(),
    switchLanguage,
    getLanguageFromPath,
    getPathWithoutLanguage
  };
};

export default useLanguage;
