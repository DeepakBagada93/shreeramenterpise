
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NewVendorPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vendorName = formData.get('name');
    
    // Mocking the add functionality
    console.log("New Vendor Data:", {
        name: vendorName,
        email: formData.get('email'),
        status: formData.get('status'),
    });

    toast({
      title: "Vendor Created",
      description: `Vendor "${vendorName}" has been successfully created.`,
    });

    router.push('/admin/vendors');
  };

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
            <h1 className="text-3xl font-bold font-headline">Add New Vendor</h1>
            <p className="text-muted-foreground">
                Fill out the form below to add a new vendor to the marketplace.
            </p>
        </div>
      </div>
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Vendor Details</CardTitle>
            <CardDescription>Enter the information for the new vendor.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name</Label>
              <Input id="name" name="name" placeholder="e.g., Acme Apparel" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" name="email" type="email" placeholder="contact@acmeapparel.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select name="status" defaultValue="Pending">
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
             <Button type="submit">Save Vendor</Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
