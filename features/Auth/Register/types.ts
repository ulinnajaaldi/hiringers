import { z } from "zod";

export const formSchema = z.object({
  email: z
    .string()
    .email({
      message: "Alamat email tidak valid",
    })
    .min(1, {
      message: "Alamat email tidak boleh kosong",
    }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
