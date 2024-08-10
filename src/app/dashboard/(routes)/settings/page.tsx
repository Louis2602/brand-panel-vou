import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { useAuth } from "@/providers/auth-provider";
import { AppearanceForm } from "./_components/appearance-form";
import { UpdateProfileForm } from "./_components/update-profile-form";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  return (
    <>
      <div className="mb-8 pb-4 border-b border-border/50">
        <h2 className="font-heading text-3xl">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings.</p>
      </div>
      <div className="flex md:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-4">
          <UpdateProfileForm />
          <AppearanceForm />
        </div>
        <div className="flex-1" />
      </div>
    </>
  );
}
