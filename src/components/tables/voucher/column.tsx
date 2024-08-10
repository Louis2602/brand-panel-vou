"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Voucher } from "@/types/brand";
import { format } from "date-fns";
import { useEvent } from "@/server/event/query";

export const columns: ColumnDef<Voucher>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "code",
    header: "CODE",
  },
  {
    accessorKey: "eventId",
    header: "EVENT",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const { data: event } = useEvent(value);
      if (!event) {
        return <div className="text-gray-500">Loading...</div>;
      }
      return <span className="font-bold">{event.name}</span>;
    },
  },
  {
    accessorKey: "description",
    header: "DESCRIPTION",
  },
  {
    accessorKey: "value",
    header: "VALUE",
  },
  {
    accessorKey: "expiredDate",
    header: "FROM",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const formattedDate = format(new Date(value), "MMMM d, yyyy - HH:mm:ss");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "artifactsNeeded",
    header: "ARTIFACTS NEEDED",
  },
  {
    accessorKey: "amount",
    header: "AMOUNT",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
