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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-gray-800/50 border-gray-700 text-white w-64 focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>
      <Select value={filterLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-32 bg-gray-800/50 border-gray-700 text-white focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all" className="text-white hover:bg-gray-700">All</SelectItem>
          <SelectItem value="en" className="text-white hover:bg-gray-700">English</SelectItem>
          <SelectItem value="no" className="text-white hover:bg-gray-700">Norwegian</SelectItem>
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