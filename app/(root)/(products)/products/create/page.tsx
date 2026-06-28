
import PageHeading from "@/components/layout/page-heading";
import CreateProductForm from "../(components)/create-product-form";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        heading="Add Product"
        routeListRight={[{ href: "/products", label: "Products" }]}
      />
      <CreateProductForm />
    </div>
  );
}
