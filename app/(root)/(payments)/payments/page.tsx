import PageHeading from "@/components/layout/page-heading";
import PaymentTable from "./(components)/payment-table";

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Payments" />
      <PaymentTable />
    </div>
  );
}
