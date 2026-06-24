import PageHeading from "@/components/layout/page-heading";
import CreateCourseForm from "../(components)/create-course-form";

export default function CreateCoursePage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Course"
        routeListRight={[{ href: "/courses", label: "Courses" }]}
      />
      <CreateCourseForm />
    </div>
  );
}
