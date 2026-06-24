import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatReadableDate } from "@/lib/date";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/types/order";
import { PaymentCard } from "./payment-card";
import { OrderStatusBadge } from "../badge/order-status-badge";
import OrderFormDialog from "@/app/(root)/(orders)/orders/(components)/order-form-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { formatCurrency } from "@/lib/currency";

type Props = {
  order: OrderType;
};

export function OrderCard({ order }: Props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order #{order.id}</CardTitle>
          <CardDescription>
            Created {formatReadableDate(order.created_at)}
          </CardDescription>
        </div>
        <PaymentCard
          payment_account_no={order.payment?.account_no}
          payment_logo_url={order.payment?.logo_url}
          payment_name={order.payment?.name}
          payment_status={order.payment?.is_active}
        />
        <div className="flex flex-col items-center gap-3">
          <OrderStatusBadge order_status={order.status} />
          <OrderFormDialog
            order={order}
            trigger={
              <Button variant="outline" size="sm">
                <Edit className="mr-1 h-4 w-4" />
                Edit
              </Button>
            }
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subtotal</TableHead>
              <TableHead>Currency</TableHead>
              <TableHead>Coupon</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right font-semibold text-foreground">
                Total
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {formatCurrency(order.amount, order.currency)}
              </TableCell>
              <TableCell>{order.currency}</TableCell>
              <TableCell>
                {order.coupon?.code ? (
                  <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {order.coupon.code}
                  </span>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>
                {formatCurrency(order.discount_amount, order.currency)}
              </TableCell>
              <TableCell className="text-right font-semibold">
                {formatCurrency(order.amount, order.currency)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
