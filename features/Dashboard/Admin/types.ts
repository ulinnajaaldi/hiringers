import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(4, {
    message: "Job title must be at least 4 characters.",
  }),
  type: z.string().min(1, {
    message: "Job type is required.",
  }),
  description: z.string().min(4, {
    message: "Job description must be at least 4 characters.",
  }),
  number_candidate: z.number().min(1, {
    message: "Number of candidates must be at least 1.",
  }),
  min_salary: z.number().optional(),
  max_salary: z.number().optional(),
  minimum_profile_information: z.object({
    full_name: z.enum(["mandatory", "optional", "off"]),
    photo_profile: z.enum(["mandatory", "optional", "off"]),
    gender: z.enum(["mandatory", "optional", "off"]),
    domicile: z.enum(["mandatory", "optional", "off"]),
    email: z.enum(["mandatory", "optional", "off"]),
    phone_number: z.enum(["mandatory", "optional", "off"]),
    linkedin_link: z.enum(["mandatory", "optional", "off"]),
    date_of_birth: z.enum(["mandatory", "optional", "off"]),
  }),
});

export type FormSchemaType = z.infer<typeof formSchema>;
