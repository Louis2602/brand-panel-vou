import { SignInForm } from "@/components/auth/signin-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your account",
};

export default function SignInPage() {
  return <SignInForm />;
}
