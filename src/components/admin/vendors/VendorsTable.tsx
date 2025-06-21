
'use client';

import * as React from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Vendor } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, MoreHorizontal, Pen } from 'lucide-react';

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
            <TableHead>Contact Person</TableHead>
            <TableHead>Joined Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.name}</TableCell>
              <TableCell>{vendor.contactPerson}</TableCell>
              <TableCell>{format(new Date(vendor.joinedDate), 'PP')}</TableCell>
              <TableCell>
                 <Badge variant={getStatusVariant(vendor.status)} className="capitalize">
                    {vendor.status.toLowerCase()}
                 </Badge>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/vendors/${vendor.id}/edit`}>
                        <Pen className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </DropdownMenuItem>
                    {vendor.status === 'Pending' && (
                      <DropdownMenuItem onClick={() => handleApproveVendor(vendor.id)}>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
