import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OrderHistoryType } from "@/types/order";
import { OrderStatusBadge } from "../badge/order-status-badge";

type Props = {
  histories?: OrderHistoryType[];
};

export function OrderHistoryCard({ histories }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>Status changes and notes for this order.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {histories?.map((history) => (
          <div
            key={history.id}
            className="rounded-lg border p-3 space-y-3"
          >
            <div>
              <OrderStatusBadge order_status={history.status} /> By{" "}
              <span className="text-sm text-foreground">
                {history.admin?.name}
              </span>
            </div>
            <div className="text-sm border p-2 flex flex-col gap-2">
              <div className="text-xs text-muted-foreground">
                {new Date(history.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              {history.note ? <>{history.note}</> : "There is no note."}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
