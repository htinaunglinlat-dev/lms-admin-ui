import PageHeading from "@/components/layout/page-heading";
import BlogTable from "./(components)/blog-table";

export default function BlogsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Blogs" />
      <BlogTable />
    </div>
  );
}
