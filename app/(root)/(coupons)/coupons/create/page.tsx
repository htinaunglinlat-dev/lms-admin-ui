import PageHeading from "@/components/layout/page-heading";
import CreateCouponForm from "../(components)/create-coupon-form";

export default function CreateCouponPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Coupon"
        routeListRight={[{ href: "/coupons", label: "Coupons" }]}
      />
      <CreateCouponForm />
    </div>
  );
}
