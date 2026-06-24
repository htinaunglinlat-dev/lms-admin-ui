"use client";

import PageHeading from "@/components/layout/page-heading";
import ProductTable from "./(components)/product-table";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <PageHeading heading="Products" />
      <ProductTable />
    </div>
  );
}
