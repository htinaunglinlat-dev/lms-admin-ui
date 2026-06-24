"use client";

import {
  Users,
  Settings,
  TreePalm,
  LayoutDashboard,
  ShieldCheck,
  FolderKanban,
  ShoppingBag,
  BookOpen,
  TicketPercent,
  CreditCard,
  ReceiptText,
  GraduationCap,
  FileSignature,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard, // More specific for a main control panel than Gauge
  },
  {
    title: "Admins",
    url: "/admins",
    icon: ShieldCheck, // Represents administrative security, permissions, and oversight
  },
  {
    title: "Students",
    url: "/students",
    icon: GraduationCap, // Represents academic learners and individuals
  },
  {
    title: "Enrollments",
    url: "/enrollments",
    icon: FileSignature, // Represents the administrative act of registration or signing up
  },
  {
    title: "Courses",
    url: "/courses",
    icon: BookOpen, // Represents open course material and learning
  },
  {
    title: "Categories",
    url: "/categories", // Fixed the typo in the original URL string ("/catgories")
    icon: FolderKanban, // Represents structured grouping, sorting, or organization
  },
  {
    title: "Products",
    url: "/products",
    icon: ShoppingBag, // Represents physical or digital goods for sale better than CreditCard
  },
  {
    title: "Payments",
    url: "/payments",
    icon: CreditCard, // Represents physical or digital goods for sale better than CreditCard
  },
  {
    title: "Orders",
    url: "/orders",
    icon: ReceiptText,
  },
  {
    title: "Coupons",
    url: "/coupons",
    icon: TicketPercent, // Represents open course material and learning
  },
  {
    title: "Setting",
    url: "/setting",
    icon: Settings, // Kept for configuration and system preferences
  },
];

export const AppSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  const pathName = usePathname();

  const isActive = (url: string) =>
    url === "/"
      ? pathName === url
      : pathName.startsWith(`${url}/`) || pathName === url;

  return (
    <Sidebar {...props} variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link href="/">
                <div className="text-blue-500 bg-clip-text flex gap-3">
                  <TreePalm className="size-5!" />
                  <span className="font-semibold ">
                    {/* <span className="text-base font-semibold">Acme Inc.</span> */}
                    Lucky7&One
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => {
              const active = isActive(item.url);

              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={active}
                    className={cn(
                      active
                        ? "data-active:bg-sidebar-primary data-active:text-sidebar-primary-foreground hover:bg-sidebar-primary/90 hover:text-sidebar-primary-foreground [&>svg]:text-sidebar-primary-foreground"
                        : "data-active:bg-transparent data-active:font-normal data-active:text-sidebar-foreground [&>svg]:text-sidebar-foreground",
                    )}
                  >
                    <Link
                      href={item.url}
                      aria-current={active ? "page" : undefined}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
