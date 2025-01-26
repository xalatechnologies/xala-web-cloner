import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";
import { type Database } from "@/integrations/supabase/types";
import { ServicesTable } from "./ServicesTable";
import { ServicesDialogs } from "./ServicesDialogs";

type SupportedLanguage = Database['public']['Enums']['supported_language'];

interface FormData {
  title: string;
  description: string;
  icon: string;
  language: SupportedLanguage;
  sort_order: number;
  featured: boolean;
}

export function ServicesContent() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<SupportedLanguage | "all">("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  }>({ key: 'sort_order', direction: 'asc' });

  // Dialog states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    icon: '',
    language: 'en',
    sort_order: 0,
    featured: false
  });

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', sortConfig],
    queryFn: async () => {
      const query = supabase
        .from('services')
        .select('*')
        .order(sortConfig.key, { ascending: sortConfig.direction === 'asc' });

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error fetching services",
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

  const filteredServices = services?.filter(service => {
    const matchesSearch = searchTerm.toLowerCase() === '' || 
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesLanguage = filterLanguage === 'all' || service.language === filterLanguage;

    return matchesSearch && matchesLanguage;
  });

  const handleCreate = async () => {
    const { error } = await supabase
      .from('services')
      .insert(formData);

    if (error) {
      toast({
        title: "Error creating service",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service created successfully",
      });
      setIsCreateDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['services'] });
      setFormData({
        title: '',
        description: '',
        icon: '',
        language: 'en',
        sort_order: 0,
        featured: false
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedService) return;

    const { error } = await supabase
      .from('services')
      .update(formData)
      .eq('id', selectedService.id);

    if (error) {
      toast({
        title: "Error updating service",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service updated successfully",
      });
      setIsEditDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  };

  const handleDelete = async () => {
    if (!selectedService) return;

    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', selectedService.id);

    if (error) {
      toast({
        title: "Error deleting service",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Service deleted successfully",
      });
      setIsDeleteDialogOpen(false);
      queryClient.invalidateQueries({ queryKey: ['services'] });
    }
  };

  const openEditDialog = (service: any) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon,
      language: service.language as SupportedLanguage,
      sort_order: service.sort_order,
      featured: service.featured
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (service: any) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  return (
    <main className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-white font-chakra">Services</h1>
      </div>

      <Card className="border-none bg-gradient-to-br from-gray-900/50 to-gray-800/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white font-chakra">Manage Services</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 w-[200px]"
                />
              </div>
              <Select 
                value={filterLanguage} 
                onValueChange={(value: SupportedLanguage | "all") => setFilterLanguage(value)}
              >
                <SelectTrigger className="w-[120px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="all" className="text-white hover:bg-gray-700">All Languages</SelectItem>
                  <SelectItem value="en" className="text-white hover:bg-gray-700">English</SelectItem>
                  <SelectItem value="no" className="text-white hover:bg-gray-700">Norwegian</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-500 hover:bg-blue-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Service
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ServicesTable
            services={filteredServices}
            handleSort={handleSort}
            openEditDialog={openEditDialog}
            openDeleteDialog={openDeleteDialog}
          />
        </CardContent>
      </Card>

      <ServicesDialogs
        isCreateDialogOpen={isCreateDialogOpen}
        setIsCreateDialogOpen={setIsCreateDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreate={handleCreate}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </main>
  );
}
