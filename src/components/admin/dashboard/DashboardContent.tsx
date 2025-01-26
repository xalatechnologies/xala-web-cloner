import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Users, FileText, Wrench } from "lucide-react";

export function DashboardContent() {
  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ['sections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('sections')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  const stats = [
    {
      title: "Total Sections",
      value: sections?.length || 0,
      icon: LayoutDashboard,
      color: "from-purple-500/50 to-purple-600/50"
    },
    {
      title: "Team Members",
      value: "5",
      icon: Users,
      color: "from-blue-500/50 to-blue-600/50"
    },
    {
      title: "Case Studies",
      value: "12",
      icon: FileText,
      color: "from-green-500/50 to-green-600/50"
    },
    {
      title: "Services",
      value: "8",
      icon: Wrench,
      color: "from-orange-500/50 to-orange-600/50"
    }
  ];

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-chakra">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`border-none bg-gradient-to-br ${stat.color}`}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-bold text-white font-chakra">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-5 h-5 text-white/70" />
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white font-chakra">
            Website Sections
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sectionsLoading ? (
            <p className="text-white/70">Loading sections...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white">Section Name</TableHead>
                  <TableHead className="text-white">Title</TableHead>
                  <TableHead className="text-white">Language</TableHead>
                  <TableHead className="text-white text-right">Sort Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sections?.map((section) => (
                  <TableRow key={section.id}>
                    <TableCell className="text-white/70">{section.section_name}</TableCell>
                    <TableCell className="text-white/70">{section.title}</TableCell>
                    <TableCell className="text-white/70">{section.language}</TableCell>
                    <TableCell className="text-white/70 text-right">{section.sort_order}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  );
}