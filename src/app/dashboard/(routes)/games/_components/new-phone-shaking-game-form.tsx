"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/providers/auth-provider";
import { Game } from "@/types/game";
import { useCreateGame } from "@/server/games/create";

interface NewShakeGameFormProps {
  update?: boolean;
  game?: Game;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  tutorial: z.string(),
  image: z.string().url("Invalid image URL"),
  type: z.literal("shake"),
  allowItemExchange: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export const NewShakeGameForm: React.FC<NewShakeGameFormProps> = ({
  update,
  game,
}) => {
  const router = useRouter();
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tutorial: "",
      image: "",
      type: "shake",
      allowItemExchange: false,
    },
  });

  const [gamePlay, setGamePlay] = useState<number[]>([0]);
  const isLoading = form.formState.isSubmitting;
  const createGame = useCreateGame();

  useEffect(() => {
    if (update && game) {
      const formattedGame = {
        name: game.name,
        description: game.description,
        tutorial: game.tutorial,
        image: game.image,
        allowItemExchange: game.allowItemExchange,
      };
      form.reset(formattedGame);
      setGamePlay(Array.isArray(game.gamePlay) ? game.gamePlay : [0]);
    }
  }, [update, game, form]);

  const addGameplayElement = () => {
    setGamePlay((prev) => [...prev, 0]); // Allow multiple `0`s
  };

  const removeGameplayElement = (index: number) => {
    setGamePlay((prev) => prev.filter((_, i) => i !== index));
  };

  const handleGameplayChange = (index: number, value: number) => {
    const updatedGamePlay = [...gamePlay];
    updatedGamePlay[index] = value;
    setGamePlay(updatedGamePlay);
  };

  const onSubmit = async (data: FormValues) => {
    const gameData = {
      ...data,
      gamePlay,
      brandId: user?.id!,
    };
    try {
      if (update && game) {
        // updateGame.mutate({ id: game?.id!, updateGame: gameData });
      } else {
        createGame.mutate(gameData);
      }
      router.push("/dashboard/games/shake");
    } catch (error) {
      console.error("Failed to create/update game:", error);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle>
            {update ? "Update Shake Game" : "Create New Shake Game"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tutorial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tutorial</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="allowItemExchange"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Allow Item Exchange</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              {/* Handle Gameplay separately */}
              <div>
                <Label>Game Play</Label>
                <div className="space-y-2">
                  {gamePlay.map((value, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        type="number"
                        value={value}
                        onChange={(e) =>
                          handleGameplayChange(index, parseInt(e.target.value))
                        }
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removeGameplayElement(index)}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addGameplayElement}
                  >
                    Add Gameplay Element
                  </Button>
                </div>
              </div>

              <Button type="submit" disabled={isLoading}>
                {update ? "Update" : "Create"} Game
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewShakeGameForm;
