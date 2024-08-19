"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useAuth } from "@/providers/auth-provider";
import { Loader } from "@/components/global/loader";
import { useCreateGame } from "@/server/games/create-quiz";

const optionSchema = z.object({
  text: z.string().min(1, "Option text is required"),
  isAnswer: z.boolean(),
});

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  rewards: z.string().min(1, "Rewards must be at least 1"),
  options: z
    .array(optionSchema)
    .length(4, "Each question must have exactly 4 options"),
});

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  tutorial: z.string(),
  image: z.string().url("Invalid image URL"),
  type: z.literal("quiz"),
  allowItemExchange: z.boolean(),
  gamePlay: z.array(questionSchema).min(1, "At least one question is required"),
});

type FormValues = z.infer<typeof formSchema>;

export const NewQuizGameForm = () => {
  const { user } = useAuth();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      tutorial: "",
      image: "",
      type: "quiz",
      allowItemExchange: false,
      gamePlay: [
        {
          text: "",
          rewards: "1",
          options: [
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
            { text: "", isAnswer: false },
          ],
        },
      ],
    },
  });
  const isLoading = form.formState.isSubmitting;

  const createGame = useCreateGame();

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "gamePlay",
  });

  const onSubmit = (data: FormValues) => {
    const newGameData = {
      ...data,
      brandId: user?.id!,
      gamePlay: data.gamePlay.map((question) => ({
        ...question,
        rewards: parseInt(question.rewards, 10),
      })),
    };
    createGame.mutate(newGameData);
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
            <BreadcrumbLink href="/dashboard/games/quiz">Quiz</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create new game</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader>
              <CardTitle>Create New Quiz Game</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Allow Item Exchange</FormLabel>
                      <FormDescription>
                        Enable this to allow item exchange in the game.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              {fields.map((field, index) => (
                <Card key={field.id} className="mt-4 p-4">
                  <FormField
                    control={form.control}
                    name={`gamePlay.${index}.text`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Question {index + 1}</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter question" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`gamePlay.${index}.rewards`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rewards</FormLabel>
                        <FormControl>
                          <Input {...field} type="text" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {[0, 1, 2, 3].map((optionIndex) => (
                    <div
                      key={optionIndex}
                      className="mt-2 flex items-center space-x-2"
                    >
                      <FormField
                        control={form.control}
                        name={`gamePlay.${index}.options.${optionIndex}.text`}
                        render={({ field }) => (
                          <FormItem className="flex-grow">
                            <FormControl>
                              <Input
                                {...field}
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Controller
                        name={`gamePlay.${index}.options.${optionIndex}.isAnswer`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={(checked) => {
                                  field.onChange(checked);
                                  // Uncheck other options
                                  [0, 1, 2, 3].forEach((i) => {
                                    if (i !== optionIndex) {
                                      form.setValue(
                                        `gamePlay.${index}.options.${i}.isAnswer`,
                                        false,
                                      );
                                    }
                                  });
                                }}
                              />
                            </FormControl>
                            <FormLabel className="ml-2">Correct</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </Card>
              ))}

              <Button
                type="button"
                onClick={() =>
                  append({
                    text: "",
                    rewards: "1",
                    options: [
                      { text: "", isAnswer: false },
                      { text: "", isAnswer: false },
                      { text: "", isAnswer: false },
                      { text: "", isAnswer: false },
                    ],
                  })
                }
                variant="outline"
              >
                Add Question
              </Button>

              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader />}
                Create Game
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};
