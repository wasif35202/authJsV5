import * as z from "zod";


export const SettingsSchema = z.object({
  name: z.optional(z.string())
})

export const LoginSchema = z.object({
  email: z.string().email({ message: "Valid Email is required" }),
  password: z
    .string()
    .min(1, { message: "Password must be at least 1 character" }),
    code:z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Valid Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character" }),
  name: z.string().min(1, { message: "Name must be at least 1 character" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 character" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Valid Email is required" }),
});
