import { Moon, Sun, Globe } from 'lucide-react';
import { Toggle } from '../ui/toggle';

interface ControlsProps {
  isDarkMode: boolean;
  language: 'EN' | 'NO';
  onThemeToggle: () => void;
  onLanguageToggle: () => void;
}

const Controls = ({ isDarkMode, language, onThemeToggle, onLanguageToggle }: ControlsProps) => (
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
      onPressedChange={onLanguageToggle}
      className="hover:bg-xala-secondary/50"
    >
      <Globe className="w-5 h-5" />
      <span className="ml-1 text-sm">{language}</span>
    </Toggle>
  </div>
);

export default Controls;