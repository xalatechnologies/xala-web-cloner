import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { useToast } from '../ui/use-toast';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { Wand2 } from 'lucide-react';

type SupportedLanguage = Database['public']['Enums']['supported_language'];

export const ContactForm = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState<{[key: string]: boolean}>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const enhanceText = async (field: string) => {
    setIsEnhancing(prev => ({ ...prev, [field]: true }));
    try {
      const response = await fetch('/api/enhance-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData[field as keyof typeof formData] }),
      });

      if (!response.ok) {
        throw new Error('Failed to enhance text');
      }

      const data = await response.json();
      setFormData(prev => ({ ...prev, [field]: data.enhancedText }));
      toast({
        title: t('contact.form.enhance.success'),
        description: t('contact.form.enhance.description'),
      });
    } catch (error) {
      throw new Error('Failed to enhance text');
    } finally {
      setIsEnhancing(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const currentLang = i18n.language.toLowerCase() as SupportedLanguage;
    
    try {
      const enhancedMessage = await enhanceText('message');

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ ...formData, language: currentLang }]);

      if (error) throw error;

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
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
          <Input
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder={t('contact.form.name')}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 h-12"
          />
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder={t('contact.form.email')}
            required
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 h-12"
          />
        </div>
        <Input
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder={t('contact.form.subject')}
          required
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 h-12"
        />
        <div className="relative">
          <Textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder={t('contact.form.message')}
            required
            rows={12}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 resize-none min-h-[300px] p-4 pr-12"
          />
          <Button
            type="button"
            onClick={() => enhanceText('message')}
            disabled={isEnhancing.message || !formData.message}
            className="absolute right-4 bottom-4 w-8 h-8 p-0 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            size="icon"
          >
            <Wand2 className={`h-4 w-4 ${isEnhancing.message ? 'animate-spin' : ''}`} />
          </Button>
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