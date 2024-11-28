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

export const schema = z.object({
  collectionDate: z
    .string({
      message: "please fill the date of collection the Rugs",
    })
    .min(1, { message: "please fill the date of collection the Rugs" }),
  returnDate: z
    .string({ message: "please fill the date of returning the Rugs" })
    .min(1, { message: "please fill the date of returning the Rugs" }),
  RugsUploaded: z
    .array(z.any())
    .min(1, { message: "please upload 1 rug at least" }),
});
