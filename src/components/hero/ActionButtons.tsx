import React from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  onSectionClick: (sectionId: string) => void;
}

const ActionButtons = ({ onSectionClick }: ActionButtonsProps) => {
  const { t } = useTranslation();

  const buttons = [
    {
      name: t('hero.getInTouch'),
      href: 'contact',
      primary: true,
      icon: 'ArrowDown'
    },
    {
      name: t('hero.services'),
      href: 'services',
      primary: false,
      icon: 'ArrowDown'
    },
    {
      name: t('hero.process'),
      href: 'work-process',
      primary: false,
      icon: 'ArrowDown'
    }
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      {buttons.map((button, index) => (
        <Button
          key={button.href}
          onClick={() => onSectionClick(button.href)}
          className={`group px-8 py-6 rounded-lg font-medium transition-all transform hover:scale-105
            ${button.primary 
              ? 'shadow-lg shadow-xala-accent/20 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB] hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5] text-white'
              : 'bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm border border-white/20'
            }`}
        >
          <span className="flex items-center gap-2">
            {button.name}
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ActionButtons;