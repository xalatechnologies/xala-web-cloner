import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log('Attempting login with email:', email);
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw signInError;
      }

      if (signInData.user) {
        console.log('User signed in:', signInData.user.id);
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', signInData.user.id)
          .maybeSingle();

        if (adminError) {
          console.error('Admin check error:', adminError);
          throw new Error('Error checking admin status');
        }

        if (adminUser) {
          console.log('Admin user found:', adminUser);
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          navigate('/admin/dashboard');
        } else {
          console.error('No admin user found for ID:', signInData.user.id);
          throw new Error('Unauthorized access');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error instanceof Error ? error.message : "Invalid credentials or unauthorized access");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xala-primary to-xala-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Sign in to access the dashboard</p>
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>
          <div className="text-center">
            <Link
              to="/admin/reset-password"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;