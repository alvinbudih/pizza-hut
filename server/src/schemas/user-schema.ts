import { z } from "zod";

export const userSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(1).max(255),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email must be a valid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(5)
    .max(255),
  role: z.string({ required_error: "Role is required" }),
});

export const loginSchema = userSchema.pick({ email: true, password: true });

export const userEditSchema = userSchema.partial({ password: true });

export type UserPayload = z.infer<typeof userSchema>;

export type LoginPayload = z.infer<typeof loginSchema>;

export type UserEditPayload = z.infer<typeof userEditSchema>;
