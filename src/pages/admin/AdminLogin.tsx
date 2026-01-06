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
    setError('');
    setIsLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError('Invalid email or password');
        return;
      }

      if (signInData?.user) {
        const { data: adminUser, error: adminError } = await supabase
          .from('admins')
          .select('*')
          .eq('user_id', signInData.user.id)
          .single();

        if (adminError) {
          setError('Error verifying admin status');
          return;
        }

        if (adminUser) {
          toast({
            title: "Success",
            description: "Welcome back!",
          });
          navigate('/admin/dashboard');
        } else {
          setError('Access denied: Not an admin user');
        }
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card text-card-foreground border border-border rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground">Sign in to access the dashboard</p>
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
              className="w-full"
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
              className="w-full"
              required
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
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
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
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