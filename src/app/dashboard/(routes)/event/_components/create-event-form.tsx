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
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useCreateEvent, useUpdateEvent } from "@/server/event/mutation";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Event name must be at least 2 characters.",
  }),
  games: z.array(z.string()).refine((value) => value.some((game) => game), {
    message: "You have to select at least one game.",
  }),
});

interface CreateEventFormProps {
  update?: boolean;
  event?: Event;
}

const games = [
  {
    id: "1",
    label: "Shake It",
  },
  {
    id: "2",
    label: "HQ Trivia",
  },
] as const;

export const CreateEventForm = ({ update, event }: CreateEventFormProps) => {
  const { user } = useAuth();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [date, setDate] = useState<DateRange | undefined>(
    event
      ? {
          from: event.startTime,
          to: event.endTime,
        }
      : {
          from: new Date(),
          to: addDays(new Date(), 20),
        },
  );
  const createEvent = useCreateEvent();
  const updateEvent = useUpdateEvent();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: event?.name ?? "",
      games: [],
    },
  });

  const isLoading = form.formState.isLoading;
  function onSubmit(data: z.infer<typeof formSchema>) {
    if (update) {
      const updatedData = {
        ...data,
        startTime: date?.from!,
        endTime: date?.to!,
        image: imageUrl,
      };
      updateEvent.mutate(updatedData);
      form.reset();
      setImageUrl("");
      setDate(undefined);
    } else {
      const eventData = {
        ...data,
        startTime: date?.from!,
        endTime: date?.to!,
        image: imageUrl,
        brandId: user?.id!,
      };
      createEvent.mutate(eventData);
      form.reset();
      setImageUrl("");
    }
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
          <div className="grid w-full gap-3">
            <Label htmlFor="file">Select Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormField
            control={form.control}
            name="games"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Games</FormLabel>
                  <FormDescription>
                    Select the games you want to display this event.
                  </FormDescription>
                </div>
                {games.map((game) => (
                  <FormField
                    key={game.id}
                    control={form.control}
                    name="games"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={game.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(game.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, game.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== game.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {game.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full gap-3">
            <Label htmlFor="idea">Product Image *</Label>
            <div className="relative">
              {imageUrl ? (
                // Image Preview
                <Image
                  className="h-full w-full rounded-md object-cover shadow-md"
                  src={imageUrl}
                  alt="Event Image"
                  width={700}
                  height={400}
                />
              ) : (
                // Upload Icon
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

              {/* Remove Image Icon */}
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
            disabled={createEvent.isPending}
            className="w-full"
          >
            {(isLoading || createEvent.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            {update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
