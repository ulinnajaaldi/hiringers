import { createId } from "@paralleldrive/cuid2";
import { desc, relations, sql } from "drizzle-orm";
import { integer, json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const jobOpening = pgTable("job_opening", {
  id: text("id").primaryKey().$defaultFn(createId),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  status: text("status", { enum: ["active", "inactive", "draft"] })
    .notNull()
    .default("draft"),
  type: text("type").notNull(),
  description: text("description").notNull(),
  number_candidate: integer("number_candidate").notNull(),
  min_salary: integer("min_salary"),
  max_salary: integer("max_salary"),
  minimum_profile_information: json("minimum_profile_information")
    .$type<
      Array<{
        key: string;
        validation: {
          required: boolean;
          is_off?: boolean;
        };
      }>
    >()
    .notNull(),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const jobApplication = pgTable("job_application", {
  id: text("id").primaryKey().$defaultFn(createId),
  job_opening_id: text("job_opening_id")
    .notNull()
    .references(() => jobOpening.id),
  photo_profile_url: text("photo_profile_url"),
  full_name: text("full_name"),
  date_of_birth: timestamp("date_of_birth"),
  gender: text("gender", { enum: ["female", "male"] }),
  domicile: text("domicile"),
  phone: text("phone"),
  email: text("email"),
  linkedin_link: text("linkedin_link"),
  status: text("status", {
    enum: ["pending", "reviewed", "accepted", "rejected"],
  })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: timestamp("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const jobOpeningInsertSchema = createInsertSchema(jobOpening);
export const jobApplicationInsertSchema = createInsertSchema(jobApplication);
