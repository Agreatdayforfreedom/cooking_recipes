import { z } from "zod";

const passwordValidationErrorMessage: string =
  "Password must contain at least one uppercase letter, one lowercase letter, and at least one number or special character.";

const passwordSchema = z
  .string()
  .min(6)
  .max(20)
  .refine((password) => /[A-Z]/.test(password), {
    message: passwordValidationErrorMessage,
  })
  .refine((password) => /[a-z]/.test(password), {
    message: passwordValidationErrorMessage,
  })
  .refine((password) => /([0-9]|([!@#$%^&*]))/.test(password), { message: passwordValidationErrorMessage });

export const signupSchema = z
  .object({
    name: z.string().min(1),
    lastname: z.string().min(1),
    email: z.string().email(),
    password: passwordSchema,
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string(), //validate against save password,
});
