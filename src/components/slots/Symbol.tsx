import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface SymbolProps {
  Icon: LucideIcon;
  isSpinning: boolean;
  isWinning?: boolean;
}

export const Symbol: React.FC<SymbolProps> = ({ Icon, isSpinning, isWinning }) => (
  <motion.div
    className={clsx(
      'w-20 h-20 flex items-center justify-center rounded-lg transition-all duration-300',
      isSpinning ? 'bg-purple-900/20' : 'bg-purple-900/10',
      isWinning && 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/50'
    )}
    animate={isWinning 
      ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
      : { scale: isSpinning ? [1, 1.1, 1] : 1 }
    }
    transition={{ 
      duration: isWinning ? 0.5 : 0.3, 
      repeat: isWinning ? 1 : (isSpinning ? Infinity : 0)
    }}
  >
    <Icon className={clsx(
      'w-10 h-10 transition-colors duration-300',
      isWinning ? 'text-yellow-400' : 'text-purple-400'
    )} />
  </motion.div>
);