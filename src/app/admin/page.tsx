import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from 'lucide-react';

const stats = [
  {
    title: 'Total Revenue',
    value: '₹1,250,345',
    icon: DollarSign,
    description: '+20.1% from last month',
  },
  {
    title: 'New Orders',
    value: '+1,234',
    icon: ShoppingBag,
    description: '+18.7% from last month',
  },
  {
    title: 'Pending Vendors',
    value: '12',
    icon: Users,
    description: 'Awaiting approval',
  },
  {
    title: 'Total Products',
    value: '342',
    icon: Package,
    description: 'Across all categories',
  },
];

export default function AdminDashboardPage() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's a summary of your store.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
