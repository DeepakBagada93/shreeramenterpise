'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export default function VendorApplicationPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const vendorName = formData.get('name');
    
    // Mocking the application submission
    console.log("New Vendor Application:", Object.fromEntries(formData.entries()));

    toast({
      title: "Application Submitted!",
      description: `Thank you, ${vendorName}. Your application has been received and is under review.`,
    });

    // Optionally redirect the user after submission
    router.push('/');
  };

  return (
    <div className="container mx-auto py-8 flex justify-center">
      <Card className="w-full max-w-2xl shadow-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <UserPlus className="mx-auto h-12 w-12 text-primary mb-2" />
            <CardTitle className="text-2xl font-headline">Become a Vendor</CardTitle>
            <CardDescription>
              Interested in selling your products on {APP_NAME}? Fill out the form below to apply.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            <div className="space-y-2">
              <Label htmlFor="name">Company / Brand Name</Label>
              <Input id="name" name="name" placeholder="e.g., Acme Apparel" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="contactPerson">Your Full Name</Label>
              <Input id="contactPerson" name="contactPerson" placeholder="e.g., John Doe" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Contact Email</Label>
              <Input id="email" name="email" type="email" placeholder="contact@acmeapparel.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="e.g., 9876543210" required />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="address">Business Address</Label>
              <Textarea id="address" name="address" placeholder="Enter full business address..." required />
            </div>
             <div className="md:col-span-2 space-y-2">
              <Label htmlFor="website">Website or Portfolio (Optional)</Label>
              <Input id="website" name="website" placeholder="https://acme.com" />
            </div>
             <div className="md:col-span-2 space-y-2">
                <Label htmlFor="productInfo">Tell Us About Your Products</Label>
                <Textarea id="productInfo" name="productInfo" placeholder="Briefly describe the types of products you sell..." required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full md:w-auto md:ml-auto">Submit Application</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
