import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  FileText,
  Box,
  Briefcase,
  Settings,
  LogOut,
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    } else {
      navigate('/admin');
    }
  };

  const menuItems = [
    { id: 'dashboard', title: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { id: 'team', title: 'Team', icon: Users, path: '/admin/team' },
    { id: 'case-studies', title: 'Case Studies', icon: FileText, path: '/admin/case-studies' },
    { id: 'products', title: 'Products', icon: Box, path: '/admin/products' },
    { id: 'services', title: 'Services', icon: Briefcase, path: '/admin/services' },
    { id: 'settings', title: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-xala-primary to-xala-secondary">
        <Sidebar className="border-r border-white/10">
          <SidebarContent>
            <div className="p-4">
              <h1 className="text-xl font-bold text-white">Admin CMS</h1>
            </div>
            
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => {
                          setActiveItem(item.id);
                          navigate(item.path);
                        }}
                        className={activeItem === item.id ? 'bg-white/10' : ''}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={handleLogout} className="text-red-400 hover:text-red-300">
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;