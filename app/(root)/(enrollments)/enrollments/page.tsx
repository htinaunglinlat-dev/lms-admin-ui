
import PageHeading from "@/components/layout/page-heading";
import EnrollmentTable from "@/app/(root)/(enrollments)/enrollments/(components)/enrollment-table";

export default function EnrollmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Enrollments" />
      <EnrollmentTable />
    </div>
  );
}
