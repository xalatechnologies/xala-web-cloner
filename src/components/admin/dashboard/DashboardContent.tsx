import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LayoutDashboard, Users, FileText, Wrench, Pencil, Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export function DashboardContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<any>(null);
  const [formData, setFormData] = useState({
    section_name: '',
    title: '',
    language: 'en',
    sort_order: 0
  });

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

  const createMutation = useMutation({
    mutationFn: async (newSection: any) => {
      const { data, error } = await supabase
        .from('sections')
        .insert([newSection])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      toast({ title: "Success", description: "Section created successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to create section", 
        variant: "destructive" 
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedSection: any) => {
      const { data, error } = await supabase
        .from('sections')
        .update(updatedSection)
        .eq('id', editingSection.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      toast({ title: "Success", description: "Section updated successfully" });
      setIsDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to update section", 
        variant: "destructive" 
      });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('sections')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sections'] });
      toast({ title: "Success", description: "Section deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: "Failed to delete section", 
        variant: "destructive" 
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSection) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      section_name: '',
      title: '',
      language: 'en',
      sort_order: 0
    });
    setEditingSection(null);
  };

  const handleEdit = (section: any) => {
    setEditingSection(section);
    setFormData({
      section_name: section.section_name,
      title: section.title,
      language: section.language,
      sort_order: section.sort_order
    });
    setIsDialogOpen(true);
  };

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
    <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-chakra">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`border-none bg-gradient-to-br ${stat.color} hover:scale-105 transition-transform duration-200`}
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

      <Card className="border-none bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white font-chakra">
            Website Sections
          </CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Section
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 text-white">
              <DialogHeader>
                <DialogTitle>{editingSection ? 'Edit Section' : 'Add New Section'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Section Name</label>
                  <Input
                    value={formData.section_name}
                    onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-md p-2"
                    required
                  >
                    <option value="en">English</option>
                    <option value="no">Norwegian</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                    {editingSection ? 'Update' : 'Create'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {sectionsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-white">Section Name</TableHead>
                    <TableHead className="text-white">Title</TableHead>
                    <TableHead className="text-white">Language</TableHead>
                    <TableHead className="text-white">Sort Order</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sections?.map((section) => (
                    <TableRow 
                      key={section.id}
                      className="border-gray-700 hover:bg-gray-800/50 transition-colors"
                    >
                      <TableCell className="text-white/70">{section.section_name}</TableCell>
                      <TableCell className="text-white/70">{section.title}</TableCell>
                      <TableCell className="text-white/70">{section.language}</TableCell>
                      <TableCell className="text-white/70">{section.sort_order}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(section)}
                            className="hover:bg-gray-700"
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              if (window.confirm('Are you sure you want to delete this section?')) {
                                deleteMutation.mutate(section.id);
                              }
                            }}
                            className="hover:bg-red-900/50 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}