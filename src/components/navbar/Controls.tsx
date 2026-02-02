import { Moon, Sun, Globe } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

interface ControlsProps {
  onLanguageToggle: () => void;
}

const LANGUAGE_CYCLE = ['no', 'en', 'ar'] as const;

const Controls = ({ onLanguageToggle }: ControlsProps) => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Check for saved language preference in localStorage
    const savedLang = localStorage.getItem('i18nextLng');

    // If no saved preference, detect from browser settings
    if (!savedLang) {
      const browserLang = navigator.language.toLowerCase();
      let detectedLang = 'en'; // default

      // Detect Norwegian
      if (browserLang.startsWith('no') || browserLang.startsWith('nb') || browserLang.startsWith('nn')) {
        detectedLang = 'no';
      }
      // Detect Arabic
      else if (browserLang.startsWith('ar')) {
        detectedLang = 'ar';
      }

      i18n.changeLanguage(detectedLang);
      // Set direction for RTL languages
      document.documentElement.dir = detectedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = detectedLang;
    } else {
      // Apply saved language direction
      document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = savedLang;
    }
  }, [i18n]);

  const handleLanguageToggle = () => {
    // Cycle through languages: no → en → ar → no
    const currentIndex = LANGUAGE_CYCLE.indexOf(i18n.language as typeof LANGUAGE_CYCLE[number]);
    const nextIndex = (currentIndex + 1) % LANGUAGE_CYCLE.length;
    const newLang = LANGUAGE_CYCLE[nextIndex];

    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);

    // Update direction for RTL
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    onLanguageToggle();
  };

  const getLanguageLabel = () => {
    switch (i18n.language) {
      case 'ar': return 'AR';
      case 'en': return 'EN';
      default: return 'NO';
    }
  };

  return (
    <div className="flex items-center gap-4 rtl-preserve">
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
        pressed={false}
        onPressedChange={handleLanguageToggle}
        className="hover:bg-accent"
      >
        <Globe className="w-5 h-5" />
        <span className="ml-1 text-sm">{getLanguageLabel()}</span>
      </Toggle>
    </div>
  );
};

export default Controls;