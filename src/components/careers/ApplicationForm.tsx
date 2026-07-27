import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';

interface ApplicationFormProps {
  /** Discipline titles offered in the role field, in the reader's language. */
  roles: string[];
  contactEmail: string;
}

/**
 * An open application, submitted from the site.
 *
 * Same zero-backend approach as the contact form: the browser's own mail client
 * carries it, so there is no server to run and no applicant data resting
 * anywhere we would then be responsible for. That constraint decides the field
 * list. A CV cannot be attached through a mailto, so the form asks for a link
 * instead and says so plainly, rather than presenting an upload control that
 * quietly does nothing.
 *
 * Fields are the ones that change what happens next: which discipline, how to
 * reach you, and something to read. Everything a CV already answers is left to
 * the CV.
 */
export const ApplicationForm = ({ roles, contactEmail }: ApplicationFormProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const schema = z.object({
    name: z.string().min(2, t('careers.form.validation.name', 'Skriv inn navnet ditt.')),
    email: z.string().email(t('careers.form.validation.email', 'Skriv inn en gyldig e-postadresse.')),
    role: z.string().min(2, t('careers.form.validation.role', 'Velg hvilken rolle du søker på.')),
    portfolio: z
      .string()
      .trim()
      .url(t('careers.form.validation.portfolio', 'Lenken må være en fullstendig nettadresse.'))
      .or(z.literal('')),
    message: z
      .string()
      .min(30, t('careers.form.validation.message', 'Skriv noen setninger om hva du har jobbet med.')),
  });

  type Values = z.infer<typeof schema>;

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', role: '', portfolio: '', message: '' },
  });

  const onSubmit = (values: Values) => {
    try {
      const subject = encodeURIComponent(
        t('careers.mailSubjectRole', 'Åpen søknad: {{role}}', { role: values.role })
      );
      const body = encodeURIComponent(
        [
          `Navn: ${values.name}`,
          `E-post: ${values.email}`,
          `Rolle: ${values.role}`,
          values.portfolio ? `Portefølje: ${values.portfolio}` : null,
          '',
          values.message,
          '',
          t('careers.form.attachReminder', 'Husk å legge ved CV-en din før du sender.'),
        ]
          .filter((line) => line !== null)
          .join('\n')
      );

      window.open(`mailto:${contactEmail}?subject=${subject}&body=${body}`, '_self');

      toast({
        title: t('careers.form.success.title', 'Søknaden er klar til å sendes'),
        description: t(
          'careers.form.success.description',
          'Vi har åpnet e-postprogrammet ditt. Legg ved CV-en og send, så hører du fra oss.'
        ),
      });
      form.reset();
    } catch (error) {
      console.error('Application submission error:', error);
      toast({
        title: t('careers.form.error.title', 'Vi fikk ikke åpnet e-postprogrammet'),
        description: t('careers.form.error.description', {
          defaultValue: 'Send søknaden direkte til {{email}} i stedet.',
          email: contactEmail,
        }),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('careers.form.name', 'Navn')}</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" {...field} />
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
                  <FormLabel>{t('careers.form.email', 'E-post')}</FormLabel>
                  <FormControl>
                    <Input type="email" autoComplete="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('careers.form.role', 'Hva søker du på?')}</FormLabel>
                <FormControl>
                  {/*
                    A native select: it is the control every browser and screen
                    reader already handles, and the list is short and fixed.
                  */}
                  <select
                    {...field}
                    className="flex min-h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">{t('careers.form.rolePlaceholder', 'Velg rolle')}</option>
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                    <option value={t('careers.form.roleOther', 'Noe annet')}>
                      {t('careers.form.roleOther', 'Noe annet')}
                    </option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="portfolio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t('careers.form.portfolio', 'Lenke til kode, design eller tekst')}{' '}
                  <span className="font-normal text-muted-foreground">
                    {t('careers.form.optional', '(valgfritt)')}
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    inputMode="url"
                    placeholder="https://github.com/..."
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  {t(
                    'careers.form.portfolioHelp',
                    'GitHub, en portefølje eller noe du har skrevet. Det sier oss ofte mer enn søknadsteksten.'
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('careers.form.message', 'Om deg')}</FormLabel>
                <FormControl>
                  <Textarea rows={6} {...field} />
                </FormControl>
                <FormDescription>
                  {t(
                    'careers.form.messageHelp',
                    'Hva har du bygget, og hva vil du jobbe mer med? Noen setninger holder.'
                  )}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            {t(
              'careers.form.cvNote',
              'Vi tar imot CV som vedlegg. Når du trykker send, åpnes e-postprogrammet ditt med søknaden ferdig utfylt, og der legger du ved CV-en før du sender.'
            )}
          </p>

          <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
            <Send className="h-4 w-4" aria-hidden="true" />
            {t('careers.form.submit', 'Fortsett til e-post')}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ApplicationForm;
