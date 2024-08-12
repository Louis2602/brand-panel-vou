"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const NewPhoneShakingGameForm = () => {
  const router = useRouter();
  const [game, setGame] = useState({
    name: "",
    description: "",
    tutorial: "",
    image: "",
    type: "phone-shaking",
    allowItemExchange: false,
    brandId: "",
    difficulty: "medium",
    duration: 30,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    setGame({ ...game, allowItemExchange: e.target.checked });
  };

  const handleSelectChange = (name, value) => {
    setGame({ ...game, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically send the game data to your backend
    console.log(game);

    // Simulating API call
    try {
      // const response = await fetch('your-api-endpoint', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(game),
      // });
      // if (response.ok) {
      //   router.push('/dashboard/games/phone-shaking');
      // }

      // For now, just redirect
      router.push("/dashboard/games/phone-shaking");
    } catch (error) {
      console.error("Failed to create game:", error);
    }
  };

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
              Phone Shaking
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create new game</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>Create New Phone Shaking Game</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={game.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={game.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="tutorial">Tutorial</Label>
              <Input
                id="tutorial"
                name="tutorial"
                value={game.tutorial}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                name="image"
                value={game.image}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="brandId">Brand ID</Label>
              <Input
                id="brandId"
                name="brandId"
                value={game.brandId}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                name="difficulty"
                value={game.difficulty}
                onValueChange={(value) =>
                  handleSelectChange("difficulty", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Duration (seconds)</Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={game.duration}
                onChange={handleInputChange}
                min="1"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="allowItemExchange"
                checked={game.allowItemExchange}
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="allowItemExchange">Allow Item Exchange</Label>
            </div>
            <Button type="submit">Create Game</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
