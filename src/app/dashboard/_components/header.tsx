import { UserButton } from "@/components/auth/user-button";
import { MobileNavigation } from "./navigation";
import { useAuth } from "@/providers/auth-provider";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header className="flex h-14 lg:h-[64px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
      <div className="flex items-center gap-2 font-semibold lg:hidden">
        <MobileNavigation />
      </div>
      <UserButton currentBrand={user} />
    </header>
  );
};
