"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useUpdateEnrollment } from "@/hooks/use-enrollment";
import { extractErrorMessage } from "@/lib/error";
import { EnrollmentType } from "@/types/enrollment";

type EditEnrollmentFormProps = {
  enrollment: EnrollmentType;
  setOpen?: (open: boolean) => void;
};

export default function EditEnrollmentForm({
  enrollment,
  setOpen,
}: EditEnrollmentFormProps) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(enrollment.is_active);
  const updateEnrollment = useUpdateEnrollment();

  const handleSubmit = () => {
    updateEnrollment.mutate(
      { id: enrollment.id, payload: { is_active: isActive } },
      {
        onSuccess: () => {
          toast.success("Enrollment updated successfully");
          if (setOpen) {
            setOpen(false);
          } else {
            router.push("/enrollments");
          }
        },
        onError: (error: unknown) => {
          const errorMessage = extractErrorMessage(error);
          toast.error(errorMessage);
        },
      },
    );
  };

  return (
    <>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="edit-enrollment-status">Status</FieldLabel>
          <Input
            id="edit-enrollment-status"
            placeholder="true or false"
            value={isActive ? "true" : "false"}
            onChange={(e) =>
              setIsActive(e.target.value.toLowerCase() === "true")
            }
          />
        </Field>
      </FieldGroup>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() =>
            setOpen ? setOpen(false) : router.push("/enrollments")
          }
          disabled={updateEnrollment.isPending}
        >
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={updateEnrollment.isPending}>
          {updateEnrollment.isPending && (
            <Loader2 className="animate-spin mr-2" />
          )}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
