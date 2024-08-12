import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const GameTypesListPage = () => {
  const gameTypes = [
    {
      id: "quiz",
      name: "Quiz Game",
      description: "Test your knowledge with interactive quizzes",
      icon: "🧠", // You can replace this with an actual icon component if preferred
    },
    {
      id: "phone-shaking",
      name: "Phone Shaking Game",
      description: "Shake your phone to complete challenges",
      icon: "📱", // You can replace this with an actual icon component if preferred
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gameTypes.map((gameType) => (
          <Card key={gameType.id} className="w-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="mr-2 text-2xl">{gameType.icon}</span>
                {gameType.name}
              </CardTitle>
              <CardDescription>{gameType.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Create and manage {gameType.name.toLowerCase()}s</p>
            </CardContent>
            <CardFooter>
              <Link href={`/dashboard/games/${gameType.id}`}>
                <Button variant="outline">View All {gameType.name}s</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GameTypesListPage;
