import { Moon, Sun, Globe } from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface ControlsProps {
  onLanguageToggle: () => void;
}

const LANGUAGES = [
  { code: 'no', label: 'Norsk' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
] as const;

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

  const handleLanguageChange = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);

    // Update direction for RTL
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;

    onLanguageToggle();
  };

  const getLanguageLabel = () => {
    const currentLang = LANGUAGES.find(lang => lang.code === i18n.language);
    return currentLang?.label || 'NO';
  };

  const currentLanguage = i18n.language || 'no';

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

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            aria-label="Select language"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-accent transition-colors text-sm font-medium"
          >
            <Globe className="w-5 h-5" />
            <span>{getLanguageLabel()}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuRadioGroup
            value={currentLanguage}
            onValueChange={handleLanguageChange}
          >
            {LANGUAGES.map((language) => (
              <DropdownMenuRadioItem
                key={language.code}
                value={language.code}
                className="cursor-pointer"
              >
                {language.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Controls;