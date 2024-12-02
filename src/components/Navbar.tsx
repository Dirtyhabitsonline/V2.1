import React from 'react';
import { Link } from 'react-router-dom';
import { Skull, Fish, Wallet } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Navbar: React.FC = () => {
  const balance = useGameStore((state) => state.balance);

  return (
    <nav className="bg-gray-900 border-b border-purple-900/50 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Skull className="w-8 h-8 text-purple-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            DirtyHabits
          </span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link 
            to="/slots" 
            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
          >
            <span>Slots</span>
          </Link>
          <Link 
            to="/fishing" 
            className="flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition"
          >
            <Fish className="w-5 h-5" />
            <span>Fishing</span>
          </Link>
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2">
            <Wallet className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-bold">${balance}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}