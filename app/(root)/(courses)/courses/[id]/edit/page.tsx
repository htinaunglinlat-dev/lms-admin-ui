"use client";

import EditCourseForm from "@/app/(root)/(courses)/courses/(components)/edit-course-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCourse } from "@/hooks/use-course";
import { useParams } from "next/navigation";

export default function EditCoursePage() {
  const params = useParams<{ id: string }>();
  const courseId = Number(params.id);
  const { data: response, isPending, isError } = useCourse(courseId);
  const course = response?.data;

  const renderContent = () => {
    if (!courseId || Number.isNaN(courseId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Course</CardTitle>
            <CardDescription>
              The selected course id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
            <CardDescription>Loading course details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !course) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Course Not Found</CardTitle>
            <CardDescription>Unable to load this course.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditCourseForm courseId={courseId} course={course} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Course"
        routeListRight={[{ href: "/courses", label: "Courses" }]}
      />
      {renderContent()}
    </div>
  );
}
