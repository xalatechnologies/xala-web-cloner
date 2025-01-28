import React from 'react';
import { Brain, X } from 'lucide-react';
import type { ChatTranslations } from '@/types/chat';
import { useChatStore } from './useChatStore';

interface ChatHeaderProps {
  thinking: boolean;
  translations: ChatTranslations;
}

export function ChatHeader({ thinking, translations }: ChatHeaderProps) {
  const { setOpen } = useChatStore();

  return (
    <div className="flex items-center justify-between bg-gradient-to-b from-xala-primary via-xala-secondary to-xala-primary px-6 py-4">
      <div className="flex items-center space-x-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{translations['chat.title']}</h3>
          <p className="text-sm text-white/80">
            {thinking ? translations['chat.status.thinking'] : translations['chat.status.online']}
          </p>
        </div>
      </div>
      <button
        onClick={() => setOpen(false)}
        className="rounded-full p-2 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}