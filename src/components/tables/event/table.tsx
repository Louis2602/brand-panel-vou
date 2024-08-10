"use client";

import React, { useState } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isValid, isWithinInterval } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Event } from "@/types/brand";

interface EventTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: Event[];
}

export function EventTable<TData, TValue>({
  columns,
  data,
}: EventTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      const value = row.getValue(columnId);
      return String(value)
        .toLowerCase()
        .includes((filterValue as string).toLowerCase());
    },
    state: {
      globalFilter,
    },
  });

  const filteredRows = table.getRowModel().rows.filter((row) => {
    if (!dateRange.from && !dateRange.to) return true;
    const startTime = row.getValue("startTime") as string;
    if (!startTime) return false;

    const parsedDate = new Date(startTime);
    if (!isValid(parsedDate)) return false;

    if (dateRange.from && dateRange.to) {
      return isWithinInterval(parsedDate, {
        start: dateRange.from,
        end: dateRange.to,
      });
    } else if (dateRange.from) {
      return parsedDate >= dateRange.from;
    } else if (dateRange.to) {
      return parsedDate <= dateRange.to;
    }

    return true;
  });

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          placeholder="Search events..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Filter by date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={setDateRange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
        {(dateRange.from || dateRange.to) && (
          <Button
            variant="ghost"
            onClick={() => setDateRange({ from: undefined, to: undefined })}
          >
            Clear date range
          </Button>
        )}
      </div>
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {filteredRows.length ? (
              filteredRows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </>
  );
}
