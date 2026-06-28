"use client";

import EditProductForm from "@/app/(root)/(products)/products/(components)/edit-product-form";
import PageHeading from "@/components/layout/page-heading";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useProduct } from "@/hooks/use-product";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = Number(params.id);
  const { data: response, isPending, isError } = useProduct(productId);
  const product = response?.data;

  const renderContent = () => {
    if (!productId || Number.isNaN(productId)) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Invalid Product</CardTitle>
            <CardDescription>
              The selected product id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Edit Product</CardTitle>
            <CardDescription>Loading product details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
            <div className="h-9 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !product) {
      return (
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Product Not Found</CardTitle>
            <CardDescription>Unable to load this product.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return <EditProductForm productId={productId} product={product} />;
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Edit Product"
        routeListRight={[{ href: "/products", label: "Products" }]}
      />
      {renderContent()}
    </div>
  );
}
