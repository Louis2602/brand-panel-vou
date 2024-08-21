"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGames } from "@/server/games/query";
import { Loader } from "@/components/global/loader";

const PhoneShakingGamesListPage = () => {
  const { data: phoneShakingGames } = useGames("shake");
  const router = useRouter();

  if (phoneShakingGames === undefined) {
    return <Loader />;
  }

  return (
    <div>
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
            <BreadcrumbLink href="/dashboard/games/quiz">
              Phone-shaking
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Phone Shaking Games</h1>
        <Button
          onClick={() => router.push("/dashboard/games/phone-shaking/create")}
        >
          Create New Phone Shaking Game
        </Button>
      </div>

      {phoneShakingGames.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">
              No phone shaking games have been created yet.
            </p>
            <Button
              onClick={() =>
                router.push("/dashboard/games/phone-shaking/create")
              }
            >
              Create Your First Phone Shaking Game
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {phoneShakingGames.map((game) => (
            <Card key={game.id} className="w-full">
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Difficulty: {game.difficulty}</p>
                <p>Duration: {game.duration} seconds</p>
                {game.allowItemExchange && (
                  <p className="text-sm text-green-600">Allows item exchange</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/games/phone-shaking/${game.id}`}>
                  <Button variant="outline">View Game</Button>
                </Link>
                <Link href={`/dashboard/games/phone-shaking/${game.id}/edit`}>
                  <Button variant="outline">Edit Game</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneShakingGamesListPage;
