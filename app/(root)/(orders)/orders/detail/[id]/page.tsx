"use client";

import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrder } from "@/hooks/use-order";
import { useParams } from "next/navigation";
import { ProfileCard } from "@/components/custom/card/profile-card";
import { OrderCard } from "@/components/custom/card/order-card";
import { ProofImagesCard } from "@/components/custom/card/proof-images-card";
import { OrderHistoryCard } from "@/components/custom/card/order-history-card";
import { ProductCard } from "@/components/custom/card/product-card";

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const orderId = Number(params.id);
  const { data: response, isPending, isError } = useOrder(orderId);
  const order = response?.data;

  const renderContent = () => {
    if (!orderId || Number.isNaN(orderId)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Invalid Order</CardTitle>
            <CardDescription>
              The selected order id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Order Detail</CardTitle>
            <CardDescription>Loading order information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !order) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Order Not Found</CardTitle>
            <CardDescription>Unable to load this order.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_4fr]">
          <ProfileCard
            activeStatus={order.student.is_active}
            studentName={order.student?.name}
            studentEmail={order.student?.email}
          />
          <OrderCard order={order} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ProofImagesCard orderId={order.id} proofImages={order.proofImages} />
          <OrderHistoryCard histories={order.orderConfirmHistories} />
        </div>

        <ProductCard product={order.product} currency={order.currency} />
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Order Detail"
        routeListRight={[{ href: "/orders", label: "Orders" }]}
      />
      {renderContent()}
    </div>
  );
}
