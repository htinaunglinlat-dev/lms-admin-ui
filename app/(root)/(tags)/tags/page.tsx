import PageHeading from "@/components/layout/page-heading";
import TagTable from "./(components)/tag-table";

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Tags" />
      <TagTable />
    </div>
  );
}
