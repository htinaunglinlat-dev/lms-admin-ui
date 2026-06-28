
import PageHeading from "@/components/layout/page-heading";
import CourseTable from "./(components)/course-table";

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Courses" />
      <CourseTable />
    </div>
  );
}
