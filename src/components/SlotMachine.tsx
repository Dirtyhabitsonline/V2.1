import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { Skull, Heart, Star, Moon, Sun } from 'lucide-react';

const symbols = [
  { id: 'skull', component: Skull, value: 100 },
  { id: 'heart', component: Heart, value: 75 },
  { id: 'star', component: Star, value: 50 },
  { id: 'moon', component: Moon, value: 25 },
  { id: 'sun', component: Sun, value: 10 },
];

export const SlotMachine: React.FC = () => {
  const { balance, isSpinning, spin, updateBalance } = useGameStore();
  const [reels, setReels] = useState<typeof symbols[][]>(
    Array(5).fill(symbols.slice(0, 3))
  );

  const handleSpin = () => {
    if (balance < 10) return;
    
    spin();
    updateBalance(-10);

    // Simulate reel spinning
    const spinDuration = 3000;
    const intervals = 20;
    let spins = 0;

    const spinInterval = setInterval(() => {
      setReels(prevReels =>
        prevReels.map(reel =>
          [...reel.slice(1), reel[0]]
        )
      );

      spins++;
      if (spins >= intervals) {
        clearInterval(spinInterval);
        checkWinnings();
      }
    }, spinDuration / intervals);
  };

  const checkWinnings = () => {
    // Simplified win check for demo
    const randomWin = Math.random() > 0.7;
    if (randomWin) {
      const winAmount = Math.floor(Math.random() * 5) * 10 + 20;
      updateBalance(winAmount);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-8 bg-gray-900 rounded-xl shadow-2xl">
      <div className="grid grid-cols-5 gap-4 mb-8 bg-gray-800 p-6 rounded-lg">
        {reels.map((reel, reelIndex) =>
          <div key={reelIndex} className="space-y-4">
            {reel.map((symbol, symbolIndex) => {
              const Symbol = symbol.component;
              return (
                <motion.div
                  key={`${reelIndex}-${symbolIndex}`}
                  className={`w-20 h-20 flex items-center justify-center rounded-lg ${
                    isSpinning ? 'bg-purple-900/20' : 'bg-purple-900/10'
                  }`}
                  animate={{ scale: isSpinning ? [1, 1.1, 1] : 1 }}
                  transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
                >
                  <Symbol className="w-10 h-10 text-purple-400" />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSpin}
          disabled={isSpinning || balance < 10}
          className={`px-8 py-4 rounded-lg text-xl font-bold transition
            ${isSpinning
              ? 'bg-gray-700 text-gray-500'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
            }`}
        >
          {isSpinning ? 'Spinning...' : 'Spin ($10)'}
        </button>
      </div>
    </div>
  );
}