"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-auth";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const router = useRouter();
  const { mutate } = useLogout();
  const handleLogout = () => {
    // connect auth logout here
    mutate();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-3 px-4 py-5 text-center">
      <Avatar>
        <AvatarFallback>HA</AvatarFallback>
      </Avatar>

      <div className="">
        <div className="text-xs font-semibold text-muted-foreground">
          Kyaw Gyi
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <LogOut className="size-4 text-red-500" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>Logout</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
