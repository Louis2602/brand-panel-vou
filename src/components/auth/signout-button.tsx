"use client";

import { Icons } from "@/components/global/icons";
import { useAuth } from "@/providers/auth-provider";

export const SignOutButton = () => {
  const { logout } = useAuth();
  return (
    <button
      className="group flex items-center gap-3 sm:gap-2 p-2 rounded-md hover:bg-border transition-colors duration-100 text-primary cursor-pointer"
      onClick={logout}
    >
      <Icons.logout className="group-hover:text-primary sm:h-4 sm:w-4" />
      <p className="text-lg sm:text-sm">Logout</p>
    </button>
  );
};
