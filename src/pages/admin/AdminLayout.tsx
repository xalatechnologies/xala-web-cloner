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
  Wrench,
  Settings,
  LogOut,
  Target,
  BookOpen,
  Globe,
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
    { id: 'business-content', title: 'Business Content', icon: Target, path: '/admin/business-content' },
    { id: 'translations', title: 'Translations', icon: Globe, path: '/admin/translations' },
    { id: 'team', title: 'Team', icon: Users, path: '/admin/team' },
    { id: 'case-studies', title: 'Case Studies', icon: FileText, path: '/admin/case-studies' },
    { id: 'products', title: 'Products', icon: Box, path: '/admin/products' },
    { id: 'services', title: 'Services', icon: Wrench, path: '/admin/services' },
    { id: 'settings', title: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background font-chakra">
        <Sidebar className="border-r border-border">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-foreground">Xala CMS</h1>
          </div>
          
          <SidebarContent>
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
                        className={`transition-colors duration-200 ${
                          activeItem === item.id ? 'bg-accent text-accent-foreground' : 'text-foreground hover:bg-muted'
                        }`}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                  
                  <SidebarMenuItem>
                    <SidebarMenuButton 
                      onClick={handleLogout} 
                      className="text-red-600 hover:text-red-500 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;