"use client";

import React from "react";
import PageHeading from "@/components/layout/page-heading";
import CreateAdminForm from "../(components)/create-admin-form";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Admin"
        routeListRight={[{ href: "/admins", label: "Admins" }]}
      />
      <CreateAdminForm />
    </div>
  );
}
