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
