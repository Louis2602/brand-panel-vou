"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import { Voucher } from "@/types/brand";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useDeleteEvent } from "@/server/event/mutation";
import Link from "next/link";
import { CreateVoucherForm } from "@/app/dashboard/(routes)/voucher/_components/create-voucher.form";

interface CellActionProps {
  data: Voucher;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const deleteEvent = useDeleteEvent();
  const onDelete = async () => {
    try {
      deleteEvent.mutate(data.id!);
    } catch (error) {
      console.error("Error deleting voucher:", error);
      toast.error("Error deleting voucher:");
    }
  };

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href={`/dashboard/voucher/${data.id}`}>
              <div className="flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md">
                <Eye className="h-4 w-4" /> View
              </div>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SheetTrigger asChild>
              <div className="flex transition-all hover:bg-muted items-center gap-2 w-full rounded-md">
                <Edit className="h-4 w-4" /> Update
              </div>
            </SheetTrigger>
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete this voucher?"
            description="This action will delete this voucher completely"
            disabled={deleteEvent.isPending}
            onConfirm={onDelete}
          >
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Trash className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>Update event campaign</SheetTitle>
          <SheetDescription>
            Fill in all the information fields below.
          </SheetDescription>
        </SheetHeader>
        <CreateVoucherForm update={true} voucher={data} />
      </SheetContent>
    </Sheet>
  );
};
