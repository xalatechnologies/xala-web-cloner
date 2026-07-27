import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight } from 'lucide-react';
import { Section } from '@/components/ui/section';

export default function TechTeaser() {
  const { t } = useTranslation();

  const technologies = [
    {
      name: 'React',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      name: 'TypeScript',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
      color: 'from-blue-500 to-blue-700'
    },
    {
      name: 'Next.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      color: 'from-gray-600 to-gray-900',
      darkInvert: true
    },
    {
      name: 'Node.js',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      color: 'from-green-500 to-emerald-600'
    },
    {
      name: 'Python',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      color: 'from-yellow-400 to-blue-500'
    },
    {
      name: 'Azure',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg',
      color: 'from-blue-400 to-blue-600'
    },
    {
      name: 'AWS',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg',
      color: 'from-emerald-400 to-green-500'
    },
    {
      name: 'PostgreSQL',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      color: 'from-blue-600 to-indigo-700'
    },
    {
      name: 'Docker',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      color: 'from-blue-400 to-cyan-500'
    },
    {
      name: 'Kubernetes',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
      color: 'from-blue-500 to-indigo-600'
    },
  ];

  return (
    <Section tone="muted" size="md" styled container={false}>
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Moderne tech stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            {t('teasers.tech.title')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {t('teasers.tech.description')}
          </p>
        </div>

        {/* Tech grid with logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
          {technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-2 cursor-default">
                {/* Gradient glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-14 h-14 mb-4 flex items-center justify-center">
                    <img
                      src={tech.logo}
                      alt={tech.name}
                      className={`w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300 ${tech.darkInvert ? 'dark:invert' : ''}`}
                    />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: '10+', label: 'Års erfaring' },
            { value: '50+', label: 'Prosjekter levert' },
            { value: '99.9%', label: 'Oppetid' },
            { value: '24/7', label: 'Support' }
          ].map((stat, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="">
          <Link
            to="/teknologi"
            className="inline-flex items-center px-8 py-4 text-base font-medium rounded-xl text-primary-foreground bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transform hover:-translate-y-1"
          >
            {t('teasers.tech.viewTechnology')}
            <ChevronRight className="ms-3 h-5 w-5" />
          </Link>
        </div>
      </div>
    </Section>
  );
}