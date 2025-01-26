import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Eye, Pencil, Trash2, ArrowUpDown, Filter, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DashboardContent() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'sort_order', direction: 'asc' });

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

  const { data: sections, isLoading: sectionsLoading } = useQuery({
    queryKey: ['sections', sortConfig],
    queryFn: async () => {
      const query = supabase
        .from('sections')
        .select('*')
        .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching sections",
          description: error.message,
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleSort = (key: string) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const filteredSections = sections?.filter(section => {
    const matchesSearch = searchTerm.toLowerCase() === '' || 
      section.section_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = filterLanguage === 'all' || section.language === filterLanguage;

    return matchesSearch && matchesLanguage;
  });

  const handleCreate = () => {
    toast({
      title: "Create Section",
      description: "This feature will be implemented soon.",
    });
  };

  const handleView = (section: any) => {
    toast({
      title: "View Section",
      description: `Viewing section: ${section.title}`,
    });
  };

  const handleEdit = (section: any) => {
    toast({
      title: "Edit Section",
      description: `Editing section: ${section.title}`,
    });
  };

  const handleDelete = (section: any) => {
    toast({
      title: "Delete Section",
      description: `Deleting section: ${section.title}`,
    });
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-chakra">Dashboard</h1>
      </div>

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

      <Card className="border-none bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white font-chakra">Sections</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search sections..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 w-[200px]"
                />
              </div>
              <Select value={filterLanguage} onValueChange={setFilterLanguage}>
                <SelectTrigger className="w-[120px] bg-gray-800/50 border-gray-700 text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Languages</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="no">Norwegian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-700">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800/50">
                  <TableHead className="text-white/70 cursor-pointer" onClick={() => handleSort('section_name')}>
                    <div className="flex items-center">
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70 cursor-pointer" onClick={() => handleSort('title')}>
                    <div className="flex items-center">
                      Title
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70 cursor-pointer" onClick={() => handleSort('language')}>
                    <div className="flex items-center">
                      Language
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-white/70 cursor-pointer" onClick={() => handleSort('sort_order')}>
                    <div className="flex items-center">
                      Order
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right text-white/70">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSections?.map((section) => (
                  <TableRow key={section.id} className="border-gray-700 hover:bg-gray-800/50">
                    <TableCell className="font-chakra text-white">{section.section_name}</TableCell>
                    <TableCell className="font-chakra text-white">{section.title}</TableCell>
                    <TableCell className="font-chakra text-white">{section.language}</TableCell>
                    <TableCell className="font-chakra text-white">{section.sort_order}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button
                        onClick={() => handleView(section)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-700"
                      >
                        <Eye className="w-4 h-4 text-blue-400" />
                      </Button>
                      <Button
                        onClick={() => handleEdit(section)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-700"
                      >
                        <Pencil className="w-4 h-4 text-amber-400" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(section)}
                        variant="ghost"
                        size="icon"
                        className="hover:bg-gray-700"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}