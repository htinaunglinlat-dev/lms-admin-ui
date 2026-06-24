"use client";

import EditPaymentForm from "@/app/(root)/(payments)/payments/(components)/edit-payment-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePayment } from "@/hooks/use-payment";
import { useParams } from "next/navigation";

export default function EditPaymentPage() {
  const params = useParams<{ id: string }>();
  const paymentId = Number(params.id);
  const { data: response, isPending, isError } = usePayment(paymentId);
  const payment = response?.data;

  const renderContent = () => {
    if (!paymentId || Number.isNaN(paymentId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Payment</CardTitle>
            <CardDescription>
              The selected payment id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Payment</CardTitle>
            <CardDescription>Loading payment details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !payment) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Payment Not Found</CardTitle>
            <CardDescription>Unable to load this payment.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditPaymentForm paymentId={paymentId} payment={payment} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Payment"
        routeListRight={[{ href: "/payments", label: "Payments" }]}
      />
      {renderContent()}
    </div>
  );
}
