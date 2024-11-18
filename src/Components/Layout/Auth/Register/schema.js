import { z } from "zod";

export const schema = z
  .object({
    username: z.string().min(1, { message: "you must fill username field" }),
    email: z
      .string({ message: "you must fill the email field" })
      .email({ message: "in valid email" }),
    phoneNumber: z.number({ message: "please fill the phone number field" }),
    locationAddress: z
      .string()
      .min(1, { message: "you must fill the  Address Field" }),
    locationPostCode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, {
      message: "Invalid UK postal code format",
    }),
    RugReturnAddress: z.any(),
    password: z
      .string({
        message: "please fill the password field",
      })
      .min(8, { message: "password must be more than 8 characters" }),
    confirmPassword: z.string({ message: "please confirm password" }),
  })
  .superRefine((value, ctx) => {
    const { password, confirmPassword } = value;
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "please rewrite the password correctly",
        path: ["confirmPassword"],
      });
    }
  });
