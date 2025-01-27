import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-xala-primary-light dark:bg-xala-primary">
      <div className="text-center space-y-8">
        <h1 className="text-9xl font-bold bg-gradient-to-r from-xala-accent to-xala-accent-light bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-xala-text-light dark:text-xala-text">
          {t('error.pageNotFound')}
        </h2>
        <p className="text-xala-text-light/80 dark:text-xala-text/80 max-w-md mx-auto">
          {t('error.pageNotFoundDescription')}
        </p>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('common.goBack')}
        </Button>
      </div>
    </div>
  );
}
