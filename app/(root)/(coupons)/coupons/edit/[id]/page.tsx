
import EditCouponForm from "@/app/(root)/(coupons)/coupons/(components)/edit-coupon-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCoupon } from "@/hooks/use-coupon";
import { useParams } from "next/navigation";

export default function EditCouponPage() {
  const params = useParams<{ id: string }>();
  const couponId = Number(params.id);
  const { data: response, isPending, isError } = useCoupon(couponId);
  const coupon = response?.data;

  const renderContent = () => {
    if (!couponId || Number.isNaN(couponId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Coupon</CardTitle>
            <CardDescription>
              The selected coupon id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Coupon</CardTitle>
            <CardDescription>Loading coupon details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !coupon) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Coupon Not Found</CardTitle>
            <CardDescription>Unable to load this coupon.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditCouponForm couponId={couponId} coupon={coupon} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Coupon"
        routeListRight={[{ href: "/coupons", label: "Coupons" }]}
      />
      {renderContent()}
    </div>
  );
}
