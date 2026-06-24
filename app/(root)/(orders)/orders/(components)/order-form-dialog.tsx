"use client";

import { ReactNode } from "react";
import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { OrderType } from "@/types/order";
import EditOrderForm from "./edit-order-form";

type OrderFormDialogProps = {
  order: OrderType;
  trigger: ReactNode;
};

export default function OrderFormDialog({
  order,
  trigger,
}: OrderFormDialogProps) {
  return (
    <GenericFormDialog
      trigger={trigger}
      title={`Edit Order #${order.id}`}
      description="Update the status and add a note for this order."
    >
      {({ setOpen }) => <EditOrderForm order={order} setOpen={setOpen} />}
    </GenericFormDialog>
  );
}
