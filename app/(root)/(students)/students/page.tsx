import PageHeading from "@/components/layout/page-heading";
import StudentTable from "./(components)/student-table";

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Students" />
      <StudentTable />
    </div>
  );
}
