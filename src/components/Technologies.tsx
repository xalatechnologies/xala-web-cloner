import { Code2, Brain, Layout, Palette, Server, Terminal } from 'lucide-react';
import { useTranslation } from "react-i18next";
import { useSection } from "@/hooks/use-section";

const Technologies = () => {
  const { t } = useTranslation();
  const { data: section } = useSection('technologies');

  const technologies = [
    {
      icon: <Code2 className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.frontend.title'),
      tools: t('technologies.frontend.tools', { returnObjects: true }) || []
    },
    {
      icon: <Server className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.backend.title'),
      tools: t('technologies.backend.tools', { returnObjects: true }) || []
    },
    {
      icon: <Brain className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.ai.title'),
      tools: t('technologies.ai.tools', { returnObjects: true }) || []
    },
    {
      icon: <Layout className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.uiux.title'),
      tools: t('technologies.uiux.tools', { returnObjects: true }) || []
    },
    {
      icon: <Terminal className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.devops.title'),
      tools: t('technologies.devops.tools', { returnObjects: true }) || []
    },
    {
      icon: <Palette className="w-8 h-8 text-xala-accent" />,
      name: t('technologies.design.title'),
      tools: t('technologies.design.tools', { returnObjects: true }) || []
    }
  ];

  return (
    <section className="py-20 bg-xala-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {section?.title || t('technologies.title')}
          </h2>
          <p className="text-xala-text text-lg max-w-2xl mx-auto">
            {section?.description || t('technologies.description')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="p-6 bg-xala-secondary rounded-xl border border-gray-800 hover:border-xala-accent/50 transition-all duration-300 h-full flex flex-col"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-4 mb-4">
                  {tech.icon}
                  <h3 className="text-xl font-semibold text-xala-accent">{tech.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {Array.isArray(tech.tools) && tech.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="px-3 py-1 bg-xala-primary rounded-full text-sm text-xala-text"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Technologies;