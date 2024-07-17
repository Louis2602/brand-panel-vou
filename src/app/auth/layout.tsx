"use client";
import { useAuth } from "@/providers/auth-provider";
import { useRouter } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user) {
    router.push("/dashboard");
  }
  return (
    <main className="h-screen p-6 flex items-center justify-center">
      {children}
    </main>
  );
};

export default AuthLayout;
