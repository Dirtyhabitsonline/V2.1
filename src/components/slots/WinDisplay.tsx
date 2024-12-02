import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins } from 'lucide-react';

interface WinDisplayProps {
  winAmount: number;
  isVisible: boolean;
}

export const WinDisplay: React.FC<WinDisplayProps> = ({ winAmount, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && winAmount > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="absolute top-4 left-1/2 -translate-x-1/2 bg-yellow-500/20 backdrop-blur-sm 
                     px-6 py-3 rounded-full flex items-center space-x-2"
        >
          <Coins className="w-5 h-5 text-yellow-400" />
          <span className="text-xl font-bold text-yellow-400">
            +{winAmount} credits!
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};