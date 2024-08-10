import { UserButton } from "@/components/auth/user-button";
import { MobileNavigation } from "./navigation";
import { useAuth } from "@/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { NotificationCard } from "./notification-card";

export const Header = () => {
  const { user } = useAuth();
  return (
    <header className="flex h-14 lg:h-[64px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
      <div className="flex items-center gap-2 font-semibold lg:hidden">
        <MobileNavigation />
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button size="icon" variant="ghost">
            <div className="relative">
              <Bell className="h-6 w-6" />
              <div className="absolute top-0 right-0 -translate-x-1/2 -translate-y-1/2 h-4 w-4 flex items-center justify-center rounded-full bg-rose-500 text-white text-xs font-bold">
                3
              </div>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[350px]" align="end">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Notifications</h4>
              <p className="text-sm text-muted-foreground">
                You have 3 unread messages.
              </p>
            </div>
            <NotificationCard />
          </div>
        </PopoverContent>
      </Popover>
      <UserButton currentBrand={user} />
    </header>
  );
};
