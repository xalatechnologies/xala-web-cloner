import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Palette, Code2, Rocket, ChevronRight, ArrowRight } from 'lucide-react';

export default function ProcessTeaser() {
  const { t } = useTranslation();

  const steps = [
    {
      number: '01',
      title: t('teasers.process.steps.mapping'),
      description: 'Vi starter med å forstå din virksomhet, mål og utfordringer for å skape et solid fundament.',
      icon: Search,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      number: '02',
      title: t('teasers.process.steps.design'),
      description: 'Vi designer brukeropplevelsen og arkitekturen som sikrer en intuitiv og skalerbar løsning.',
      icon: Palette,
      color: 'from-violet-500 to-purple-500'
    },
    {
      number: '03',
      title: t('teasers.process.steps.development'),
      description: 'Vårt team utvikler løsningen med moderne teknologi og kontinuerlig kvalitetssikring.',
      icon: Code2,
      color: 'from-emerald-500 to-green-500'
    },
    {
      number: '04',
      title: t('teasers.process.steps.delivery'),
      description: 'Vi leverer, lanserer og sikrer en smidig overgang med opplæring og support.',
      icon: Rocket,
      color: 'from-orange-500 to-amber-500'
    }
  ];

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            {t('teasers.process.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('teasers.process.description')}
          </p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          {/* Connection line - visible on desktop */}
          <div className="hidden lg:block absolute top-24 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-500 via-violet-500 via-emerald-500 to-orange-500 opacity-30" />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative group">
                  {/* Arrow connector on mobile/tablet */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-muted-foreground/30">
                      <ArrowRight className="w-6 h-6 rotate-90" />
                    </div>
                  )}

                  <div className="flex flex-col items-center text-center">
                    {/* Step number and icon */}
                    <div className="relative mb-6">
                      {/* Background glow */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 scale-150`} />

                      {/* Icon container */}
                      <div className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} p-0.5 group-hover:scale-110 transition-transform duration-500`}>
                        <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                          <IconComponent className="w-8 h-8 text-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>
                      </div>

                      {/* Step number badge */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white text-xs font-bold shadow-lg`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector on desktop */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-24 -right-3 transform translate-x-1/2 text-muted-foreground/40 z-10">
                      <ChevronRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            to="/slik-vi-jobber"
            className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t('teasers.process.readProcess')}
            <ChevronRight className="ml-3 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}