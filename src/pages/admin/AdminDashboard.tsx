import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

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
    { title: 'Team Members', value: stats?.teamCount || 0, color: 'from-blue-500 to-blue-600' },
    { title: 'Case Studies', value: stats?.caseStudiesCount || 0, color: 'from-purple-500 to-purple-600' },
    { title: 'Products', value: stats?.productsCount || 0, color: 'from-green-500 to-green-600' },
    { title: 'Services', value: stats?.servicesCount || 0, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className={`p-6 bg-gradient-to-br ${stat.color} border-none`}>
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-20 bg-white/20" />
                <Skeleton className="h-8 w-16 bg-white/20" />
              </div>
            ) : (
              <>
                <h3 className="text-white/80 font-medium">{stat.title}</h3>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;