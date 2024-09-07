"use client";

import { useGame } from "@/server/games/query";
import { NewQuizGameForm } from "../../../_components/new-quiz-game-form";

interface QuizGameIdEditPageProps {
  params: {
    gameId: string;
  };
}

const QuizGameIdEditPage = ({
  params: { gameId },
}: QuizGameIdEditPageProps) => {
  const { data: game } = useGame(gameId);

  return <NewQuizGameForm update={true} game={game} />;
};

export default QuizGameIdEditPage;
