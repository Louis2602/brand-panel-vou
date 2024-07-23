"use client";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.push("/dashboard/main");
  }
  return (
    <main className="h-screen p-6 flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
