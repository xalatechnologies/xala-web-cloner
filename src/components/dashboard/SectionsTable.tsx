import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown } from "lucide-react";
import { type Database } from "@/integrations/supabase/types";

type Section = Database['public']['Tables']['sections']['Row'];

interface SectionsTableProps {
  sections: Section[] | null;
  handleSort: (key: string) => void;
  openEditDialog: (section: Section) => void;
  openDeleteDialog: (section: Section) => void;
}

export function SectionsTable({
  sections,
  handleSort,
  openEditDialog,
  openDeleteDialog
}: SectionsTableProps) {
  return (
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
          {sections?.map((section) => (
            <TableRow key={section.id} className="border-gray-700 hover:bg-gray-800/50">
              <TableCell className="font-chakra text-white">{section.section_name}</TableCell>
              <TableCell className="font-chakra text-white">{section.title}</TableCell>
              <TableCell className="font-chakra text-white">{section.language}</TableCell>
              <TableCell className="font-chakra text-white">{section.sort_order}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  onClick={() => openEditDialog(section)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-gray-700"
                >
                  <Pencil className="w-4 h-4 text-amber-400" />
                </Button>
                <Button
                  onClick={() => openDeleteDialog(section)}
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
  );
}