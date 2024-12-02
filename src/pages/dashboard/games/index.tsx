import { useState } from 'react';
import { GameCard } from './game-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { games } from '@/lib/data/games';
import { Search, Plus } from 'lucide-react';
import { NewGameDialog } from './new-game-dialog';

export const GamesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewGameDialog, setShowNewGameDialog] = useState(false);

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Games</h1>
          <p className="text-muted-foreground">
            Manage and monitor your game catalog
          </p>
        </div>
        <Button onClick={() => setShowNewGameDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add New Game
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search games..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      <NewGameDialog
        open={showNewGameDialog}
        onOpenChange={setShowNewGameDialog}
      />
    </div>
  );
};