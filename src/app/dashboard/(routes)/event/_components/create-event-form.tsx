"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/global/loader";
import { Event } from "@/types/brand";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { useCreateEvent, useUpdateEvent } from "@/server/event/mutation";
import { X } from "lucide-react";
import { useState } from "react";
import { useGames } from "@/server/games/query";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  gameId: z.string().min(1, { message: "You must select a game." }),
  startTime: z.string().min(1, { message: "You must choose a start date." }),
  endTime: z.string().min(1, { message: "You must choose an end date." }),
});

interface CreateEventFormProps {
  update?: boolean;
  event?: Event;
}

export const CreateEventForm = ({ update, event }: CreateEventFormProps) => {
  const { user } = useAuth();
  const { data: games } = useGames("quiz");
  const [imageUrl, setImageUrl] = useState<string>("");
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name ?? "",
      gameId: (games && games[0]?.id!) ?? "",
      startTime: event?.startTime
        ? new Date(event.startTime).toISOString().slice(0, -1) + "+07:00"
        : "",
      endTime: event?.endTime
        ? new Date(event.endTime).toISOString().slice(0, -1) + "+07:00"
        : "",
    },
  });

  if (games === undefined) {
    return <Loader />;
  }

  const gamesArray = Array.isArray(games) ? games : [games];
  const isLoading = form.formState.isLoading;

  function onSubmit(data: z.infer<typeof formSchema>) {
    const eventData = {
      ...data,
      image: imageUrl,
      brandId: user?.id!,
    };

    if (update) {
      updateEvent.mutate(eventData);
    } else {
      createEvent.mutate(eventData);
    }

    form.reset();
    setImageUrl("");
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl>
                  <Input placeholder="Back To School, ..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formatted =
                        date.toISOString().slice(0, -1) + "+07:00";
                      field.onChange(formatted);
                    }}
                    value={field.value ? field.value.slice(0, -6) : ""}
                  />
                </FormControl>
                <FormDescription>
                  Enter the start time in your local timezone. It will be
                  converted to the required format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Time</FormLabel>
                <FormControl>
                  <Input
                    type="datetime-local"
                    {...field}
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      const formatted =
                        date.toISOString().slice(0, -1) + "+07:00";
                      field.onChange(formatted);
                    }}
                    value={field.value ? field.value.slice(0, -6) : ""}
                  />
                </FormControl>
                <FormDescription>
                  Enter the end time in your local timezone. It will be
                  converted to the required format.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gameId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Game</FormLabel>
                <FormDescription>
                  Select the game you want to display for this event.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {gamesArray.length !== 0 ? (
                      gamesArray.map((game) => (
                        <FormItem
                          key={game.id!}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={game.id!} />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {game.name}
                          </FormLabel>
                        </FormItem>
                      ))
                    ) : (
                      <div>No games avaiable. Please create a game</div>
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full gap-3">
            <FormLabel htmlFor="idea">Product Image *</FormLabel>
            <div className="relative">
              {imageUrl ? (
                <Image
                  className="h-full w-full rounded-md object-cover shadow-md"
                  src={imageUrl}
                  alt="Event Image"
                  width={700}
                  height={400}
                />
              ) : (
                <UploadDropzone
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    toast.success("Upload Completed");
                    setImageUrl(res[0].url);
                  }}
                  onUploadError={(error: Error) => {
                    toast.error(`ERROR! ${error.message}`);
                  }}
                />
              )}
              {imageUrl && (
                <div
                  className="group absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    setImageUrl("");
                  }}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-md border border-solid border-gray-500 bg-white transition-all duration-300 hover:h-6 hover:w-6 dark:border-gray-400 dark:bg-black">
                    <X
                      className="text-gray-500 dark:text-gray-400"
                      width={16}
                      height={16}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            type="submit"
            disabled={createEvent.isPending || updateEvent.isPending}
            className="w-full"
          >
            {(isLoading || createEvent.isPending || updateEvent.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            {update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
