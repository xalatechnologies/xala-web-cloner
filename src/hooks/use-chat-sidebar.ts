import { useEffect } from 'react';
import { useChatStore } from '@/components/chat/useChatStore';

export function useChatSidebar() {
  const { isOpen } = useChatStore();
  const sidebarWidth = 480; // Increased from 400px to 480px

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Add transition to main content to smoothly animate content
    mainContent.style.transition = 'margin-right 0.3s ease-in-out';

    if (isOpen) {
      // Only adjust margin, don't lock scrolling
      mainContent.style.marginRight = `${sidebarWidth}px`;
    } else {
      mainContent.style.marginRight = '0';
    }

    // Cleanup
    return () => {
      if (mainContent) {
        mainContent.style.marginRight = '0';
        mainContent.style.transition = '';
      }
    };
  }, [isOpen, sidebarWidth]);

  return {
    sidebarWidth,
  };
}
