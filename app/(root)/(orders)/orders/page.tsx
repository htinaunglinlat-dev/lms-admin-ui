import PageHeading from "@/components/layout/page-heading";
import OrderTable from "./(components)/order-table";

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Orders" />
      <OrderTable />
    </div>
  );
}
