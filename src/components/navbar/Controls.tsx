import { Moon, Sun, Globe } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

interface ControlsProps {
  isDarkMode: boolean;
  language: 'EN' | 'NO';
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
}

const Controls = ({ isDarkMode, language, onThemeToggle, onLanguageToggle }: ControlsProps) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Set initial language to Norwegian
    i18n.changeLanguage('no');
  }, []);

  const handleLanguageToggle = () => {
    const newLang = i18n.language === 'en' ? 'no' : 'en';
    i18n.changeLanguage(newLang);
    onLanguageToggle();
  };

  return (
    <div className="flex items-center gap-4">
      <Toggle
        aria-label="Toggle theme"
        pressed={isDarkMode}
        onPressedChange={onThemeToggle}
        className="hover:bg-xala-secondary/50"
      >
        {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </Toggle>

      <Toggle
        aria-label="Toggle language"
        pressed={language === 'NO'}
        onPressedChange={handleLanguageToggle}
        className="hover:bg-xala-secondary/50"
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1 text-sm">{language}</span>
      </Toggle>
    </div>
  );
};

export default Controls;