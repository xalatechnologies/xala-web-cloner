import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useTranslation } from 'react-i18next';

interface ActionButtonsProps {
  onSectionClick: (sectionId: string) => void;
}

const ActionButtons = ({ onSectionClick }: ActionButtonsProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
      <Button
        onClick={() => onSectionClick('contact')}
        className="group px-8 py-6 rounded-lg font-medium 
                 transition-all transform hover:scale-105
                 shadow-lg shadow-xala-accent/20
                 bg-gradient-to-r from-[#9b87f5] via-[#8B5CF6] to-[#7E69AB]
                 hover:from-[#8B5CF6] hover:via-[#7E69AB] hover:to-[#9b87f5]
                 text-white"
      >
        {t('hero.getInTouch')}
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
      <Button
        onClick={() => onSectionClick('work-process')}
        variant="outline"
        className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                 hover:bg-white/10 transition-all backdrop-blur-sm
                 border border-white/20"
      >
        {t('hero.ourProcess')}
        <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Button>
      <Button
        onClick={() => onSectionClick('about')}
        variant="outline"
        className="group px-8 py-6 bg-white/5 text-white rounded-lg font-medium 
                 hover:bg-white/10 transition-all backdrop-blur-sm
                 border border-white/20"
      >
        {t('hero.aboutUs')}
        <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </Button>
    </div>
  );
};

export default ActionButtons;