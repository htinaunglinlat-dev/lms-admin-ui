"use client";

import PageHeading from "@/components/layout/page-heading";
import CreateStudentForm from "../(components)/create-student-form";

export default function CreateStudentPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Student"
        routeListRight={[{ href: "/students", label: "Students" }]}
      />
      <CreateStudentForm />
    </div>
  );
}
