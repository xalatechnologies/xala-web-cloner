import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type Database } from "@/integrations/supabase/types";
import { Wand2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type SupportedLanguage = Database['public']['Enums']['supported_language'];

interface FormData {
  section_name: string;
  title: string;
  description: string;
  language: SupportedLanguage;
  sort_order: number;
}

interface SectionDialogsProps {
  isCreateDialogOpen: boolean;
  setIsCreateDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  handleCreate: () => void;
  handleEdit: () => void;
  handleDelete: () => void;
}

export function SectionDialogs({
  isCreateDialogOpen,
  setIsCreateDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  formData,
  setFormData,
  handleCreate,
  handleEdit,
  handleDelete
}: SectionDialogsProps) {
  const { toast } = useToast();
  const [isEnhancing, setIsEnhancing] = useState<{[key: string]: boolean}>({});

  const enhanceText = async (field: keyof Pick<FormData, 'title' | 'description'>) => {
    setIsEnhancing(prev => ({ ...prev, [field]: true }));
    try {
      const { data, error } = await supabase.functions.invoke('enhance-text', {
        body: { 
          text: formData[field], 
          type: field,
          language: formData.language // Pass the current language
        }
      });

      if (error) throw error;

      if (data.enhancedText) {
        setFormData({
          ...formData,
          [field]: data.enhancedText
        });
        
        toast({
          title: "Text Enhanced",
          description: "The text has been professionally enhanced.",
        });
      }
    } catch (error) {
      console.error('Error enhancing text:', error);
      toast({
        title: "Enhancement Failed",
        description: "Failed to enhance the text. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEnhancing(prev => ({ ...prev, [field]: false }));
    }
  };

  const DialogForm = ({ onSubmit, submitText }: { onSubmit: () => void, submitText: string }) => (
    <div className="grid gap-6 py-4">
      <div className="grid gap-2">
        <Label htmlFor="section_name">Section Name</Label>
        <Input
          id="section_name"
          value={formData.section_name}
          onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <div className="relative">
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#D946EF] transition-all duration-500 pr-12"
          />
          <Button
            type="button"
            onClick={() => enhanceText('title')}
            disabled={isEnhancing.title || !formData.title}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            size="icon"
          >
            <Wand2 className={`h-4 w-4 ${isEnhancing.title ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <div className="relative">
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#0EA5E9] transition-all duration-500 pr-12"
          />
          <Button
            type="button"
            onClick={() => enhanceText('description')}
            disabled={isEnhancing.description || !formData.description}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-300"
            size="icon"
          >
            <Wand2 className={`h-4 w-4 ${isEnhancing.description ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="language">Language</Label>
        <Select
          value={formData.language}
          onValueChange={(value: SupportedLanguage) => setFormData({ ...formData, language: value })}
        >
          <SelectTrigger className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            <SelectItem value="en" className="text-white hover:bg-white/10">English</SelectItem>
            <SelectItem value="no" className="text-white hover:bg-white/10">Norwegian</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="sort_order">Sort Order</Label>
        <Input
          id="sort_order"
          type="number"
          value={formData.sort_order}
          onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
          className="bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-[#8B5CF6] transition-all duration-500"
        />
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => {
            if (isCreateDialogOpen) setIsCreateDialogOpen(false);
            if (isEditDialogOpen) setIsEditDialogOpen(false);
          }}
          className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white border-none"
        >
          {submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Create New Section</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new section to your website
            </DialogDescription>
          </DialogHeader>
          <DialogForm onSubmit={handleCreate} submitText="Create" />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Section</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the section
            </DialogDescription>
          </DialogHeader>
          <DialogForm onSubmit={handleEdit} submitText="Save changes" />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border border-white/10">
          <DialogHeader>
            <DialogTitle>Delete Section</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this section? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/20"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white border-none"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}