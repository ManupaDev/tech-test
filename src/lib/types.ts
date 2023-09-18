import { z } from "zod";

export const RegisterUserDTOSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

export type RegisterUserDTO = z.infer<typeof RegisterUserDTOSchema>;
