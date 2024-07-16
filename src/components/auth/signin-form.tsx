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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "./password-input";
import { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { SignInSchema } from "@/lib/validations/auth";
import { Loader } from "../global/loader";

export function SignInForm() {
  const [submitError, setSubmitError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof SignInSchema>>({
    mode: "onChange",
    resolver: zodResolver(SignInSchema),
    defaultValues: { brandName: "", password: "" },
  });

  const isLoading = form.formState.isSubmitting;
  const { login } = useAuth();
  const onSubmit: SubmitHandler<z.infer<typeof SignInSchema>> = async ({
    brandName,
    password,
  }) => {
    await login(brandName, password);
  };

  return (
    <Form {...form}>
      <form
        onChange={() => {
          if (submitError) setSubmitError("");
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="brandName">Brand Name</Label>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="brandName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          id="brandName"
                          placeholder="starbucks, pizza4ps, ..."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="current_password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormField
                  disabled={isLoading}
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <PasswordInput
                          {...field}
                          id="current_password"
                          autoComplete="current-password"
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
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link href="/auth/signup" className="underline">
                Create a new brand account
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
