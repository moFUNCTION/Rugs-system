import { z } from "zod";
export const RugSchema = z.object({
  UnitSelector: z.enum(["cms", "inches"], {
    message: "please choose the unit either its inch or cms",
  }),
  length: z
    .number({ message: "please fill the length field in the rug" })
    .min(1, { message: "the least number in length is 1m" }),
  width: z
    .number({ message: "please fill the width field in the rug" })
    .min(1, { message: "the least number in width is 1m" }),
  RugMaterial: z.string().min(1, { message: "please choose the Rug Material" }),
  RugCleaningOption: z
    .object({
      name: z
        .string({ message: "please choose the Rug cleaning option" })
        .min(1, { message: "please choose the Rug cleaning option" }),
      RugImagesDescription: z.any(),
      Treatment: z.any(),
      RugImages: z.any(),
    })
    .superRefine((value, ctx) => {
      const { name, RugImages, Treatment } = value;
      if (name !== "General (Deep Wash) Rug Cleaning Works ONLY") {
        if (RugImages?.length < 3) {
          ctx.addIssue({
            message: "please upload at least 3 photos of your Rug",
            path: ["RugImages"],
          });
        }
      }
      if (
        name ===
        "Deep Wash Rug Cleaning and tick one or more Stain Treatments | Repairs or Restoration works | Alteration works"
      ) {
        if (Treatment?.length === 0) {
          ctx.addIssue({
            message: "please choose the Treatment you want",
            path: ["Treatment"],
          });
        }
      }
    }),
  AdditionalServices: z.any(),
  Comment: z.any(),
});

export const schema = z
  .object({
    title: z.string().min(1, { message: "please fill the Title field" }),
    username: z.string().min(1, { message: "you must fill username field" }),
    email: z
      .string({ message: "you must fill the email field" })
      .email({ message: "in valid email" }),
    phoneNumber: z.number({ message: "please fill the phone number field" }),
    RugCollectionAddress: z
      .string()
      .min(1, { message: "you must fill the Rug Collection Address Field" }),
    RugReturnAddress: z.any(),
    isSameRugCollectionAddress: z.any(),
    RugsUploaded: z
      .array(z.any())
      .min(1, { message: "please upload 1 rug at least" }),

    RugCollectionAddressPostCode: z
      .string()
      .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, {
        message: "Invalid UK postal code format",
      }),
    RugReturnAddressPostCode: z.any(),
    password: z
      .string({
        message: "please fill the password field",
      })
      .min(8, { message: "password must be more than 8 characters" }),
    confirmPassword: z.string({ message: "please confirm password" }).min(1, {
      message: "please confirm password",
    }),
  })
  .superRefine((value, ctx) => {
    const {
      isSameRugCollectionAddress,
      RugReturnAddress,
      RugReturnAddressPostCode,
      password,
      confirmPassword,
    } = value;

    if (isSameRugCollectionAddress === "No") {
      if (!RugReturnAddress) {
        ctx.addIssue({
          message: "you must fill the Rug Return Address Field",
          path: ["RugReturnAddress"],
        });
      }
      if (
        !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(RugReturnAddressPostCode)
      ) {
        ctx.addIssue({
          message: "Invalid UK postal code format",
          path: ["RugReturnAddressPostCode"],
        });
      }
    }
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "please rewrite the password correctly",
        path: ["confirmPassword"],
      });
    }
  });
