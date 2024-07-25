"use client";

import { Navigation } from "./_components/navigation";
import { Loader } from "@/components/global/loader";
import { Logo } from "@/components/global/logo";
import { useAuth } from "@/providers/auth-provider";
import Link from "next/link";
import { Header } from "./_components/header";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, user } = useAuth();
  if (!isAuthenticated || user === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader className="w-20 h-20" />
      </div>
    );
  }
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
            <aside className="grid items-start text-sm font-medium h-full">
              <Navigation />
            </aside>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Header />
        <section className="relative p-6 w-full h-full">{children}</section>
      </div>
    </div>
  );
};
export default DashboardLayout;
