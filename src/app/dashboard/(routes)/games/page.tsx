import { Heading } from "@/components/global/heading";
import { Dices } from "lucide-react";
import type { Metadata } from "next";
import GamesListPage from "./_components/game-list";

export const metadata: Metadata = {
  title: "Games",
};

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <Heading
        title={`Games Management`}
        description="Manage all games to run in your event."
        icon={Dices}
      />
      <GamesListPage />
    </div>
  );
}
