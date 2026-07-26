import React from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Mail, Briefcase, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function KarrierePage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header Section */}
            <div className="text-center space-y-6">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/25 rounded-full blur-xl scale-150 opacity-50" />
                  <div className="relative p-4 rounded-full bg-primary/10">
                    <Briefcase className="w-12 h-12 text-primary" />
                  </div>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {t('careers.title', 'Karriere hos Xala')}
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t('careers.description', 'Vi leter alltid etter talentfulle mennesker som vil være med på å bygge fremtiden. Send oss en åpen søknad!')}
              </p>
            </div>

            {/* Open Application Section */}
            <div className="p-8 md:p-12 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group relative overflow-hidden">
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 
                              group-hover:from-primary/5 group-hover:via-transparent group-hover:to-primary/10 
                              transition-all duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/25 rounded-lg blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {t('careers.openApplication.title', 'Åpen søknad')}
                  </h2>
                </div>

                <div className="space-y-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  <p className="text-lg leading-relaxed">
                    {t('careers.openApplication.description', 'Har du lyst til å jobbe hos oss, men ser ikke en stilling som passer deg akkurat nå? Vi tar imot åpne søknader hele året.')}
                  </p>
                  <p className="leading-relaxed">
                    {t('careers.openApplication.instructions', 'Send oss en e-post med CV, søknad og en kort beskrivelse av deg selv og hvorfor du vil jobbe hos Xala.')}
                  </p>
                </div>

                <div className="pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full sm:w-auto group/button"
                  >
                    <a
                      href={`mailto:info@xala.no?subject=${encodeURIComponent(t('careers.openApplication.emailSubject', 'Åpen søknad - Xala Technologies'))}&body=${encodeURIComponent(t('careers.openApplication.emailBody', 'Hei,\n\nJeg sender inn en åpen søknad til Xala Technologies.\n\nMed vennlig hilsen'))}`}
                      className="inline-flex items-center gap-2"
                    >
                      <Send className="w-5 h-5" />
                      {t('careers.openApplication.sendEmail', 'Send e-post til info@xala.no')}
                    </a>
                  </Button>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{t('careers.openApplication.emailLabel', 'E-post:')}</strong>{' '}
                    <a 
                      href="mailto:info@xala.no" 
                      className="text-primary hover:underline"
                    >
                      info@xala.no
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
