import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    email: z.string().email(),
  }),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>["body"];
