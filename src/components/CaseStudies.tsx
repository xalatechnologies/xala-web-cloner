import { ArrowRight, ChartBar, Award, BookOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "react-i18next";

const CaseStudies = () => {
  const { t } = useTranslation();

  const cases = [
    {
      title: t('caseStudies.cases.ai.title'),
      description: t('caseStudies.cases.ai.description'),
      metrics: "300% Efficiency Increase",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      icon: <ChartBar className="w-6 h-6" />
    },
    {
      title: t('caseStudies.cases.neural.title'),
      description: t('caseStudies.cases.neural.description'),
      metrics: "85% Faster Processing",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      icon: <Award className="w-6 h-6" />
    },
    {
      title: t('caseStudies.cases.quantum.title'),
      description: t('caseStudies.cases.quantum.description'),
      metrics: "99.9% Accuracy Rate",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  return (
    <section className="py-20 bg-xala-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-xala-primary via-xala-secondary to-xala-primary opacity-50"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjEyMTIxIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-xala-accent mb-4">{t('caseStudies.title')}</h2>
          <p className="text-xala-text/80 max-w-2xl mx-auto">
            {t('caseStudies.subtitle')}
          </p>
        </div>

        {/* Case studies grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((study, index) => (
            <Card 
              key={index}
              className="group relative overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm 
                       border border-white/10 hover:border-xala-accent/50 transition-all duration-300"
            >
              <CardContent className="p-0">
                {/* Image container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-xala-primary/90 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 text-xala-accent">
                    {study.icon}
                    <span className="font-semibold">{study.metrics}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-xala-accent mb-3">{study.title}</h3>
                  <p className="text-xala-text/70 mb-4">{study.description}</p>
                  
                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-xala-accent group/link cursor-pointer">
                    <span className="font-medium">{t('caseStudies.readMore')}</span>
                    <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;