"use client";

import EditStudentForm from "@/app/(root)/(students)/students/(components)/edit-student-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudent } from "@/hooks/use-student";
import { useParams } from "next/navigation";

export default function EditStudentPage() {
  const params = useParams<{ id: string }>();
  const studentId = Number(params.id);
  const { data: response, isPending, isError } = useStudent(studentId);
  const student = response?.data;

  const renderContent = () => {
    if (!studentId || Number.isNaN(studentId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Student</CardTitle>
            <CardDescription>
              The selected student id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Student</CardTitle>
            <CardDescription>Loading student details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !student) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Student Not Found</CardTitle>
            <CardDescription>
              Unable to load this student account.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditStudentForm studentId={studentId} student={student} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Student"
        routeListRight={[{ href: "/students", label: "Students" }]}
      />
      {renderContent()}
    </div>
  );
}
