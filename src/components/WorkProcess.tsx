import { PhoneCall, Palette, Code2, TestTube2, Rocket, HeartHandshake } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";

const WorkProcess = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('work-process');

  const processes = [
    {
      icon: <PhoneCall className="w-8 h-8" />,
      title: t('workProcess.discovery.title'),
      description: t('workProcess.discovery.description'),
      step: "01",
      delay: "0"
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: t('workProcess.design.title'),
      description: t('workProcess.design.description'),
      step: "02",
      delay: "200"
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: t('workProcess.development.title'),
      description: t('workProcess.development.description'),
      step: "03",
      delay: "400"
    },
    {
      icon: <TestTube2 className="w-8 h-8" />,
      title: t('workProcess.testing.title'),
      description: t('workProcess.testing.description'),
      step: "04",
      delay: "600"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t('workProcess.deployment.title'),
      description: t('workProcess.deployment.description'),
      step: "05",
      delay: "800"
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: t('workProcess.support.title'),
      description: t('workProcess.support.description'),
      step: "06",
      delay: "1000"
    }
  ];

  return (
    <section id="work-process" className="py-24 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5 animate-pulse"></div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full filter blur-3xl animate-float-1"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/30 rounded-full filter blur-3xl animate-float-2"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/30 rounded-full filter blur-3xl animate-float-3"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6">
            {section?.title || t('workProcess.title')}
          </h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto text-lg">
            {section?.description || t('workProcess.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {processes.map((process, index) => (
            <div
              key={index}
              className="relative group"
              style={{
                animation: 'fade-in 0.5s ease-out forwards',
                animationDelay: `${process.delay}ms`,
                opacity: 0
              }}
            >
              {index < processes.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-xala-accent to-transparent transform -translate-y-1/2 z-10"></div>
              )}

              <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 
                            hover:border-xala-accent/50 transition-all duration-500 group-hover:transform group-hover:scale-105
                            group-hover:shadow-2xl group-hover:shadow-xala-accent/20">
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-xala-accent rounded-full flex items-center justify-center
                              transform group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold">{process.step}</span>
                </div>

                <div className="mb-6 text-xala-accent relative">
                  <div className="absolute inset-0 bg-xala-accent/20 filter blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                    {process.icon}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-xala-accent mb-3">{process.title}</h3>
                <p className="text-xala-text/70">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkProcess;