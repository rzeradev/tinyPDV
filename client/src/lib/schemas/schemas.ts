import { z } from "zod";
 
export const newLoginSchema = z.object({
  email: z
    .string({ required_error: "O campo Email precisa ser preenchido." })
    .email("Esse não é um email válido."),
  password: z
    .string({required_error: "O campo Senha precisa ser preenchido."})
    .min(1, { message: "O campo Senha precisa ser preenchido." })
    .min(8, {message: "O campo Senha precisa ter no mínimo 8 caracteres."})
    .max(50), 
});
 
export type NewLoginSchema = typeof newLoginSchema;