"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PasswordInput } from "./password-input";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/providers/auth-provider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignUpSchema } from "@/lib/validations/auth";
import { Loader } from "../global/loader";
import { toast } from "sonner";
import { env } from "@/env";

export function SignUpForm() {
  const [submitError, setSubmitError] = useState<string | undefined>("");
  const [location, setLocation] = useState<{} | null>(null);

  const form = useForm<z.infer<typeof SignUpSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: "",
      industry: "",
      address: "",
      brandName: "",
      status: "",
      password: "",
    },
  });

  const name = form.watch("name");
  const isLoading = form.formState.isSubmitting;
  const { register } = useAuth();
  const onSubmit: SubmitHandler<z.infer<typeof SignUpSchema>> = async (
    data,
  ) => {
    try {
      const location = await getLocation(data.address);
      if (location) {
        await register({ ...data, ...location });
      } else {
        toast.error(
          "Unable to process registration without valid location data.",
        );
      }
    } catch (error) {
      console.error("Registration error:", error);
      setSubmitError(
        "An error occurred during registration. Please try again.",
      );
    }
  };

  const getLocation = async (address: string) => {
    const accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [longitude, latitude] = data.features[0].center;
        return { latitude, longitude };
      } else {
        toast.error("No results found for the given address.");
        return null;
      }
    } catch (error) {
      toast.error("An error occurred while fetching the location.");
      return null;
    }
  };

  useEffect(() => {
    if (name) {
      const formattedBrandName = name.replace(/\s+/g, "").toLowerCase();
      form.setValue("brandName", formattedBrandName);
    } else {
      form.setValue("brandName", "");
    }
  }, [name, form]);

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-xl">Create Brand Account</CardTitle>
            <CardDescription>
              Enter your information to create a brand account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
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
                            placeholder="starbucks, pizza4ps, ..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="field">Industry</Label>
                  <FormField
                    disabled={isLoading}
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            id="industry"
                            placeholder="Taxi, Beverage, ..."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input {...field} id="address" placeholder="Address" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your brand status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Status</SelectLabel>
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brandName">BrandName</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          id="brandName"
                          type="text"
                          placeholder="grab, starbucks, ..."
                          disabled
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          id="password"
                          autoComplete="password"
                          placeholder="************"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader className="w-4 h-4 mr-2" />}
                Create Brand Account
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/signin" className="underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
