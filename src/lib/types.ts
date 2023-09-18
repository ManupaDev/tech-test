import { type } from "os";
import { z } from "zod";

export const RegisterUserMutationDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

export type RegisterUserMutationDTO = z.infer<
  typeof RegisterUserMutationDTOSchema
>;

export const RegisterUserDTOSchema = z.object({
  uid: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export const LoginUserMutationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginUserMutationDTO = z.infer<typeof LoginUserMutationSchema>;

export const PrismaUserSchema = z.object({
  id: z.string(),
  uid: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  number1: z.number(),
  number2: z.number(),
});

export type PrismaUser = z.infer<typeof PrismaUserSchema>;

export const NumberMediaSchema = z.object({
  number: z.number(),
  media: z
    .object({
      id: z.string(),
      image: z.string(),
      number: z.number(),
    })
    .array(),
});
