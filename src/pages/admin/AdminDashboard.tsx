import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Users, 
  FileText, 
  Package, 
  Wrench,
  ArrowUpRight
} from 'lucide-react';

const AdminDashboard = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        { count: teamCount },
        { count: caseStudiesCount },
        { count: productsCount },
        { count: servicesCount },
      ] = await Promise.all([
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('case_studies').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('services').select('*', { count: 'exact', head: true }),
      ]);

      return {
        teamCount: teamCount || 0,
        caseStudiesCount: caseStudiesCount || 0,
        productsCount: productsCount || 0,
        servicesCount: servicesCount || 0,
      };
    },
  });

  const statCards = [
    { 
      title: 'Team Members', 
      value: stats?.teamCount || 0, 
      icon: Users,
      color: 'from-blue-500/20 to-blue-600/20',
      accentColor: 'text-blue-500'
    },
    { 
      title: 'Case Studies', 
      value: stats?.caseStudiesCount || 0, 
      icon: FileText,
      color: 'from-purple-500/20 to-purple-600/20',
      accentColor: 'text-purple-500'
    },
    { 
      title: 'Products', 
      value: stats?.productsCount || 0, 
      icon: Package,
      color: 'from-emerald-500/20 to-emerald-600/20',
      accentColor: 'text-emerald-500'
    },
    { 
      title: 'Services', 
      value: stats?.servicesCount || 0, 
      icon: Wrench,
      color: 'from-amber-500/20 to-amber-600/20',
      accentColor: 'text-amber-500'
    },
  ];

  return (
    <div className="space-y-8 p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 font-chakra">Dashboard</h1>
          <p className="text-gray-400">Welcome to your admin dashboard</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card 
            key={stat.title} 
            className={`relative overflow-hidden transition-all duration-300 hover:translate-y-[-4px] border-none bg-gradient-to-br ${stat.color}`}
          >
            <div className="p-6 relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.accentColor} bg-white/10`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <ArrowUpRight className={`w-5 h-5 ${stat.accentColor}`} />
              </div>
              {isLoading ? (
                <div className="space-y-3">
                  <Skeleton className="h-4 w-20 bg-white/20" />
                  <Skeleton className="h-8 w-16 bg-white/20" />
                </div>
              ) : (
                <>
                  <p className="text-sm font-medium text-white/80">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-2 font-chakra">{stat.value}</p>
                </>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;