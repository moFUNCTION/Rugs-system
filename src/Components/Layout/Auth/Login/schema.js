import { z } from "zod";

export const schema = z.object({
  email: z
    .string({ message: "you must fill the email field" })
    .email({ message: "in valid email" }),
  password: z.any(),
});
