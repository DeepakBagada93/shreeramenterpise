
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
import { Button } from '@/components/ui/button';
import type { Vendor } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

const getStatusVariant = (status: Vendor['status']): 'default' | 'destructive' | 'outline' | 'secondary' => {
  switch (status) {
    case 'Approved':
      return 'secondary';
    case 'Rejected':
      return 'destructive';
    case 'Pending':
    default:
      return 'outline';
  }
};

export default function VendorsTable({ initialVendors }: { initialVendors: Vendor[] }) {
  const [vendors, setVendors] = React.useState(initialVendors);
  const { toast } = useToast();

  const handleApproveVendor = (vendorId: string) => {
    // In a real app, this would be an API call.
    // Here, we just update the local state.
    setVendors(currentVendors =>
      currentVendors.map(vendor =>
        vendor.id === vendorId ? { ...vendor, status: 'Approved' } : vendor
      )
    );
    const vendor = vendors.find(v => v.id === vendorId);
    toast({
      title: 'Vendor Approved',
      description: `"${vendor?.name}" has been successfully approved.`,
    });
  };

  return (
    <div className="rounded-lg border shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{format(new Date(vendor.joinedDate), 'PP')}</TableCell>
              <TableCell>{vendor.productsCount}</TableCell>
              <TableCell>
                 <Badge variant={getStatusVariant(vendor.status)} className="capitalize">
                    {vendor.status.toLowerCase()}
                 </Badge>
              </TableCell>
              <TableCell className="text-right">
                {vendor.status === 'Pending' && (
                  <Button variant="outline" size="sm" onClick={() => handleApproveVendor(vendor.id)}>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
