import { Game } from '@/types/game';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

interface GameCardProps {
  game: Game;
}

export const GameCard = ({ game }: GameCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-white p-2">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
        <img
          src={game.imageUrl}
          alt={game.title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <div className="mt-4 space-y-2 px-2">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{game.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{game.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-base font-medium text-gray-900">
            {formatCurrency(game.price)}
          </p>
          <Button size="sm">Play Now</Button>
        </div>
      </div>
    </div>
  );
};