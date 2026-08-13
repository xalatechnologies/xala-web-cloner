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
import { useToast } from "@/components/ui/use-toast";
import { submitForm } from '@/lib/forms/submit';
import { trackConversion } from '@/lib/analytics/conversions';

export const ContactForm = () => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();

  const formSchema = z.object({
    name: z.string().min(2, t('contact.form.validation.name.min')),
    email: z.string().email(t('contact.form.validation.email.invalid')),
    subject: z.string().min(2, t('contact.form.validation.subject.min')),
    message: z.string().min(10, t('contact.form.validation.message.min')),
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
      // Both forms on the site go through submitForm, so they behave the same
      // way and there is one place to change if that ever needs to move off
      // mailto. Today no endpoint is configured, so the browser's own mail
      // client carries it and no applicant or enquiry data passes through a
      // third party at all — which is the deliberate choice, not a stopgap.
      const outcome = await submitForm(
        { form: 'contact', ...values },
        {
          to: 'info@xala.no',
          subject: `[xala.no] ${values.subject}`,
          body: `Navn: ${values.name}\nE-post: ${values.email}\n\n${values.message}`,
        }
      );

      trackConversion('contact', outcome);

      // Say which of the two actually happened. A mailto only opens the
      // visitor's mail client; telling them it was sent, when the message is
      // still sitting unsent in a compose window, loses the enquiry twice over
      // — we never receive it and they never think to follow up.
      toast({
        title:
          outcome === 'posted'
            ? t('contact.form.sent.title', 'Meldingen er sendt')
            : t('contact.form.success.title'),
        description:
          outcome === 'posted'
            ? t('contact.form.sent.description', 'Takk. Vi svarer så snart vi kan.')
            : t('contact.form.success.description'),
      });
      form.reset();
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: t('contact.form.error.title'),
        description: t('contact.form.error.description'),
        variant: "destructive",
      });
    }
  };

  return (
    <div className="rounded-2xl p-4 sm:p-6 md:p-8 bg-card text-card-foreground border border-border w-full flex-1 dark:bg-gradient-to-br dark:from-white/5 dark:to-transparent dark:border-white/10">
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
                        placeholder={t('contact.form.name.placeholder')}
                        aria-label={t('contact.form.name.placeholder')}
                        className="text-base sm:text-lg h-14 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:bg-white/5 dark:text-white dark:border-white/10"
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
                        placeholder={t('contact.form.email.placeholder')}
                        aria-label={t('contact.form.email.placeholder')}
                        className="text-base sm:text-lg h-14 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:bg-white/5 dark:text-white dark:border-white/10"
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
                      placeholder={t('contact.form.subject.placeholder')}
                        aria-label={t('contact.form.subject.placeholder')}
                      className="text-base sm:text-lg h-14 bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:bg-white/5 dark:text-white dark:border-white/10"
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
                      placeholder={t('contact.form.message.placeholder')}
                        aria-label={t('contact.form.message.placeholder')}
                      className="resize-none min-h-[266px] p-4 text-base sm:text-lg bg-background border-border text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary dark:bg-white/5 dark:text-white dark:border-white/10"
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
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium h-14 rounded-xl transition-all duration-300 text-lg"
            >
              {form.formState.isSubmitting ? (
                t('contact.form.status.sending')
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