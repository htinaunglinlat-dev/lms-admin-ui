import { AppSidebar } from "@/components/sitebar/app-sidebar";
import { SiteHeader } from "@/components/sitebar/site-header";
// import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function SitebarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 50)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <Toaster />
      <AppSidebar variant="inset" />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
