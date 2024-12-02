import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  balance: number;
  lastWin: number;
  multiplier: number;
  bonusSpinsRemaining: number;
  totalBonusWin: number;
  isBonusRound: boolean;
  updateBalance: (amount: number) => void;
  setMultiplier: (multiplier: number) => void;
  setBonusSpins: (spins: number) => void;
  updateBonusWin: (amount: number) => void;
  resetGame: () => void;
  toggleBonusRound: (active: boolean) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set) => ({
      balance: 1000,
      lastWin: 0,
      multiplier: 1,
      bonusSpinsRemaining: 0,
      totalBonusWin: 0,
      isBonusRound: false,
      updateBalance: (amount) => set((state) => ({ 
        balance: state.balance + amount,
        lastWin: amount > 0 ? amount : state.lastWin
      })),
      setMultiplier: (multiplier) => set({ multiplier }),
      setBonusSpins: (spins) => set({ bonusSpinsRemaining: spins }),
      updateBonusWin: (amount) => set((state) => ({ 
        totalBonusWin: state.totalBonusWin + amount 
      })),
      resetGame: () => set({ 
        balance: 1000, 
        lastWin: 0, 
        multiplier: 1,
        bonusSpinsRemaining: 0,
        totalBonusWin: 0,
        isBonusRound: false
      }),
      toggleBonusRound: (active) => set({ isBonusRound: active }),
    }),
    {
      name: 'game-storage',
    }
  )
);