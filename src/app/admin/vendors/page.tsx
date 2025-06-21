
import VendorsTable from "@/components/admin/vendors/VendorsTable";
import { getVendors } from "@/lib/mock-data";

export default function AdminVendorsPage() {
  const vendors = getVendors();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-headline">Vendors</h1>
        <p className="text-muted-foreground">
          Approve and manage vendors for your marketplace.
        </p>
      </div>
      <VendorsTable initialVendors={vendors} />
    </>
  );
}
