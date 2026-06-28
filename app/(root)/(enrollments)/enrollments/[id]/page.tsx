"use client";

import PageHeading from "@/components/layout/page-heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatReadableDate } from "@/lib/date";
import { useEnrollment } from "@/hooks/use-enrollment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { StatusBadge } from "@/components/custom/badge/status-badge";

const formatValue = (value: unknown) => {
  if (value === null || value === undefined || value === "") {
    return "-";
  }
  return String(value);
};

const enrollmentTypeBadgeClass = (type: string) => {
  switch (type) {
    case "ORDER":
      return "bg-emerald-600 hover:bg-emerald-700 text-white border-transparent px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase";
    case "FREE":
      return "bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase";
    case "GIVEAWAY":
      return "border-amber-500 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase";
    default:
      return "";
  }
};

export default function EnrollmentDetailPage() {
  const params = useParams<{ id: string }>();
  const enrollmentId = Number(params.id);
  const { data: response, isPending, isError } = useEnrollment(enrollmentId);
  const enrollment = response?.data;

  const renderContent = () => {
    if (!enrollmentId || Number.isNaN(enrollmentId)) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Invalid Enrollment</CardTitle>
            <CardDescription>
              The selected enrollment id is not valid.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    if (isPending) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Detail</CardTitle>
            <CardDescription>Loading enrollment information.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
            <div className="h-24 rounded-md bg-muted" />
          </CardContent>
        </Card>
      );
    }

    if (isError || !enrollment) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Enrollment Not Found</CardTitle>
            <CardDescription>Unable to load this enrollment.</CardDescription>
          </CardHeader>
        </Card>
      );
    }

    const studentInitials = enrollment.student?.name
      ? enrollment.student.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      : "??";

    return (
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_4fr]">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-3">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
                  {studentInitials}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium">
                    {formatValue(enrollment.student?.name)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatValue(enrollment.student?.email)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatValue(enrollment.student?.phone)}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono mt-1">
                    UID: {formatValue(enrollment.student?.student_uid)}
                  </p>
                </div>
                <StatusBadge isActive={enrollment.student?.is_active} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Enrollment #{enrollment.id}</CardTitle>
                <CardDescription>
                  Created {formatReadableDate(enrollment.enrolled_at)}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-3">
                <Badge
                  variant={
                    enrollment.enrollment_type === "ORDER"
                      ? "default"
                      : enrollment.enrollment_type === "FREE"
                        ? "secondary"
                        : "outline"
                  }
                  className={enrollmentTypeBadgeClass(
                    enrollment.enrollment_type,
                  )}
                >
                  {enrollment.enrollment_type}
                </Badge>
                <StatusBadge isActive={enrollment.is_active} />
                <Button asChild variant="outline" size="sm">
                  <Link href={`/enrollments/edit/${enrollment.id}`}>
                    <Edit className="mr-1 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Enrollment Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Enrolled At</TableHead>
                    <TableHead>Expires At</TableHead>
                    <TableHead>Completed At</TableHead>
                    <TableHead>Updated At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Badge
                        variant={
                          enrollment.enrollment_type === "ORDER"
                            ? "default"
                            : enrollment.enrollment_type === "FREE"
                              ? "secondary"
                              : "outline"
                        }
                        className={enrollmentTypeBadgeClass(
                          enrollment.enrollment_type,
                        )}
                      >
                        {enrollment.enrollment_type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <StatusBadge isActive={enrollment.is_active} />
                    </TableCell>
                    <TableCell>
                      {formatReadableDate(enrollment.enrolled_at)}
                    </TableCell>
                    <TableCell>
                      {enrollment.expires_at
                        ? formatReadableDate(enrollment.expires_at)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {enrollment.completed_at
                        ? formatReadableDate(enrollment.completed_at)
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {formatReadableDate(enrollment.updated_at)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              Admin: {formatValue(enrollment.admin?.name)} (
              {formatValue(enrollment.admin?.email)})
            </CardFooter>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{formatValue(enrollment.course?.title)}</CardTitle>
              <CardDescription>
                {formatValue(enrollment.course?.short_description)}
              </CardDescription>
              <div className="flex items-center gap-4 pt-2">
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {enrollment.course?.level}
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                  {enrollment.course?.language}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    enrollment.course?.is_published
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400"
                  }`}
                >
                  {enrollment.course?.is_published ? "Published" : "Draft"}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              {enrollment.course?.thumbnail_url && (
                <div className="overflow-hidden rounded-md border mb-4">
                  <img
                    src={enrollment.course.thumbnail_url}
                    alt={enrollment.course.title}
                    className="aspect-video w-full object-cover"
                  />
                </div>
              )}
              {enrollment.course?.categories?.length ? (
                <div className="flex flex-wrap gap-2">
                  {enrollment.course.categories.map((category) => (
                    <span
                      key={category.id}
                      className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground">
                  No categories assigned.
                </div>
              )}
            </CardContent>
          </Card>

          {enrollment.order && (
            <Card>
              <CardHeader>
                <CardTitle>Order #{enrollment.order.id}</CardTitle>
                <CardDescription>
                  Payment information for this enrollment.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">
                        {enrollment.order.amount}
                      </TableCell>
                      <TableCell>{enrollment.order.currency}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            enrollment.order.status === "APPROVED"
                              ? "default"
                              : enrollment.order.status === "REJECTED"
                                ? "destructive"
                                : "secondary"
                          }
                          className={
                            enrollment.order.status === "APPROVED"
                              ? "bg-emerald-600 text-white"
                              : ""
                          }
                        >
                          {enrollment.order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {formatReadableDate(enrollment.order.created_at)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/orders/detail/${enrollment.order.id}`}>
                    View Order Detail
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeading
        heading="Enrollment Detail"
        routeListRight={[{ href: "/enrollments", label: "Enrollments" }]}
      />
      {renderContent()}
    </div>
  );
}
