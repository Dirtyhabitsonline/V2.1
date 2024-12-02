import React from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import { Skull, Heart, Diamond, Star, Moon, Sun, Ghost } from 'lucide-react';
import clsx from 'clsx';

export const symbols = {
  skull: { component: Skull, value: 100, color: 'text-red-500' },
  heart: { component: Heart, value: 75, color: 'text-pink-500' },
  diamond: { component: Diamond, value: 50, color: 'text-blue-500' },
  star: { component: Star, value: 40, color: 'text-yellow-500' },
  moon: { component: Moon, value: 30, color: 'text-purple-500' },
  sun: { component: Sun, value: 20, color: 'text-orange-500' },
  ghost: { component: Ghost, value: 10, color: 'text-gray-400' },
};

interface SlotSymbolProps {
  symbol: keyof typeof symbols;
  isSpinning: boolean;
  isWinning?: boolean;
  position: number;
}

export const SlotSymbol: React.FC<SlotSymbolProps> = ({ 
  symbol, 
  isSpinning, 
  isWinning = false,
  position 
}) => {
  const [playWinSound] = useSound('/sounds/win.mp3', { volume: 0.5 });
  const [playSpinSound] = useSound('/sounds/spin.mp3', { volume: 0.3 });
  const Symbol = symbols[symbol].component;

  React.useEffect(() => {
    if (isWinning) playWinSound();
    if (isSpinning) playSpinSound();
  }, [isWinning, isSpinning, playWinSound, playSpinSound]);

  return (
    <motion.div
      className={clsx(
        'w-24 h-24 flex items-center justify-center rounded-xl transition-all duration-300',
        'backdrop-blur-sm bg-gray-900/50',
        isSpinning ? 'shadow-lg shadow-purple-500/20' : '',
        isWinning && 'ring-2 ring-yellow-400 shadow-lg shadow-yellow-400/50'
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        scale: isWinning ? [1, 1.2, 1] : 1,
        rotate: isWinning ? [0, 10, -10, 0] : 0
      }}
      transition={{ 
        type: 'spring',
        delay: position * 0.1,
        duration: 0.5
      }}
    >
      <Symbol className={clsx(
        'w-12 h-12 transition-all duration-300',
        symbols[symbol].color,
        isWinning && 'filter drop-shadow-lg'
      )} />
    </motion.div>
  );
};