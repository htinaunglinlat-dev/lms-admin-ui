"use client";

import EditAdminForm from "@/app/(root)/(admins)/admins/(components)/edit-admin-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAdmins } from "@/hooks/use-admin";
import { useParams } from "next/navigation";

export default function DashboardPage() {
  const params = useParams<{ id: string }>();
  const adminId = Number(params.id);
  const { adminByIdQuery } = useAdmins();
  const { data, isPending, isError } = adminByIdQuery(adminId);

  const admin = data?.data;

  const renderContent = () => {
    if (!adminId || Number.isNaN(adminId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Admin</CardTitle>
            <CardDescription>
              The selected admin id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Admin</CardTitle>
            <CardDescription>Loading admin details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !admin) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Admin Not Found</CardTitle>
            <CardDescription>
              Unable to load this admin account.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditAdminForm adminId={adminId} admin={admin} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Admin"
        routeListRight={[{ href: "/admins", label: "Admins" }]}
      />
      {renderContent()}
    </div>
  );
}
