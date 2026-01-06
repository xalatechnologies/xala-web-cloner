import React from 'react';
import { Brain, X } from 'lucide-react';
import type { ChatTranslations } from '@/hooks/use-chat-translations';
import { useChatStore } from './useChatStore';

interface ChatHeaderProps {
  thinking: boolean;
  translations: ChatTranslations;
}

export function ChatHeader({ thinking, translations }: ChatHeaderProps) {
  const { setOpen } = useChatStore();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-card text-card-foreground border-b border-border dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground dark:bg-white/10 dark:text-white">
          <Brain className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">{translations['chat.title']}</h3>
          <p className="text-sm text-muted-foreground">
            {thinking ? translations['chat.status.thinking'] : translations['chat.status.online']}
          </p>
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        aria-label="Close chat"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}