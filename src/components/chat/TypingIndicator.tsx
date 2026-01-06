import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm dark:bg-muted dark:border dark:border-border dark:text-foreground">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce dark:bg-foreground" />
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce [animation-delay:0.2s] dark:bg-foreground" />
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce [animation-delay:0.4s] dark:bg-foreground" />
        </div>
      </div>
    </div>
  );
}