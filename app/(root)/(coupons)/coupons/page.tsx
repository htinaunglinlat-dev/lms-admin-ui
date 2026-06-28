
import PageHeading from "@/components/layout/page-heading";
import CouponTable from "./(components)/coupon-table";

export default function CouponsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Coupons" />
      <CouponTable />
    </div>
  );
}
