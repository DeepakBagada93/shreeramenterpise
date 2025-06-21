
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import type { Order } from '@/lib/types';

const getStatusVariant = (status: Order['status']): 'default' | 'destructive' | 'outline' | 'secondary' => {
  switch (status) {
    case 'Delivered':
      return 'secondary';
    case 'Shipped':
      return 'default';
    case 'Cancelled':
      return 'destructive';
    case 'Pending':
    default:
      return 'outline';
  }
};

export default function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id.slice(-6).toUpperCase()}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>{format(new Date(order.date), 'PP')}</TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(order.status)} className="capitalize">
                  {order.status.toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-right">₹{order.total.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
