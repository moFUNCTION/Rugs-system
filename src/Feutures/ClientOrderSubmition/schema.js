import { z } from "zod";

export const schema = z.object({
  collectionDate: z
    .string({
      message: "please fill the date of collection the Rugs",
    })
    .min(1, { message: "please fill the date of collection the Rugs" }),
  returnDate: z
    .string({ message: "please fill the date of returning the Rugs" })
    .min(1, { message: "please fill the date of returning the Rugs" }),
});
