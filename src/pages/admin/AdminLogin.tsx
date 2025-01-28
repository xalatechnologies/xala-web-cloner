import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const checkAdminStatus = async (userId: string) => {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error checking admin status:', error);
      return false;
    }

    return !!data;
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const isAdmin = await checkAdminStatus(authData.user.id);

        if (isAdmin) {
          toast({
            title: t('admin.login.success.title'),
            description: t('admin.login.success.description'),
          });
          navigate('/admin/dashboard');
        } else {
          throw new Error('Unauthorized access');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: t('admin.login.error.title'),
        description: t('admin.login.error.description'),
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md space-y-8 backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">{t('admin.login.title')}</h2>
          <p className="mt-2 text-sm text-gray-400">{t('admin.login.description')}</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('admin.login.form.email')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">{t('admin.login.form.password')}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      disabled={isLoading}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-white/10 hover:bg-white/20 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('admin.login.form.loading')}
                </>
              ) : (
                t('admin.login.form.submit')
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;