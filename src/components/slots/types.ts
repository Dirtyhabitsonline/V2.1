import { symbols } from './SlotSymbol';

export type SymbolKey = keyof typeof symbols;

export interface PayLine {
  positions: number[][];
  multiplier: number;
}

export const PAYLINES: PayLine[] = [
  { positions: [[0,1], [1,1], [2,1], [3,1], [4,1]], multiplier: 1 },    // Middle row
  { positions: [[0,0], [1,0], [2,0], [3,0], [4,0]], multiplier: 1.2 },  // Top row
  { positions: [[0,2], [1,2], [2,2], [3,2], [4,2]], multiplier: 1.2 },  // Bottom row
  { positions: [[0,0], [1,1], [2,2], [3,1], [4,0]], multiplier: 1.5 },  // V shape
  { positions: [[0,2], [1,1], [2,0], [3,1], [4,2]], multiplier: 1.5 },  // Inverted V
];