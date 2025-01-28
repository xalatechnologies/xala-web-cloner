import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import ReCAPTCHA from "react-google-recaptcha";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useTranslation } from 'react-i18next';
import type { Language } from '@/types/chat';

const RECAPTCHA_SITE_KEY = "6Leou8UqAAAAACFBWCzoatGrdSbZIIFwqKWStlWN";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(2),
  message: z.string().min(10),
});

type FormValues = z.infer<typeof formSchema>;

export const ContactForm = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    if (!captchaToken) {
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.validation.captcha_required'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    const currentLang = i18n.language.split('-')[0].toLowerCase() as Language;
    
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: values.name,
          email: values.email,
          subject: values.subject,
          message: values.message,
          language: currentLang,
          status: 'pending',
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: t('contact.form.success.title'),
        description: t('contact.form.success.description'),
      });

      form.reset();
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.description'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full space-y-6">
          <div className="space-y-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={t('contact.form.name')}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder={t('contact.form.email')}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder={t('contact.form.subject')}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="relative">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder={t('contact.form.message')}
                        rows={8}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 resize-none min-h-[216px] p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center gap-6 mt-auto">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={RECAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              theme="dark"
            />

            <Button
              type="submit"
              disabled={isSubmitting || !captchaToken}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium h-12 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('contact.form.status.sending')}
                </>
              ) : (
                t('contact.form.status.send')
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};