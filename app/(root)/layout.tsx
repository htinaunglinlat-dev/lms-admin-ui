"use client";

import AppLayoutWrapper from "@/components/layout/app-layout-wrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <AppLayoutWrapper>{children}</AppLayoutWrapper>;
};

export default Layout;
