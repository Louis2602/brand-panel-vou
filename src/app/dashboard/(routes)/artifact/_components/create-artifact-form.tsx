"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/global/loader";
import { Artifact, Event } from "@/types/brand";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useUpdateEvent } from "@/server/voucher/mutation";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { useEvents } from "@/server/event/query";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useCreateArtifact } from "@/server/artifacts/mutation";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  artifactName: z.string().min(1, {
    message: "Artifact must have a name",
  }),
  eventId: z.string().min(1, {
    message: "Must choose an event.",
  }),
});

interface CreateArtifactFormProps {
  update?: boolean;
  artifact?: Artifact;
}

export const CreateArtifactForm = ({
  update,
  artifact,
}: CreateArtifactFormProps) => {
  const { user } = useAuth();
  const { data: events } = useEvents();
  const [imageUrl, setImageUrl] = useState<string>("");
  const createArtifact = useCreateArtifact();
  const updateEvent = useUpdateEvent();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isLoading;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (update) {
      const updatedData = {
        ...data,
        image: imageUrl,
      };
      // updateEvent.mutate(updatedData);
    } else {
      const voucherData = {
        ...data,
        image: imageUrl,
      };
      createArtifact.mutate(voucherData);
    }
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full gap-3">
            <Label htmlFor="artifactName">Artifact Name</Label>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="artifactName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="artifactName"
                      placeholder="Diamond"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="eventId">Select an event</Label>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="eventId"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {events &&
                        events.map((event: Event) => (
                          <SelectItem value={event.id} key={event.id}>
                            {event.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid w-full gap-3">
            <Label htmlFor="image">Artifact Image *</Label>
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
            disabled={createArtifact.isPending}
            className="w-full"
          >
            {(isLoading || createArtifact.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            {update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
