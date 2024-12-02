import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

interface BonusRoundOverlayProps {
  isVisible: boolean;
}

export const BonusRoundOverlay: React.FC<BonusRoundOverlayProps> = ({ isVisible }) => {
  const { bonusSpinsRemaining, totalBonusWin } = useGameStore();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-purple-900/30 backdrop-blur-sm rounded-xl 
                     flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-gray-900/90 p-8 rounded-2xl shadow-2xl text-center"
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-purple-400 mb-2">
              Bonus Round Active!
            </h3>
            <p className="text-lg text-gray-300 mb-4">
              Free Spins Remaining: <span className="text-yellow-400 font-bold">{bonusSpinsRemaining}</span>
            </p>
            <p className="text-lg text-gray-300">
              Total Bonus Win: <span className="text-green-400 font-bold">{totalBonusWin}</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};