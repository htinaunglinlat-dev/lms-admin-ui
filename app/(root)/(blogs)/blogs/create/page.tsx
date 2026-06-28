import PageHeading from "@/components/layout/page-heading";
import CreateBlogForm from "../(components)/create-blog-form";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Blog"
        routeListRight={[{ href: "/blogs", label: "Blogs" }]}
      />
      <CreateBlogForm />
    </div>
  );
}
