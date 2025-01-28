import React from 'react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-white rounded-2xl px-4 py-2 shadow-sm">
        <div className="flex gap-1">
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-2 h-2 bg-[#003057] rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}