import PageHeading from "@/components/layout/page-heading";
import CourseStructure from "./components/course-structure";

interface ManageCourseStructureProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ManageCourseStructure({
  params,
}: ManageCourseStructureProps) {
  const { id } = await params;
  const courseId = Number(id);

  return (
    <div className="container max-w-4xl space-y-6">
      <PageHeading
        heading="Manage Course"
        routeListRight={[
          { href: "/courses", label: "Courses" },
          { href: `/courses/${courseId}/edit`, label: "Course Details" },
        ]}
      />
      <CourseStructure courseId={courseId} />
    </div>
  );
}
