import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/components/ui/use-toast";
import { useSection } from "@/hooks/use-section";
import type { Section } from "@/hooks/use-section";

interface ContactFormTranslations {
  'contact.form.name.placeholder': string;
  'contact.form.email.placeholder': string;
  'contact.form.subject.placeholder': string;
  'contact.form.message.placeholder': string;
  'contact.form.status.send': string;
  'contact.form.status.sending': string;
  'contact.form.success.title': string;
  'contact.form.success.description': string;
  'contact.form.error.title': string;
  'contact.form.error.description': string;
  'contact.form.validation.name.min': string;
  'contact.form.validation.email.invalid': string;
  'contact.form.validation.subject.min': string;
  'contact.form.validation.message.min': string;
}

// Define the database schema type
interface ContactSubmission {
  id?: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  language: 'en' | 'no';
  status?: string;
}

export const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { data: section } = useSection('contact-form');

  // Get translations from section data or fallback to i18n
  const getTranslation = (key: string): string => {
    if (!section?.translations) {
      return t(key);
    }
    return section.translations[key] || t(key);
  };

  const formSchema = z.object({
    name: z.string().min(2, getTranslation('contact.form.validation.name.min')),
    email: z.string().email(getTranslation('contact.form.validation.email.invalid')),
    subject: z.string().min(2, getTranslation('contact.form.validation.subject.min')),
    message: z.string().min(10, getTranslation('contact.form.validation.message.min')),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      // Map language code to enum value
      const languageCode = i18n.language === 'nb' ? 'no' : 'en';

      // Save to Supabase
      const submission: ContactSubmission = {
        ...values,
        language: languageCode,
        created_at: new Date().toISOString(),
      };

      const { error: supabaseError } = await supabase
        .from('contact_submissions')
        .insert(submission);

      if (supabaseError) throw supabaseError;

      toast({
        title: getTranslation('contact.form.success.title'),
        description: getTranslation('contact.form.success.description'),
      });
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: getTranslation('contact.form.error.title'),
        description: getTranslation('contact.form.error.description'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="backdrop-blur-sm rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 w-full min-w-[500px] flex-1">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full space-y-4">
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={getTranslation('contact.form.name.placeholder')}
                        className="bg-white/5 border-white/10 text-white text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 h-14"
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
                        placeholder={getTranslation('contact.form.email.placeholder')}
                        className="bg-white/5 border-white/10 text-white text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 h-14"
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
                      placeholder={getTranslation('contact.form.subject.placeholder')}
                      className="bg-white/5 border-white/10 text-white text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 h-14"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder={getTranslation('contact.form.message.placeholder')}
                      className="bg-white/5 border-white/10 text-white text-base sm:text-lg placeholder:text-base sm:placeholder:text-lg placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500 resize-none min-h-[266px] p-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <div className="flex flex-col items-center gap-4 mt-auto">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-medium h-14 rounded-xl transition-all duration-300 border border-white/10 hover:border-white/20 text-lg"
            >
              {form.formState.isSubmitting ? (
                getTranslation('contact.form.status.sending')
              ) : (
                getTranslation('contact.form.status.send')
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};