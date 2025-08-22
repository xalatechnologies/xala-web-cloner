import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";

interface TableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterLanguage: string;
  onLanguageChange: (value: string) => void;
  onAddNew?: () => void;
  addButtonLabel?: string;
}

export function TableFilters({
  searchTerm,
  onSearchChange,
  filterLanguage,
  onLanguageChange,
  onAddNew,
  addButtonLabel = "Add New"
}: TableFiltersProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-surface border-border text-text w-64 focus:ring-2 focus:ring-primary transition-all"
        />
      </div>
      <Select value={filterLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32 bg-surface border-border text-text focus:ring-2 focus:ring-primary">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-surface border-border">
          <SelectItem value="all" className="text-text hover:bg-muted">All</SelectItem>
          <SelectItem value="en" className="text-text hover:bg-muted">English</SelectItem>
          <SelectItem value="no" className="text-text hover:bg-muted">Norwegian</SelectItem>
        </SelectContent>
      </Select>
      {onAddNew && (
        <Button 
          onClick={onAddNew}
          className="bg-blue-500 hover:bg-blue-600 transition-colors shadow-lg hover:shadow-blue-500/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          {addButtonLabel}
        </Button>
      )}
    </div>
  );
}