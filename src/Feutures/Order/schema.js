import { z } from "zod";

export const RugSchema = z.object({
  UnitSelector: z.enum(["cms", "inches"], {
    message: "required",
  }),
  length: z.number({ message: "required" }).min(1, { message: "required" }),
  width: z.number({ message: "required" }).min(1, { message: "required" }),
  RugMaterial: z.string().min(1, { message: "required" }),
  RugCleaningOption: z
    .object({
      name: z.string({ message: "required" }).min(1, { message: "required" }),
      RugImagesDescription: z.any(),
      Treatment: z.any(),
      RugImages: z.any(),
    })
    .superRefine((value, ctx) => {
      const { name, RugImages, Treatment } = value;
      if (name !== "General (Deep Wash) Rug Cleaning Works ONLY") {
        if (RugImages?.length < 3) {
          ctx.addIssue({
            message: "required",
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
            message: "required",
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
    title: z.string().min(2, { message: "required" }),
    firstName: z.string().min(1, { message: "required" }),
    lastName: z.string().min(1, { message: "required" }),
    email: z.string({ message: "required" }).email({ message: "required" }),
    phoneNumber: z.string({ message: "required" }),
    RugCollectionAddress: z.string().min(1, { message: "required" }),
    RugReturnAddress: z.any(),
    isSameRugCollectionAddress: z.any(),
    RugsUploaded: z.array(z.any()).min(1, { message: "required" }),

    RugCollectionAddressPostCode: z
      .string()
      .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, {
        message: "required",
      }),
    RugReturnAddressPostCode: z.any(),
    password: z
      .string({
        message: "required",
      })
      .min(8, { message: "required" }),
    confirmPassword: z.string({ message: "required" }).min(1, {
      message: "required",
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
          message: "required",
          path: ["RugReturnAddress"],
        });
      }
      if (
        !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/.test(RugReturnAddressPostCode)
      ) {
        ctx.addIssue({
          message: "required",
          path: ["RugReturnAddressPostCode"],
        });
      }
    }
    if (password !== confirmPassword) {
      ctx.addIssue({
        message: "required",
        path: ["confirmPassword"],
      });
    }
  });
