import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

export const ContactForm = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const currentLang = i18n.language.toLowerCase() as SupportedLanguage;
    
    const submission = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
      language: currentLang,
    };

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([submission]);

      if (error) throw error;

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });

      // Reset form
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              name="name"
              type="text"
              placeholder={t('contact.form.name')}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 h-12"
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder={t('contact.form.email')}
              required
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 h-12"
            />
          </div>
        </div>
        <div>
          <Input
            name="subject"
            type="text"
            placeholder={t('contact.form.subject')}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 h-12"
          />
        </div>
        <div>
          <Textarea
            name="message"
            placeholder={t('contact.form.message')}
            required
            rows={12}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 resize-none min-h-[300px] p-4"
          />
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white/10 hover:bg-white/20 text-white font-medium h-12 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
        </Button>
      </form>
    </div>
  );
};