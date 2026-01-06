import { useTranslation } from 'react-i18next';
import { useNavigate, useRouteError } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary() {
  const error = useRouteError() as Error;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
          {t('error.oops')}
        </h1>
        <h2 className="text-2xl font-semibold text-foreground">
          {t('error.somethingWentWrong')}
        </h2>
        <div className="bg-muted rounded-lg p-4 font-mono text-sm text-left overflow-auto max-h-48">
          <p className="text-red-500">{error.message}</p>
          {error.stack && (
            <pre className="mt-2 text-muted-foreground text-xs">
              {error.stack}
            </pre>
          )}
        </div>
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            {t('common.tryAgain')}
          </Button>
          <Button
            onClick={() => navigate('/')}
            variant="default"
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            {t('common.goHome')}
          </Button>
        </div>
      </div>
    </div>
  );
}
