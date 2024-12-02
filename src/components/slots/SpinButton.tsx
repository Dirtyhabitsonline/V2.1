import React from 'react';
import { motion } from 'framer-motion';
import { Loader, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface SpinButtonProps {
  onClick: () => void;
  disabled: boolean;
  isSpinning: boolean;
  cost: number;
  isBonusRound?: boolean;
}

export const SpinButton: React.FC<SpinButtonProps> = ({
  onClick,
  disabled,
  isSpinning,
  cost,
  isBonusRound = false,
}) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'px-8 py-4 rounded-lg text-xl font-bold transition-all',
        'flex items-center space-x-2 justify-center min-w-[200px]',
        disabled
          ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
          : isBonusRound
          ? 'bg-gradient-to-r from-yellow-600 to-amber-600 text-white hover:from-yellow-500 hover:to-amber-500 shadow-lg shadow-yellow-500/20'
          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500 shadow-lg shadow-purple-500/20'
      )}
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
    >
      {isSpinning ? (
        <Loader className="w-6 h-6 animate-spin" />
      ) : isBonusRound ? (
        <Sparkles className="w-6 h-6" />
      ) : null}
      <span>
        {isSpinning 
          ? 'Spinning...' 
          : isBonusRound 
          ? 'Free Spin!' 
          : `Spin (${cost} credits)`}
      </span>
    </motion.button>
  );
};