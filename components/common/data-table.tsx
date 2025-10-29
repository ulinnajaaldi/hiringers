"use client";

import * as React from "react";

import {
  Column,
  ColumnDef,
  ColumnPinningState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  disabled?: boolean;
  columnPinning?: ColumnPinningState;
}

const getPinningStyles = (
  column: Column<any>,
  isLastLeftPinned: boolean,
  isFirstRightPinned: boolean,
): React.CSSProperties => {
  const isPinned = column.getIsPinned();

  return {
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px ` : undefined,
    position: isPinned ? "sticky" : "relative",
    zIndex: isPinned ? 1 : 0,
    boxShadow: isLastLeftPinned
      ? "2px 0 4px -2px rgba(0, 0, 0, 0.1)"
      : isFirstRightPinned
        ? "-2px 0 4px -2px rgba(0, 0, 0, 0.1)"
        : undefined,
  };
};

export function DataTable<TData, TValue>({
  columns,
  data,
  columnPinning,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
      ...(columnPinning && { columnPinning }),
    },
    enableSortingRemoval: false,
  });

  return (
    <div
      className="w-full"
      style={{
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.10)",
      }}
    >
      <Table className="[&_td]:border-neutral-30 [&_th]:border-neutral-30 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="bg-neutral-20 hover:bg-neutral-30 transition-all"
            >
              {headerGroup.headers.map((header) => {
                const { column } = header;
                const isPinned = column.getIsPinned();
                const isLastLeftPinned =
                  isPinned === "left" && column.getIsLastColumn("left");
                const isFirstRightPinned =
                  isPinned === "right" && column.getIsFirstColumn("right");

                return (
                  <TableHead
                    key={header.id}
                    className="data-pinned:bg-neutral-20 hover:data-pinned:bg-neutral-30 text-s! data-pinned:border-neutral-30! relative h-10 truncate p-4 pr-4! font-bold text-neutral-100 uppercase transition-colors data-pinned:drop-shadow-lg data-pinned:backdrop-blur-xs [&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0 [&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0 [&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0"
                    colSpan={header.colSpan}
                    style={{
                      ...getPinningStyles(
                        column,
                        isLastLeftPinned,
                        isFirstRightPinned,
                      ),
                    }}
                    data-pinned={isPinned || undefined}
                    data-last-col={
                      isLastLeftPinned
                        ? "left"
                        : isFirstRightPinned
                          ? "right"
                          : undefined
                    }
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  const { column } = cell;
                  const isPinned = column.getIsPinned();
                  const isLastLeftPinned =
                    isPinned === "left" && column.getIsLastColumn("left");
                  const isFirstRightPinned =
                    isPinned === "right" && column.getIsFirstColumn("right");

                  return (
                    <TableCell
                      key={cell.id}
                      className="data-pinned:bg-neutral-10/90 hover:data-pinned:bg-neutral-20/90 text-m truncate p-4 pr-4! text-start data-pinned:drop-shadow-lg data-pinned:backdrop-blur-xs"
                      style={{
                        ...getPinningStyles(
                          column,
                          isLastLeftPinned,
                          isFirstRightPinned,
                        ),
                      }}
                      data-pinned={isPinned || undefined}
                      data-last-col={
                        isLastLeftPinned
                          ? "left"
                          : isFirstRightPinned
                            ? "right"
                            : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
