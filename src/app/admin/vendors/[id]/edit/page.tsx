
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getVendorById } from "@/lib/mock-data";
import { useEffect, useState } from "react";
import type { Vendor } from "@/lib/types";


export default function EditVendorPage({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | undefined>(undefined);

  useEffect(() => {
    const vendorData = getVendorById(params.id);
    setVendor(vendorData);
  }, [params.id]);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vendorName = formData.get('name');
    
    console.log("Updated Vendor Data:", Object.fromEntries(formData.entries()));

    toast({
      title: "Vendor Updated",
      description: `Vendor "${vendorName}" has been successfully updated.`,
    });

    router.push('/admin/vendors');
  };

  if (!vendor) {
      return <div>Loading vendor...</div>;
  }

  return (
    <>
      <div className="mb-6 flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
            <Link href="/admin/vendors">
                <ArrowLeft className="h-4 w-4" />
                <span className="sr-only">Back to Vendors</span>
            </Link>
        </Button>
        <div>
            <h1 className="text-3xl font-bold font-headline">Edit Vendor</h1>
            <p className="text-muted-foreground">
                Update the details for "{vendor.name}".
            </p>
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
            <CardDescription>Update the information for the vendor.</CardDescription>
          </CardHeader>
           <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name</Label>
              <Input id="name" name="name" defaultValue={vendor.name} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="contactPerson">Contact Person</Label>
              <Input id="contactPerson" name="contactPerson" defaultValue={vendor.contactPerson} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" name="email" type="email" defaultValue={vendor.email} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" defaultValue={vendor.phone} required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" name="address" defaultValue={vendor.address} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input id="website" name="website" defaultValue={vendor.website} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="commissionRate">Commission Rate (%)</Label>
              <Input id="commissionRate" name="commissionRate" type="number" defaultValue={vendor.commissionRate} required min="0" step="0.1" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue={vendor.status}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
             <Button type="submit">Update Vendor</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
