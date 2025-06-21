
import OrdersTable from '@/components/admin/orders/OrdersTable';
import { getOrders } from '@/lib/mock-data';

export default function AdminOrdersPage() {
  const orders = getOrders();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Orders</h1>
        <p className="text-muted-foreground">
          View and manage customer orders.
        </p>
      </div>
      <OrdersTable orders={orders} />
    </>
  );
}
