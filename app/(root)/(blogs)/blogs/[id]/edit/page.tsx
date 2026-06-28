"use client";

import EditBlogForm from "@/app/(root)/(blogs)/blogs/(components)/edit-blog-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBlog } from "@/hooks/use-blog";
import { useParams } from "next/navigation";

export default function EditBlogPage() {
  const params = useParams<{ id: string }>();
  const blogId = Number(params.id);
  const { data: response, isPending, isError } = useBlog(blogId);
  const blog = response?.data;

  const renderContent = () => {
    if (!blogId || Number.isNaN(blogId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Blog</CardTitle>
            <CardDescription>
              The selected blog id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Blog</CardTitle>
            <CardDescription>Loading blog details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !blog) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Blog Not Found</CardTitle>
            <CardDescription>Unable to load this blog post.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditBlogForm blogId={blogId} blog={blog} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Blog"
        routeListRight={[{ href: "/blogs", label: "Blogs" }]}
      />
      {renderContent()}
    </div>
  );
}
