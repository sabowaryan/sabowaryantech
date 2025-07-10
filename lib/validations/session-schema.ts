import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string().email({ message: "Email invalide" }),
  password: z.string().min(6, { message: "Mot de passe trop court" }),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>; 