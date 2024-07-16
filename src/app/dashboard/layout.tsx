import { UserButton } from "@/components/auth/user-button";
import {
  MobileNavigation,
  Navigation,
} from "@/components/dashboard/nav/navigation";
import { Logo } from "@/components/global/logo";
import Link from "next/link";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const user = {
  imageUrl: "",
  firstName: "Momo",
  lastName: "Admin",
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-5">
            <Link className="flex items-center gap-2 font-semibold" href="/">
              <Logo />
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <aside className="grid items-start px-4 text-sm font-medium h-full">
              <Navigation />
            </aside>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[64px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 justify-between lg:justify-end">
          <div className="flex items-center gap-2 font-semibold lg:hidden">
            <MobileNavigation />
          </div>
          <UserButton currentUser={user} />
        </header>
        <section className="relative p-6 w-full h-full">{children}</section>
      </div>
    </div>
  );
};
export default DashboardLayout;
