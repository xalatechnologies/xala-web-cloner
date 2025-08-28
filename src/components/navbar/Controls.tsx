import { Moon, Sun, Globe } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ControlsProps {
  isDarkMode: boolean;
  language: 'EN' | 'NO';
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
}

const Controls = ({ isDarkMode, language, onThemeToggle, onLanguageToggle }: ControlsProps) => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

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
        pressed={theme === 'dark'}
        onPressedChange={(pressed) => setTheme(pressed ? 'dark' : 'light')}
        className="hover:bg-accent"
      >
        {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </Toggle>

      <Toggle
        aria-label="Toggle language"
        pressed={i18n.language === 'no'}
        onPressedChange={handleLanguageToggle}
        className="hover:bg-accent"
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1 text-sm">{i18n.language === 'en' ? 'EN' : 'NO'}</span>
      </Toggle>
    </div>
  );
};

export default Controls;