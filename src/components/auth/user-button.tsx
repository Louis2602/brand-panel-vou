import Link from "next/link";
import { generateFallback } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserButtonProps {
  currentUser: {
    imageUrl: string;
    firstName: string;
    lastName: string;
  };
}

export const UserButton = ({ currentUser }: UserButtonProps) => {
  return (
    <Link href="/dashboard/settings">
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={currentUser.imageUrl || ""}
          alt={
            `${currentUser.firstName} ${currentUser.lastName}` || "Unknown user"
          }
        />
        <AvatarFallback>
          {generateFallback(
            `${currentUser.firstName} ${currentUser.lastName}` || "",
          )}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
};
