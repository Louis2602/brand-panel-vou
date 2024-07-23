"use client";

import Link from "next/link";
import { generateFallback } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brand } from "@/types/brand";
import { Loader } from "../global/loader";

interface UserButtonProps {
  currentBrand: Brand;
}

export const UserButton = ({ currentBrand }: UserButtonProps) => {
  if (!currentBrand) {
    return <Loader className="h-4 w-4" />;
  }
  return (
    <Link href="/dashboard/settings">
      <Avatar className="cursor-pointer">
        <AvatarImage src={""} alt={`${currentBrand.name}`} />
        <AvatarFallback>{generateFallback(currentBrand.name)}</AvatarFallback>
      </Avatar>
    </Link>
  );
};
