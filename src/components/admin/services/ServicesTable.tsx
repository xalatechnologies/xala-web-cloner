import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ArrowUpDown, Star, StarOff } from "lucide-react";
import { type Database } from "@/integrations/supabase/types";

type Service = Database['public']['Tables']['services']['Row'];

interface ServicesTableProps {
  services: Service[] | null;
  handleSort: (key: string) => void;
  openEditDialog: (service: Service) => void;
  openDeleteDialog: (service: Service) => void;
}

export function ServicesTable({
  services,
  handleSort,
  openEditDialog,
  openDeleteDialog
}: ServicesTableProps) {
  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-muted">
            <TableHead className="text-text-muted cursor-pointer" onClick={() => handleSort('title')}>
              <div className="flex items-center">
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-text-muted">Description</TableHead>
            <TableHead className="text-text-muted cursor-pointer" onClick={() => handleSort('language')}>
              <div className="flex items-center">
                Language
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-text-muted cursor-pointer" onClick={() => handleSort('sort_order')}>
              <div className="flex items-center">
                Order
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </div>
            </TableHead>
            <TableHead className="text-text-muted">Featured</TableHead>
            <TableHead className="text-right text-text-muted">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services?.map((service) => (
            <TableRow key={service.id} className="border-border hover:bg-muted">
              <TableCell className="font-chakra text-foreground">{service.title}</TableCell>
              <TableCell className="font-chakra text-foreground max-w-md truncate">{service.description}</TableCell>
              <TableCell className="font-chakra text-foreground">{service.language}</TableCell>
              <TableCell className="font-chakra text-foreground">{service.sort_order}</TableCell>
              <TableCell className="font-chakra text-foreground">
                {service.featured ? (
                  <Star className="h-4 w-4 text-yellow-400" />
                ) : (
                  <StarOff className="h-4 w-4 text-muted-foreground" />
                )}
              </TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  onClick={() => openEditDialog(service)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted"
                >
                  <Pencil className="w-4 h-4 text-amber-400" />
                </Button>
                <Button
                  onClick={() => openDeleteDialog(service)}
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted"
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
