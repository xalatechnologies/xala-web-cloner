import React from 'react';
import { Bot, User } from 'lucide-react';
import { Message } from '@/types/chat';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface ChatMessageProps {
  message: Message;
  isLastMessage?: boolean;
}

export function ChatMessage({ message, isLastMessage }: ChatMessageProps) {
  const isUser = message.type === 'user';

  const formatContent = (content: string) => {
    // Replace \n with actual line breaks for markdown
    return content.replace(/\\n/g, '\n');
  };

  return (
    <div
      className={cn(
        'group flex w-full items-start gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full',
          isUser
            ? 'bg-primary text-primary-foreground dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary'
            : 'bg-muted text-muted-foreground dark:bg-muted'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-white" />
        ) : (
          <Bot className="h-4 w-4 text-gray-600 dark:text-foreground" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex min-h-[40px] max-w-[80%] flex-col gap-1',
          isUser ? 'items-end' : 'items-start'
        )}
      >
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-sm',
            isUser
              ? 'bg-primary text-primary-foreground dark:bg-gradient-to-b dark:from-xala-primary dark:via-xala-secondary dark:to-xala-primary'
              : 'bg-card text-card-foreground border border-border dark:bg-muted dark:border-border dark:text-foreground'
          )}
        >
          {isUser ? (
            <div className="text-sm whitespace-pre-line">{message.content}</div>
          ) : (
            <ReactMarkdown
              className="prose prose-sm max-w-none text-foreground dark:text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="mb-3 last:mb-0 pl-4 list-disc space-y-1.5">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-3 last:mb-0 pl-4 list-decimal space-y-1.5">{children}</ol>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400"
                  >
                    {children}
                  </a>
                ),
              }}
            >
              {formatContent(message.content)}
            </ReactMarkdown>
          )}
        </div>

        {/* Sources if available */}
        {message.sources && message.sources.length > 0 && (
          <div className="flex flex-col space-y-1 mt-2">
            <p className="text-xs text-muted-foreground dark:text-muted-foreground">Sources:</p>
            {message.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:underline dark:text-blue-400"
              >
                {source.title}
              </a>
            ))}
          </div>
        )}

        {/* Message Status */}
        {message.status && (
          <span
            className={cn(
              'text-xs',
              message.status === 'error' ? 'text-red-500' : 'text-muted-foreground dark:text-muted-foreground'
            )}
          >
            {message.status === 'sending' && 'Sending...'}
            {message.status === 'sent' && 'Sent'}
            {message.status === 'error' && 'Failed to send'}
          </span>
        )}
      </div>
    </div>
  );
}