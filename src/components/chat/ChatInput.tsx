import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import TextareaAutosize from 'react-textarea-autosize';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
  thinking?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
}

export function ChatInput({
  onSendMessage,
  disabled,
  thinking,
  placeholder = 'Type a message...',
  autoFocus = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto focus when component mounts if autoFocus is true
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-end overflow-hidden rounded-2xl border border-gray-200/50 bg-white/80 backdrop-blur-sm shadow-sm focus-within:border-xala-primary/50 focus-within:ring-2 focus-within:ring-xala-primary/20">
        <TextareaAutosize
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxRows={6}
          className={cn(
            'flex-1 resize-none bg-transparent py-3 pl-4 pr-12 outline-none placeholder:text-gray-400',
            'min-h-[44px] max-h-[200px]',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        />
        
        <button
          type="submit"
          disabled={!message.trim() || disabled}
          className={cn(
            'absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full',
            'bg-primary text-primary-foreground dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary',
            'transition-all duration-200 ease-out',
            'hover:shadow-md hover:scale-105 active:scale-95',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
          )}
        >
          {thinking ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className="mt-2 text-xs text-gray-400">
        Press Enter to send, Shift + Enter for new line
      </div>
    </form>
  );
}