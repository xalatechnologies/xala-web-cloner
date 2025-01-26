import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase, 
  Newspaper,
  MessageSquare,
  Settings,
  LogOut
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard"
  },
  {
    title: "Team Members",
    icon: Users,
    href: "/dashboard/team"
  },
  {
    title: "Case Studies",
    icon: FileText,
    href: "/dashboard/case-studies"
  },
  {
    title: "Products",
    icon: Briefcase,
    href: "/dashboard/products"
  },
  {
    title: "Services",
    icon: Newspaper,
    href: "/dashboard/services"
  },
  {
    title: "Contact Forms",
    icon: MessageSquare,
    href: "/dashboard/contacts"
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings"
  }
];

export function DashboardSidebar() {
  return (
    <Sidebar>
      <div className="flex h-16 items-center border-b px-6">
        <span className="font-semibold">Xala CMS</span>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button className="flex w-full items-center gap-3 text-destructive">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="absolute right-[-12px] top-7">
        <SidebarTrigger />
      </div>
    </Sidebar>
  );
}