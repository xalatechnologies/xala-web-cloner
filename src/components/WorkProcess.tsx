import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";
import * as Icons from "lucide-react";
import { LucideIcon, ArrowRight, ArrowDown } from "lucide-react";
import workProcessData from "@/data/work-process.json";

type Language = 'no' | 'en' | 'ar';

interface WorkProcessItem {
  id: string;
  step_number: number;
  title: string;
  description: string;
  icon: string;
}

const WorkProcess = () => {
  const { t, i18n } = useTranslation();
  const { data: section } = useSection('work-process');

  // Normalize language
  const lang = i18n.language?.toLowerCase() as Language;
  const currentLanguage: Language = lang === 'ar' ? 'ar' : (lang === 'en' ? 'en' : 'no');

  // Get work processes from JSON
  const processes = workProcessData[currentLanguage] || workProcessData.no;

  const getIconComponent = (iconName: string): LucideIcon => {
    const IconComponent = Icons[iconName as keyof typeof Icons] as LucideIcon;
    return IconComponent || Icons.HelpCircle;
  };

  const renderProcessCard = (process: WorkProcessItem, index: number, totalProcesses: number) => {
    const Icon = getIconComponent(process.icon);

    return (
      <div key={process.id} className="relative group">
        <div
          className="relative h-full opacity-0 animate-[fade-in_0.5s_ease-out_forwards]"
        >
          <div className="h-full relative p-6 md:p-8 rounded-2xl bg-card text-card-foreground border border-border backdrop-blur-sm 
                        hover:border-primary/50 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]
                        group-hover:shadow-2xl group-hover:shadow-primary/20">
            <div className="absolute -top-4 -right-4 w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center
                          transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-primary-foreground font-bold text-sm md:text-base">{String(process.step_number).padStart(2, '0')}</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mb-4">
              <div className="text-primary relative">
                <div className="absolute inset-0 bg-primary/20 filter blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 md:w-8 md:h-8" />
                </div>
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-primary">{process.title}</h3>
            </div>

            <p className="text-sm md:text-base text-muted-foreground">{process.description}</p>
          </div>
        </div>

        {/* Add arrow based on screen size and position */}
        {index < totalProcesses - 1 && (process.step_number === 3 ? (
          <div className="flex flex-col items-center md:hidden py-4 text-primary">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <ArrowDown className="w-6 h-6 animate-float" />
              </div>
            </div>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
          </div>
        ) : process.step_number !== 3 && (
          <>
            {/* Down arrow for mobile */}
            <div className="flex flex-col items-center md:hidden py-4 text-primary">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <ArrowDown className="w-6 h-6 animate-float" />
                </div>
              </div>
              <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"></div>
            </div>

            {/* Right arrow for desktop */}
            <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2">
              <div className="relative px-3">
                <div className="absolute inset-0 bg-primary/20 blur-lg transform scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative">
                  <ArrowRight className="w-6 h-6 text-primary animate-pulse-slow" />
                </div>
                <div className="absolute top-1/2 right-0 h-px w-8 bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2"></div>
              </div>
            </div>
          </>
        ))}
      </div>
    );
  };

  return (
    // All three gradient stops referenced undefined xala-* colours, so this
    // section rendered with no background at all — leaving its purple/cyan glow
    // blobs floating on the page background. Restored as a dark section using
    // the same slate gradient NorchainSection already uses.
    <section id="work-process" className="py-12 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 md:w-64 h-48 md:h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-float-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 md:w-64 h-48 md:h-64 bg-primary/30 rounded-full filter blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/30 rounded-full filter blur-3xl animate-float-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12 md:mb-20 animate-fade-in">
          {/* Explicit light text: the section is dark in both colour schemes,
              so text-foreground would be unreadable in light mode. */}
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            {section?.title || t('workProcess.title', 'What is our job?')}
          </h2>
          {(section?.description ?? t('workProcess.description', '')) && (
            <p className="text-slate-300 max-w-2xl mx-auto text-base md:text-lg px-4">
              {section?.description || t('workProcess.description', '')}
            </p>
          )}
        </div>

        {/* Mobile view: Single column */}
        <div className="md:hidden space-y-8">
          {processes.map((process, index) => renderProcessCard(process, index, processes.length))}
        </div>

        {/* Desktop view: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {processes.map((process, index) => renderProcessCard(process, index, processes.length))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;
