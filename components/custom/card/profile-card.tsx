import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "../badge/status-badge";

type Props = {
  studentName?: string;
  studentEmail?: string;
  activeStatus?: boolean;
};

export function ProfileCard({
  studentName,
  studentEmail,
  activeStatus,
}: Props) {
  const studentInitials = studentName
    ? studentName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "??";
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-lg font-semibold">
            {studentInitials}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium">{studentName ?? "-"}</p>
            <p className="text-xs text-muted-foreground">
              {studentEmail ?? "-"}
            </p>
          </div>
          <StatusBadge isActive={activeStatus} />
        </div>
      </CardContent>
    </Card>
  );
}
