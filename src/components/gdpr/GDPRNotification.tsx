import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GDPRNotification {
  id: string;
  title: string;
  content: string;
  button_text: string;
  is_active: boolean;
  language: string;
}

export function GDPRNotification() {
  const { i18n } = useTranslation();
  const [showNotification, setShowNotification] = useState(false);

  // Check if user has already accepted GDPR
  useEffect(() => {
    const hasAcceptedGDPR = localStorage.getItem('gdpr-accepted');
    if (!hasAcceptedGDPR) {
      setShowNotification(true);
    }
  }, []);

  // Fetch GDPR notification content from Supabase
  const { data: gdprData } = useQuery({
    queryKey: ['gdpr-notification', i18n.language],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('gdpr_notifications')
        .select('*')
        .eq('language', i18n.language)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as GDPRNotification;
    },
  });

  const handleAccept = () => {
    localStorage.setItem('gdpr-accepted', 'true');
    setShowNotification(false);
  };

  if (!showNotification || !gdprData) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary text-primary-foreground border-t shadow-lg",
        "p-4 md:p-6"
      )}
    >
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-semibold mb-2">{gdprData.title}</h3>
          <p className="text-sm text-primary-foreground/90">{gdprData.content}</p>
        </div>
        <Button
          onClick={handleAccept}
          variant="secondary"
          className="shrink-0 w-full sm:w-auto"
        >
          {gdprData.button_text}
        </Button>
      </div>
    </div>
  );
}
