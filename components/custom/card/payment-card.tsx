import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "../badge/status-badge";

type Props = {
  payment_logo_url: string;
  payment_name: string;
  payment_account_no: string;
  payment_status: boolean;
};

export function PaymentCard({
  payment_logo_url,
  payment_name,
  payment_account_no,
  payment_status,
}: Props) {
  return (
    <Card className="p-1">
      <CardContent className="flex items-center gap-4 p-2">
        {/* Left Side: Payment Provider Logo */}
        <img src={payment_logo_url} alt="Payment Logo" className="h-10 w-10" />

        {/* Right Side: Identity Details & Current Status */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            {/* Payment Provider Name */}
            <h4 className="text-base font-semibold tracking-tight text-card-foreground truncate">
              {payment_name ?? "-"}
            </h4>

            {/* Status Badge */}
            <StatusBadge isActive={payment_status} />
          </div>

          {/* Subtext: Account Details */}
          <p className="text-sm font-normal text-muted-foreground tabular-nums">
            {payment_account_no ?? "-"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
