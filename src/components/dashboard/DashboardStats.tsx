import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function DashboardStats() {
  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const [
        { count: productsCount },
        { count: caseStudiesCount },
        { count: teamMembersCount },
        { count: contactFormsCount }
      ] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('case_studies').select('*', { count: 'exact', head: true }),
        supabase.from('team_members').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true })
      ]);

      return {
        products: productsCount || 0,
        caseStudies: caseStudiesCount || 0,
        teamMembers: teamMembersCount || 0,
        contactForms: contactFormsCount || 0
      };
    }
  });

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white font-chakra">{stats?.products || 0}</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Case Studies</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white font-chakra">{stats?.caseStudies || 0}</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white font-chakra">{stats?.teamMembers || 0}</div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-amber-500/20 to-amber-600/20 border-none">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white/80">Contact Forms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white font-chakra">{stats?.contactForms || 0}</div>
        </CardContent>
      </Card>
    </div>
  );
}