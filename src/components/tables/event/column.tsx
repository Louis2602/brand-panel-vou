"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Event } from "@/types/brand";
import { format } from "date-fns";
import Image from "next/image";
import { useGame } from "@/server/games/query";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Event>[] = [
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
    accessorKey: "image",
    header: "IMAGE",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      return (
        <Image
          src={value}
          alt="Event Image"
          width={50}
          height={50}
          className="shadow-md rounded-md"
        />
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAME",
  },
  {
    accessorKey: "gameId",
    header: "GAME",
    cell: ({ renderValue }) => {
      const gameId = renderValue() as string;
      const { data: game } = useGame(gameId);
      if (game === undefined || !game) {
        return <span>Not in any games.</span>;
      }
      return (
        <div className="flex items-center gap-2">
          <Badge>{game.type}</Badge>
          <span>{game.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "startTime",
    header: "FROM",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const formattedDate = format(new Date(value), "MMMM d, yyyy - HH:mm:ss");
      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "endTime",
    header: "TO",
    cell: ({ renderValue, ...props }) => {
      const value = renderValue() as string;
      const formattedDate = format(new Date(value), "MMMM d, yyyy - HH:mm:ss");
      return <span>{formattedDate}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
