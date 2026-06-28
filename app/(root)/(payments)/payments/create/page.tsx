
import PageHeading from "@/components/layout/page-heading";
import CreatePaymentForm from "../(components)/create-payment-form";

export default function CreatePaymentPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Payment"
        routeListRight={[{ href: "/payments", label: "Payments" }]}
      />
      <CreatePaymentForm />
    </div>
  );
}
