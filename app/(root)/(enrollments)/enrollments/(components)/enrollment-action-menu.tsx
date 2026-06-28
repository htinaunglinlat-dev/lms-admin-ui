import GenericFormDialog from "@/components/custom/elements/generic-form-dialog";
import { TooltipButton } from "@/components/custom/elements/tooltip-button";

import { useRouter } from "next/navigation";
import EditEnrollmentForm from "./edit-enrollment-form";
import { EnrollmentType } from "@/types/enrollment";

type Props = {
  enrollment: EnrollmentType;
};

export function EnrollmentActionMenu({ enrollment }: Props) {
  const router = useRouter();

  const onView = () => {
    if (!enrollment.id) return;
    router.push(`/enrollments/${enrollment.id}`);
  };

  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <div className="flex gap-2">
      <TooltipButton type="view" onClick={() => onView()} />
      <GenericFormDialog
        trigger={<TooltipButton type="edit" />}
        title="Edit Enrollment"
        description={`Update the status for enrollment #${enrollment.id}.`}
      >
        {({ setOpen }) => (
          <EditEnrollmentForm enrollment={enrollment} setOpen={setOpen} />
        )}
      </GenericFormDialog>
      <TooltipButton type="delete" onClick={() => onDelete()} />
    </div>
  );
}
