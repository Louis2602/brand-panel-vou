"use client";

import {
  Form,
  FormControl,
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
import { Voucher } from "@/types/brand";
import { format } from "date-fns";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { cn, generateVoucherCode } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { useCreateVoucher, useUpdateEvent } from "@/server/voucher/mutation";
import { toast } from "sonner";
import { useAuth } from "@/providers/auth-provider";
import Image from "next/image";
import { UploadDropzone, useUploadThing } from "@/utils/uploadthing";
import QRCode from "qrcode.react";
import { useEvents } from "@/server/event/query";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  description: z.string().min(2, {
    message: "Voucher description must be at least 2 characters.",
  }),
  code: z.string().length(6, {
    message: "Voucher code must be 6 characters.",
  }),
  amount: z.string().min(1, {
    message: "Voucher amount must be at least 1.",
  }),
  value: z.string().min(1, {
    message: "Voucher value must be at least 1.",
  }),
  artifactsNeeded: z.string().min(1, {
    message: "Artifacts for voucher must be at least 1.",
  }),
  eventId: z.string().min(1, {
    message: "Must choose an event.",
  }),
  expiredDate: z.date({
    required_error: "Voucher must have a expired date.",
  }),
});

interface CreateVoucherFormProps {
  update?: boolean;
  voucher?: Voucher;
}

export const CreateVoucherForm = ({
  update,
  voucher,
}: CreateVoucherFormProps) => {
  const { user } = useAuth();
  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      const fileUrl = res[0].url;
      setQrUrl(fileUrl);
      toast.success("QR code uploaded");
    },
    onUploadError: () => {
      toast.error("Error occurred while uploading QR code");
    },
    onUploadBegin: () => {
      toast.info("QR Code upload has begun");
    },
  });
  const { data: events } = useEvents();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [qrUrl, setQrUrl] = useState<string>("");
  const createVoucher = useCreateVoucher();
  const updateEvent = useUpdateEvent();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      code: "",
      amount: "",
      value: "",
      artifactsNeeded: "",
      expiredDate: new Date(),
    },
  });

  const isLoading = form.formState.isLoading;
  async function onSubmit(data: z.infer<typeof formSchema>) {
    if (update) {
      const updatedData = {
        ...data,
        image: imageUrl,
        qrCode: qrUrl,
      };
      // updateEvent.mutate(updatedData);
    } else {
      const voucherData = {
        ...data,
        image: imageUrl,
        qrCode: qrUrl,
        status: "ACTIVE",
        amount: parseInt(data.amount),
        artifactsNeeded: parseInt(data.artifactsNeeded),
        value: parseFloat(data.value),
        brandId: user?.id,
      };
      createVoucher.mutate(voucherData);
    }
  }

  const createVoucherCode = () => {
    const code = generateVoucherCode(user?.name!);
    form.setValue("code", code);
  };

  const uploadQR = async () => {
    const canvas = document.getElementById("qrcode");
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const response = await fetch(pngUrl);
    const blob = await response.blob();

    const file = new File([blob], `qrcode_${new Date().getTime()}.png`, {
      type: "image/png",
    });

    startUpload([file]);
  };

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Voucher Code</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="PLB12C, SB12TA"
                      {...field}
                      maxLength={6}
                    />
                    <Button onClick={createVoucherCode} type="button">
                      Generate
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.getValues("code").length !== 0 && (
            <>
              <QRCode size={120} value={form.getValues("code")} id="qrcode" />
              <Button
                onClick={uploadQR}
                disabled={isUploading || qrUrl.length !== 0}
                type="button"
              >
                {(isUploading || createVoucher.isPending) && (
                  <Loader className="h-4 w-4 mr-2" />
                )}
                Upload QR
              </Button>
            </>
          )}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="This voucher is used for..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="artifactsNeeded"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artifacts Needed</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    maxLength={50}
                    type="number"
                    placeholder="Enter the amount of artifacts"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter the amount of vouchers"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Value</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter the value of voucher"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid w-full gap-3">
            <FormField
              control={form.control}
              name="expiredDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expired Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
            <Label htmlFor="image">Voucher Image *</Label>
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
            disabled={createVoucher.isPending}
            className="w-full"
          >
            {(isLoading || createVoucher.isPending) && (
              <Loader className="h-4 w-4 mr-2" />
            )}
            {update ? "Update" : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
