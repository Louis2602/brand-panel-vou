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
import { Artifact } from "@/types/brand";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { UploadDropzone } from "@/utils/uploadthing";
import { useCreateArtifact } from "@/server/artifacts/mutation";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Artifact must have a name",
  }),
});

interface CreateArtifactFormProps {
  update?: boolean;
  artifact?: Artifact;
  eventId: string;
}

export const CreateArtifactForm = ({
  update,
  artifact,
  eventId,
}: CreateArtifactFormProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const createArtifact = useCreateArtifact();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isLoading;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    console.log("Form submitted with data:", data);
    console.log("Image URL:", imageUrl);
    if (update) {
      const updatedData = {
        ...data,
        image: imageUrl,
      };
      // updateEvent.mutate(updatedData);
    } else {
      const artifactData = {
        ...data,
        image: imageUrl,
        eventId: eventId,
      };
      createArtifact.mutate(artifactData);
    }
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid w-full gap-3">
            <Label htmlFor="name">Artifact Name</Label>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      id="name"
                      placeholder="Diamond"
                    />
                  </FormControl>
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
