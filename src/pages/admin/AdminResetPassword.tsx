import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const AdminResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const accessToken = searchParams.get('token');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (accessToken) {
        // Update password if we have an access token
        const { error } = await supabase.auth.updateUser({
          password: newPassword
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Password updated successfully",
        });
        navigate('/admin');
      } else {
        // Send reset password email
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/admin/reset-password`,
        });

        if (error) throw error;

        toast({
          title: "Success",
          description: "Check your email for the password reset link",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-xala-primary to-xala-secondary">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-gray-400">
            {accessToken 
              ? "Enter your new password"
              : "Enter your email to receive a password reset link"}
          </p>
        </div>
        
        <form onSubmit={handleResetPassword} className="space-y-4">
          {accessToken ? (
            <div>
              <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
                minLength={6}
              />
            </div>
          ) : (
            <div>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                required
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading 
              ? 'Processing...' 
              : accessToken 
                ? 'Update Password'
                : 'Send Reset Link'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-gray-400 hover:text-white"
            onClick={() => navigate('/admin')}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminResetPassword;