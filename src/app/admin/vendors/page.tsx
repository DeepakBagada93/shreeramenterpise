
import { Button } from "@/components/ui/button";
import VendorsTable from "@/components/admin/vendors/VendorsTable";
import { getVendors } from "@/lib/mock-data";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AdminVendorsPage() {
  const vendors = getVendors();

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold font-headline">Vendors</h1>
          <p className="text-muted-foreground">
            Approve and manage vendors for your marketplace.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/vendors/new">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Vendor
          </Link>
        </Button>
      </div>
      <VendorsTable initialVendors={vendors} />
    </>
  );
}
