import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  GameController, 
  Settings, 
  MessageSquare, 
  CreditCard,
  HelpCircle,
  BarChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ROUTES } from '@/lib/config';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
  { icon: GameController, label: 'Games', path: '/games' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: MessageSquare, label: 'Support Tickets', path: '/tickets' },
  { icon: CreditCard, label: 'Transactions', path: '/transactions' },
  { icon: BarChart, label: 'Analytics', path: '/analytics' },
  { icon: Settings, label: 'Settings', path: '/settings' },
  { icon: HelpCircle, label: 'Help', path: '/help' },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:flex h-screen w-64 flex-col fixed left-0 bg-[#2c3338] text-gray-300">
      <div className="p-4 border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">Gaming Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-6 py-3 text-sm transition-colors",
                "hover:bg-gray-700 hover:text-white",
                isActive && "bg-gray-700 text-white"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}