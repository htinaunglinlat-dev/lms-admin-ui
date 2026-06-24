"use client";

import EditEnrollmentForm from "@/app/(root)/(enrollments)/enrollments/(components)/edit-enrollment-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEnrollment } from "@/hooks/use-enrollment";
import { useParams } from "next/navigation";

export default function EditEnrollmentPage() {
  const params = useParams<{ id: string }>();
  const enrollmentId = Number(params.id);
  const { data: response, isPending, isError } = useEnrollment(enrollmentId);
  const enrollment = response?.data;

  const renderContent = () => {
    if (!enrollmentId || Number.isNaN(enrollmentId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Enrollment</CardTitle>
            <CardDescription>
              The selected enrollment id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Enrollment</CardTitle>
            <CardDescription>Loading enrollment details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !enrollment) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Enrollment Not Found</CardTitle>
            <CardDescription>Unable to load this enrollment.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditEnrollmentForm enrollment={enrollment} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Enrollment"
        routeListRight={[{ href: "/enrollments", label: "Enrollments" }]}
      />
      {renderContent()}
    </div>
  );
}
