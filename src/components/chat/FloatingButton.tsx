import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'framer-motion';

interface FloatingButtonProps {
  onClick: () => void;
}

const floatingButtonVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0 }
};

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <motion.button
      variants={floatingButtonVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 p-4 bg-[#003057] text-white rounded-full shadow-lg hover:bg-[#002543] focus:outline-none focus:ring-2 focus:ring-[#003057] focus:ring-offset-2 transition-colors duration-200"
      onClick={onClick}
    >
      <Bot className="h-6 w-6" />
    </motion.button>
  );
}