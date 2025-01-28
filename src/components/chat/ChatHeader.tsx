import React from 'react';
import { Brain } from 'lucide-react';
import type { ChatTranslations } from '@/hooks/use-chat-translations';

interface ChatHeaderProps {
  thinking: boolean;
  translations: ChatTranslations;
}

export function ChatHeader({ thinking, translations }: ChatHeaderProps) {
  return (
    <div className="flex items-center space-x-4 bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{translations['chat.title']}</h3>
          <p className="text-sm text-white/80">
            {thinking ? translations['chat.status.thinking'] : translations['chat.status.online']}
          </p>
        </div>
      </div>
    </div>
  );
}