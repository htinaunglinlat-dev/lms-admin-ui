import AdminTable from "./(components)/admin-table";
import PageHeading from "@/components/layout/page-heading";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Admins" />
      <AdminTable />
    </div>
  );
}
