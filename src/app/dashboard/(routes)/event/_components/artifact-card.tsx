import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Artifact } from "@/types/brand";
import Image from "next/image";
import { MoreVertical, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface ArtifactCardProps {
  artifact: Artifact;
}

export const ArtifactCard = ({ artifact }: ArtifactCardProps) => {
  const onDelete = () => {};
  return (
    <div
      key={artifact.id}
      className="relative flex flex-col items-center justify-center p-4 bg-white border rounded-lg shadow-md"
    >
      <Image
        src={artifact.image}
        alt={artifact.name}
        width={80}
        height={40}
        className="object-contain mb-2"
      />
      <span className="text-sm font-medium text-center">{artifact.name}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
            <MoreVertical className="h-4 w-4" />
            <span className="sr-only">More</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={`/dashboard/brands/${artifact.id}`}>
              <div className="flex items-center gap-2">
                <Pencil className="h-4 w-4" />
                Edit
              </div>
            </Link>
          </DropdownMenuItem>
          <ConfirmModal
            header="Delete this artifact?"
            description="This action will delete this artifact out of the entire system."
            // disabled={pending}
            onConfirm={onDelete}
          >
            <DropdownMenuItem
              className="cursor-pointer text-sm w-full justify-start font-normal text-red-500 focus:text-red-500"
              onSelect={(e) => e.preventDefault()}
            >
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
