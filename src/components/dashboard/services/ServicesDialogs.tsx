import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { type Database } from "@/integrations/supabase/types";
import * as LucideIcons from "lucide-react";

type SupportedLanguage = Database['public']['Enums']['supported_language'];

interface FormData {
  title: string;
  description: string;
  icon: string;
  language: SupportedLanguage;
  sort_order: number;
  featured: boolean;
}

interface ServicesDialogsProps {
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

export function ServicesDialogs({
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
}: ServicesDialogsProps) {
  const iconNames = Object.keys(LucideIcons).filter(
    name => typeof LucideIcons[name as keyof typeof LucideIcons] === 'function'
  );

  const DialogForm = ({ onSubmit, submitText }: { onSubmit: () => void, submitText: string }) => (
    <div className="grid gap-6 py-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="icon">Icon</Label>
        <Select
          value={formData.icon}
          onValueChange={(value) => setFormData({ ...formData, icon: value })}
        >
          <SelectTrigger id="icon" className="bg-white/5 border-white/10 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 max-h-[300px]">
            {iconNames.map((name) => {
              const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.FC;
              return (
                <SelectItem key={name} value={name} className="text-white hover:bg-white/10">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="language">Language</Label>
        <Select
          value={formData.language}
          onValueChange={(value: SupportedLanguage) => setFormData({ ...formData, language: value })}
        >
          <SelectTrigger id="language" className="bg-white/5 border-white/10 text-white">
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
          className="bg-white/5 border-white/10 text-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="featured"
          checked={formData.featured}
          onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
        />
        <Label htmlFor="featured">Featured Service</Label>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => {
            if (isCreateDialogOpen) setIsCreateDialogOpen(false);
            if (isEditDialogOpen) setIsEditDialogOpen(false);
          }}
          className="bg-white/5 border-white/10 text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button onClick={onSubmit} className="bg-blue-500 hover:bg-blue-600">
          {submitText}
        </Button>
      </DialogFooter>
    </div>
  );

  return (
    <>
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Create New Service</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new service to your website
            </DialogDescription>
          </DialogHeader>
          <DialogForm onSubmit={handleCreate} submitText="Create" />
        </DialogContent>
      </Dialog>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the service
            </DialogDescription>
          </DialogHeader>
          <DialogForm onSubmit={handleEdit} submitText="Save changes" />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="bg-gray-800/95 backdrop-blur-lg text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>Delete Service</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this service? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}