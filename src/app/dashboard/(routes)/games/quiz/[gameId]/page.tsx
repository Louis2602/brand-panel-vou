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

interface QuizGameIdPageProps {
  params: {
    gameId: string;
  };
}

const QuizGameIdPage = ({ params: { gameId } }: QuizGameIdPageProps) => {
  const { data: game } = useGame(gameId);

  if (game === undefined || !game) {
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
            <BreadcrumbLink href="/dashboard/games/quiz">Quiz</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{game.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mx-auto my-4">
        <h1 className="text-2xl font-bold mb-2">{game.name}</h1>
        <p className="mb-4 text-sm text-muted-foreground">{game.description}</p>
        <p className="mb-4">Tutorial: {game.tutorial}</p>
        {game.image && (
          <div className="mb-4">
            <Image src={game.image} alt={game.name} width={400} height={300} />
          </div>
        )}
        <h2 className="text-xl font-semibold mb-2">Questions:</h2>
        <ul>
          {game.gamePlay &&
            game.gamePlay.map((question, index) => (
              <li key={index} className="mb-4">
                <p className="font-medium">{question.text}</p>
                <p className="text-sm text-gray-600">
                  Rewards: {question.rewards}
                </p>
                <ul className="list-disc list-inside">
                  {question.options.map((option, optionIndex) => (
                    <li
                      key={optionIndex}
                      className={option.isAnswer ? "text-green-600" : ""}
                    >
                      {option.text} {option.isAnswer && "(Correct Answer)"}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizGameIdPage;
