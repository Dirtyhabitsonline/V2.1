import React from 'react';
import { motion } from 'framer-motion';

interface PaylineDisplayProps {
  paylines: number[][];
  activePaylines: number[];
}

export const PaylineDisplay: React.FC<PaylineDisplayProps> = ({ paylines, activePaylines }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {paylines.map((payline, index) => (
        <motion.div
          key={index}
          className={`absolute inset-0 ${
            activePaylines.includes(index) ? 'opacity-100' : 'opacity-0'
          }`}
          initial={{ pathLength: 0 }}
          animate={{
            pathLength: activePaylines.includes(index) ? 1 : 0,
            opacity: activePaylines.includes(index) ? 1 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-full h-full">
            <path
              d={`M 0 ${(payline[0] * 100) + 50} 
                  L 800 ${(payline[4] * 100) + 50}`}
              stroke="rgba(255, 215, 0, 0.5)"
              strokeWidth="4"
              fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};