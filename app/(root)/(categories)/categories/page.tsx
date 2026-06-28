
import PageHeading from "@/components/layout/page-heading";
import CategoryTable from "./(components)/category-table";

export default function CategoriesPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Categories" />
      <CategoryTable />
    </div>
  );
}
