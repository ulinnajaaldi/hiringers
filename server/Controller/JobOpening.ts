import { zValidator } from "@hono/zod-validator";
import { addWeeks, format } from "date-fns";
import { and, desc, eq, ilike, or } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { formatNumber } from "@/lib/number";
import { firstLetterUppercase } from "@/lib/text";

import { db } from "../db";
import { jobOpening, jobOpeningInsertSchema } from "../schema";

const jobOpeningController = new Hono()
  .post(
    "/",
    zValidator(
      "json",
      jobOpeningInsertSchema.omit({
        id: true,
        slug: true,
        createdAt: true,
        updatedAt: true,
      }),
    ),
    async (c) => {
      try {
        const values = c.req.valid("json");

        const slug = values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        const existingJob = await db
          .select()
          .from(jobOpening)
          .where(eq(jobOpening.slug, slug))
          .limit(1);

        if (existingJob.length > 0) {
          throw new HTTPException(400, {
            res: c.json(
              { error: "Job opening with this title already exists" },
              400,
            ),
          });
        }

        await db
          .insert(jobOpening)
          .values({ ...values, slug: slug })
          .returning();

        return c.json({ message: "Job opening added successfully" }, 201);
      } catch (error) {
        console.error("Error to add job opening:", error);
        throw new HTTPException(500, {
          res: c.json({ error: "Failed to add job opening" }, 500),
        });
      }
    },
  )
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
      }),
    ),
    async (c) => {
      try {
        const { search } = c.req.valid("query");

        const jobs = await db
          .select()
          .from(jobOpening)
          .where(
            and(
              search
                ? or(
                    ilike(jobOpening.title, `%${search}%`),
                    ilike(jobOpening.description, `%${search}%`),
                  )
                : undefined,
              eq(jobOpening.status, "active"),
            ),
          )
          .orderBy(desc(jobOpening.createdAt));

        const mappingData = jobs.map((job) => {
          const getSalaryDisplayText = () => {
            if (job.min_salary && job.max_salary) {
              return `Rp${formatNumber(job.min_salary)} - Rp${formatNumber(job.max_salary)}`;
            } else if (job.min_salary) {
              return `Rp${formatNumber(job.min_salary)}`;
            } else if (job.max_salary) {
              return `Rp${formatNumber(job.max_salary)}`;
            }
            return "Salary not specified";
          };

          return {
            id: job.id,
            slug: job.slug,
            title: job.title,
            status: job.status,
            company: {
              name: "Rakamin",
              location: "Jakarta Selatan",
              photo_url: "/images/rakamin-logo.png",
            },
            salary_range: {
              min: job.min_salary,
              max: job.max_salary,
              currency: "IDR",
              display_text: getSalaryDisplayText(),
            },
            list_card: {
              badge: firstLetterUppercase(job.status),
              started_on_text: `started on ${format(addWeeks(new Date(job.createdAt!), 1), "d MMM yyyy")}`,
              cta: "Manage Job",
            },
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
          };
        });

        return c.json(
          {
            data: mappingData,
            message: "Success get job opening",
          },
          200,
        );
      } catch (error) {
        console.error("Error to fetch job openings:", error);
        throw new HTTPException(500, {
          res: c.json({ error: "Failed to fetch job openings" }, 500),
        });
      }
    },
  )
  .get(
    "/all",
    zValidator(
      "query",
      z.object({
        search: z.string().optional(),
      }),
    ),
    async (c) => {
      try {
        const { search } = c.req.valid("query");

        const jobs = await db
          .select()
          .from(jobOpening)
          .where(
            search
              ? or(
                  ilike(jobOpening.title, `%${search}%`),
                  ilike(jobOpening.description, `%${search}%`),
                )
              : undefined,
          )
          .orderBy(desc(jobOpening.createdAt));

        const mappingData = jobs.map((job) => {
          const getSalaryDisplayText = () => {
            if (job.min_salary && job.max_salary) {
              return `Rp${formatNumber(job.min_salary)} - Rp${formatNumber(job.max_salary)}`;
            } else if (job.min_salary) {
              return `Rp${formatNumber(job.min_salary)}`;
            } else if (job.max_salary) {
              return `Rp${formatNumber(job.max_salary)}`;
            }
            return "Salary not specified";
          };

          return {
            id: job.id,
            slug: job.slug,
            title: job.title,
            status: job.status,
            company: {
              name: "Rakamin",
              location: "Jakarta Selatan",
              photo_url: "/images/rakamin-logo.png",
            },
            salary_range: {
              min: job.min_salary,
              max: job.max_salary,
              currency: "IDR",
              display_text: getSalaryDisplayText(),
            },
            list_card: {
              badge: firstLetterUppercase(job.status),
              started_on_text: `started on ${format(addWeeks(new Date(job.createdAt!), 1), "d MMM yyyy")}`,
              cta: "Manage Job",
            },
            createdAt: job.createdAt,
            updatedAt: job.updatedAt,
          };
        });

        return c.json(
          {
            data: mappingData,
            message: "Success get job opening",
          },
          200,
        );
      } catch (error) {
        console.error("Error to fetch job openings:", error);
        throw new HTTPException(500, {
          res: c.json({ error: "Failed to fetch job openings" }, 500),
        });
      }
    },
  )
  .get("/:slug", async (c) => {
    try {
      const { slug } = c.req.param();

      const jobs = await db
        .select()
        .from(jobOpening)
        .where(eq(jobOpening.slug, slug));

      if (jobs.length === 0) {
        throw new HTTPException(404, {
          res: c.json({ error: "Job opening not found" }, 404),
        });
      }

      const mappingData = {
        ...jobs[0],
        company: {
          name: "Rakamin",
          location: "Jakarta Selatan",
          photo_url: "/images/rakamin-logo.png",
        },
      };

      return c.json(
        {
          data: mappingData,
          message: "Success get job opening detail",
        },
        200,
      );
    } catch (error) {
      console.error("Error to fetch job opening detail:", error);
      throw new HTTPException(500, {
        res: c.json({ error: "Failed to fetch job opening detail" }, 500),
      });
    }
  });

export default jobOpeningController;
