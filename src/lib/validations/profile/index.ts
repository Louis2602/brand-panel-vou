import * as z from "zod";

const StatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your name must be at least 2 characters long",
    })
    .max(50)
    .optional(),
  address: z
    .string()
    .min(2, {
      message: "The address must be at least 2 characters long",
    })
    .max(50)
    .optional(),
  status: StatusEnum.optional(),
});
