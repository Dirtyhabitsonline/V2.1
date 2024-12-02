import React from 'react';
import { motion } from 'framer-motion';
import { SlotSymbol } from './SlotSymbol';
import type { SymbolKey } from './types';

interface SlotReelProps {
  symbols: SymbolKey[];
  isSpinning: boolean;
  winningPositions: boolean[];
  reelIndex: number;
}

export const SlotReel: React.FC<SlotReelProps> = ({
  symbols,
  isSpinning,
  winningPositions,
  reelIndex,
}) => {
  return (
    <motion.div
      className="space-y-4"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: reelIndex * 0.1 }}
    >
      {symbols.map((symbol, symbolIndex) => (
        <SlotSymbol
          key={`${reelIndex}-${symbolIndex}`}
          symbol={symbol}
          isSpinning={isSpinning}
          isWinning={winningPositions[symbolIndex]}
          position={reelIndex}
        />
      ))}
    </motion.div>
  );
};