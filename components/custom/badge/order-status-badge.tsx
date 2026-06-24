import { Badge } from "@/components/ui/badge";
import { OrderStatusEnum } from "@/types/order";

interface Props {
  order_status: OrderStatusEnum;
}

export function OrderStatusBadge({ order_status }: Props) {
  return (
    <Badge
      variant="default"
      className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-none border-none text-white ${
        order_status === "APPROVED"
          ? "bg-green-600 hover:bg-green-600"
          : order_status === "REJECTED"
            ? "bg-rose-600 hover:bg-rose-600"
            : "bg-amber-600 hover:bg-amber-600"
      }`}
    >
      {order_status}
    </Badge>
  );
}
