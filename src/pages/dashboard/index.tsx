import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  Users, 
  GameController, 
  CreditCard, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  {
    title: 'Total Users',
    value: '12,345',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Active Games',
    value: '89',
    change: '+5%',
    trend: 'up',
    icon: GameController,
  },
  {
    title: 'Revenue',
    value: '$45,678',
    change: '-3%',
    trend: 'down',
    icon: CreditCard,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+2%',
    trend: 'up',
    icon: TrendingUp,
  },
];

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === 'up';
          const TrendIcon = isPositive ? ArrowUpRight : ArrowDownRight;
          
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <Icon className="w-5 h-5 text-muted-foreground" />
                <span className={cn(
                  "flex items-center text-sm",
                  isPositive ? "text-green-600" : "text-red-600"
                )}>
                  <TrendIcon className="w-4 h-4 mr-1" />
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <h2 className="text-2xl font-bold">{stat.value}</h2>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">New user registered</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-3 p-6">
          <h3 className="font-semibold mb-4">Popular Games</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded bg-gray-100" />
                <div>
                  <p className="text-sm font-medium">Game Title {i}</p>
                  <p className="text-sm text-muted-foreground">1.2k players</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};