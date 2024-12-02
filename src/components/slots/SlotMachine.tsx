import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import { SlotReel } from './SlotReel';
import { WinDisplay } from './WinDisplay';
import { SpinButton } from './SpinButton';
import { BonusRoundOverlay } from './BonusRoundOverlay';
import { symbols } from './SlotSymbol';
import { PAYLINES, type SymbolKey } from './types';

const REEL_COUNT = 5;
const ROW_COUNT = 3;
const SPIN_COST = 10;
const BONUS_TRIGGER_SYMBOLS = ['skull', 'ghost'];
const BONUS_SPINS = 10;
const BONUS_MULTIPLIER = 2;

export const SlotMachine: React.FC = () => {
  const { 
    balance, 
    updateBalance, 
    bonusSpinsRemaining, 
    setBonusSpins,
    isBonusRound,
    toggleBonusRound,
    updateBonusWin
  } = useGameStore();
  
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [reels, setReels] = useState<SymbolKey[][]>(
    Array(REEL_COUNT).fill(null).map(() => 
      Array(ROW_COUNT).fill(null).map(() => 
        Object.keys(symbols)[Math.floor(Math.random() * Object.keys(symbols).length)] as SymbolKey
      )
    )
  );
  const [winningPositions, setWinningPositions] = useState<boolean[][]>(
    Array(REEL_COUNT).fill(Array(ROW_COUNT).fill(false))
  );

  const spin = async () => {
    if ((balance < SPIN_COST && !isBonusRound) || isSpinning) return;
    
    setIsSpinning(true);
    setLastWin(0);
    if (!isBonusRound) {
      updateBalance(-SPIN_COST);
    }
    setWinningPositions(Array(REEL_COUNT).fill(Array(ROW_COUNT).fill(false)));

    // Simulate spinning animation
    const spinDuration = 2000;
    const spinInterval = 100;
    const iterations = spinDuration / spinInterval;

    for (let i = 0; i < iterations; i++) {
      await new Promise(resolve => setTimeout(resolve, spinInterval));
      setReels(prevReels => 
        prevReels.map(reel => {
          const newSymbol = Object.keys(symbols)[Math.floor(Math.random() * Object.keys(symbols).length)] as SymbolKey;
          return [...reel.slice(1), newSymbol];
        })
      );
    }

    // Calculate final result
    const finalReels = generateFinalReels();
    setReels(finalReels);
    setIsSpinning(false);
    
    const winAmount = checkWinnings(finalReels);
    
    if (isBonusRound) {
      setBonusSpins(bonusSpinsRemaining - 1);
      updateBonusWin(winAmount);
      
      if (bonusSpinsRemaining <= 1) {
        toggleBonusRound(false);
      }
    } else {
      checkBonusTrigger(finalReels);
    }
  };

  const generateFinalReels = (): SymbolKey[][] => {
    return Array(REEL_COUNT).fill(null).map(() => 
      Array(ROW_COUNT).fill(null).map(() => 
        Object.keys(symbols)[Math.floor(Math.random() * Object.keys(symbols).length)] as SymbolKey
      )
    );
  };

  const checkBonusTrigger = (currentReels: SymbolKey[][]) => {
    const flatReels = currentReels.flat();
    const bonusSymbolCount = flatReels.filter(symbol => 
      BONUS_TRIGGER_SYMBOLS.includes(symbol)
    ).length;

    if (bonusSymbolCount >= 3) {
      toggleBonusRound(true);
      setBonusSpins(BONUS_SPINS);
    }
  };

  const checkWinnings = (currentReels: SymbolKey[][]): number => {
    let totalWin = 0;
    const newWinningPositions = Array(REEL_COUNT).fill(null).map(() => 
      Array(ROW_COUNT).fill(false)
    );

    PAYLINES.forEach(payline => {
      const paylineSymbols = payline.positions.map(([x, y]) => currentReels[x][y]);
      const uniqueSymbols = new Set(paylineSymbols);
      
      if (uniqueSymbols.size <= 3) {
        const baseWin = SPIN_COST * (4 - uniqueSymbols.size);
        const win = Math.floor(baseWin * payline.multiplier * (isBonusRound ? BONUS_MULTIPLIER : 1));
        totalWin += win;
        
        payline.positions.forEach(([x, y]) => {
          newWinningPositions[x][y] = true;
        });
      }
    });

    if (totalWin > 0) {
      setLastWin(totalWin);
      updateBalance(totalWin);
      setWinningPositions(newWinningPositions);
    }

    return totalWin;
  };

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <div className="relative p-8 rounded-2xl bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl">
        <div className="absolute inset-0 bg-skull-pattern opacity-5 rounded-2xl" />
        
        <div className="relative">
          <WinDisplay winAmount={lastWin} isVisible={!isSpinning && lastWin > 0} />
          <BonusRoundOverlay isVisible={isBonusRound} />

          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-purple-400 mb-2">Day of the Dead Slots</h2>
            <p className="text-gray-400">
              {isBonusRound 
                ? `Bonus Round! ${bonusSpinsRemaining} Free Spins Remaining`
                : `Bet ${SPIN_COST} credits - Match 3 or more symbols to win!`
              }
            </p>
          </div>

          <div className="grid grid-cols-5 gap-4 p-8 bg-gray-900/50 rounded-xl backdrop-blur-sm mb-8">
            {reels.map((reel, reelIndex) => (
              <SlotReel
                key={reelIndex}
                symbols={reel}
                isSpinning={isSpinning}
                winningPositions={winningPositions[reelIndex]}
                reelIndex={reelIndex}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <SpinButton
              onClick={spin}
              disabled={(!isBonusRound && balance < SPIN_COST) || isSpinning}
              isSpinning={isSpinning}
              cost={isBonusRound ? 0 : SPIN_COST}
              isBonusRound={isBonusRound}
            />
          </div>
        </div>
      </div>
    </div>
  );
};