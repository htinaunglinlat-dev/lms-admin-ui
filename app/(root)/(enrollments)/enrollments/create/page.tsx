import PageHeading from "@/components/layout/page-heading";
import CreateEnrollmentForm from "../(components)/create-enrollment-form";

export default function CreateEnrollmentPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Enrollment"
        routeListRight={[{ href: "/enrollments", label: "Enrollments" }]}
      />
      <CreateEnrollmentForm />
    </div>
  );
}
