import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (key: string) => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  isLoading?: boolean;
}

export function DataTable({
  data,
  columns,
  sortConfig,
  onSort,
  onEdit,
  onDelete,
  isLoading
}: DataTableProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-gray-700">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700 hover:bg-gray-800/50">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className="text-white/70"
                onClick={() => column.sortable && onSort?.(column.key)}
              >
                <div className="flex items-center cursor-pointer">
                  {column.label}
                  {column.sortable && sortConfig?.key === column.key && (
                    <span className="ml-2">
                      {sortConfig.direction === 'asc' ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
            {(onEdit || onDelete) && (
              <TableHead className="text-right text-white/70">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id || index}
              className="border-gray-700 hover:bg-gray-800/50 transition-colors group"
            >
              {columns.map((column) => (
                <TableCell key={column.key} className="font-chakra text-white">
                  {column.render ? column.render(item[column.key]) : item[column.key]}
                </TableCell>
              ))}
              {(onEdit || onDelete) && (
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {onEdit && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onEdit(item)}
                        className="hover:bg-gray-700 text-amber-400 hover:text-amber-300"
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(item)}
                        className="hover:bg-red-900/50 text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}