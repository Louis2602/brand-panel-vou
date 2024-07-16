import { z } from "zod";

export const SignInSchema = z.object({
  brandName: z
    .string()
    .describe("Brand Name")
    .min(1, "Brand Name is required")
    .refine((value) => !/\s/.test(value), {
      message: "Brand Name should not contain spaces",
    }),
  password: z.string().describe("Password").min(1, "Password is required"),
});

export const SignUpSchema = z.object({
  name: z.string().describe("Name").min(1, "Name is required"),
  brandName: z.string().describe("Brand Name").min(1, "Brand Name is required"),
  address: z.string().describe("Address").min(1, "Address is required"),
  status: z.string().describe("Status").min(1, "Brand Status is required"),
  industry: z.string().describe("Industry").min(1, "Industry is required"),
  password: z.string().describe("Password").min(1, "Password is required"),
});
