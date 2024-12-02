import { Link } from 'react-router-dom';
import { Bell, Plus } from 'lucide-react';
import { UserNav } from './user-nav';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/lib/config';

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <Link to={ROUTES.DASHBOARD} className="lg:hidden text-xl font-bold">
            Gaming Admin
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            New Game
          </Button>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          
          <UserNav />
        </div>
      </div>
    </header>
  );
}