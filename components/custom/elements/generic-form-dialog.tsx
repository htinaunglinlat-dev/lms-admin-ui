"use client";

import { ReactNode, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type GenericFormDialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: (props: { setOpen: (open: boolean) => void }) => ReactNode;
};

export default function GenericFormDialog({
  trigger,
  title,
  description,
  children,
}: GenericFormDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children({ setOpen })}
      </DialogContent>
    </Dialog>
  );
}
