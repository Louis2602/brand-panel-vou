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
import { Game } from "@/types/game";

const QuizGamesListPage = () => {
  const { data: quizGames } = useGames("quiz");
  const router = useRouter();

  if (quizGames === undefined) {
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
            <BreadcrumbLink href="/dashboard/games/quiz">Quiz</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between items-center my-6">
        <h1 className="text-2xl font-bold">Quiz Games</h1>
        <Button onClick={() => router.push("/dashboard/games/quiz/create")}>
          Create New Quiz Game
        </Button>
      </div>

      {quizGames.length === 0 ? (
        <Card className="w-full">
          <CardContent className="flex flex-col items-center justify-center py-10">
            <p className="text-lg mb-4">No quiz games have been created yet.</p>
            <Button onClick={() => router.push("/dashboard/games/quiz/create")}>
              Create Your First Quiz Game
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quizGames.map((game: Game) => (
            <Card key={game.id} className="w-full">
              <CardHeader>
                <CardTitle>{game.name}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Questions: {game.gamePlay.length}</p>
                {game.allowItemExchange && (
                  <p className="text-sm text-green-600">Allows item exchange</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Link href={`/dashboard/games/quiz/${game.id}`}>
                  <Button variant="outline">View Game</Button>
                </Link>
                <Link href={`/dashboard/games/quiz/${game.id}/edit`}>
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

export default QuizGamesListPage;
