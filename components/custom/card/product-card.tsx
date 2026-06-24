import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatValue } from "@/app/(root)/(orders)/orders/(components)/order-format";
import { formatCurrency } from "@/lib/currency";
import { CurrencyEnum } from "@/types/product";

type Props = {
  product?: {
    name?: string;
    description?: string;
    price: number;
    is_active: boolean;
    courses?: {
      id: number;
      title: string;
      short_description: string;
      thumbnail_url: string;
      level: string;
      language: string;
    }[];
  };
  currency: CurrencyEnum;
};

export function ProductCard({ product, currency }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{formatValue(product?.name)}</CardTitle>
        <CardDescription>
          {formatValue(product?.description)}
        </CardDescription>
        <div className="flex items-center gap-4 pt-2">
          <span className="text-sm font-semibold">
            {product ? formatCurrency(product.price, currency) : "-"}
          </span>
          <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
            {product?.is_active ? "Active" : "Inactive"}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        {product?.courses?.length ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {product.courses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-md border"
              >
                <img
                  src={course.thumbnail_url}
                  alt={course.title}
                  className="aspect-video w-full object-cover"
                />
                <div className="space-y-2 p-3">
                  <h5 className="text-sm font-medium leading-none">
                    {course.title}
                  </h5>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {course.short_description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {course.level}
                    </span>
                    <span className="inline-flex items-center rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                      {course.language}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border px-4 py-8 text-center text-sm text-muted-foreground">
            No courses included.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
