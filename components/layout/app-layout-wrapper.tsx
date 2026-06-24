"use client";

import React, { useEffect } from "react";
import { useMe, useRefreshAccessToken } from "@/hooks/use-auth";
import { SitebarWrapper } from "../sitebar/sitebar-wrapper";
import { useRouter } from "next/navigation";

const AppLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data, isLoading, error } = useMe();

  useEffect(() => {
    if (!data && error && !isLoading) {
      router.push("/login");
    }
  }, [data, error, isLoading, router]);

  // Handle true loading presentation state isolated from errors
  if (isLoading || !data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        loading...
      </div>
    );
  }

  return <SitebarWrapper>{children}</SitebarWrapper>;
};

export default AppLayoutWrapper;
