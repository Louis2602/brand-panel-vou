import { SignUpForm } from "@/components/auth/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign up",
  description: "Create new account",
};

export default function SignInPage() {
  return <SignUpForm />;
}
