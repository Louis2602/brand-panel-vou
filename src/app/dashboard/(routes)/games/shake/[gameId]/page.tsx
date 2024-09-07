"use client";

import { Loader } from "@/components/global/loader";
import { useGame } from "@/server/games/query";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";

interface ShakeGameIdPageProps {
  params: {
    gameId: string;
  };
}

const ShakeGameIdPage = ({ params: { gameId } }: ShakeGameIdPageProps) => {
  const { data: game } = useGame(gameId);

  if (!game) {
    return <Loader />;
  }

  return (
    <div className="container p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/main">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/games">All Games</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard/games/shake">Shake</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{game.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto my-4">
        <div className="flex items-start gap-4">
          <h1 className="text-2xl font-bold mb-2">{game.name}</h1>
          <Badge
            variant={game.status ? "success" : "destructive"}
            className="w-fit"
          >
            {game.status ? "Active" : "Inactive"}
          </Badge>
        </div>
        <p className="mb-4 text-sm text-muted-foreground">{game.description}</p>
        <p className="mb-4">Tutorial: {game.tutorial}</p>
        {game.image && (
          <div className="mb-4">
            <Image src={game.image} alt={game.name} width={400} height={300} />
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2">Gameplay Elements:</h2>
        {game.gamePlay && game.gamePlay.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {game.gamePlay.map((element: number, index: number) => (
              <div
                key={index}
                className="border border-gray-300 p-4 rounded-lg shadow-sm flex items-center justify-center"
              >
                <span className="text-lg font-medium">{element}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No gameplay elements available.</p>
        )}
      </div>
    </div>
  );
};

export default ShakeGameIdPage;
