import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { z } from "zod";

import { db } from "../db";
import { jobApplication, jobOpening } from "../schema";
import { uploadProfilePhoto } from "../supabase";

const jobApplicationController = new Hono()
  .post(
    "/",
    zValidator(
      "form",
      z.object({
        job_opening_id: z.string().min(1, "Job opening ID is required"),
        photo_profile: z.instanceof(File).optional(),
        full_name: z.string().optional(),
        date_of_birth: z.string().optional(),
        gender: z.enum(["female", "male"]).optional(),
        domicile: z.string().optional(),
        phone: z.string().optional(),
        email: z.string().email().optional(),
        linkedin_link: z.string().url().optional(),
      }),
    ),
    async (c) => {
      try {
        const formData = c.req.valid("form");

        // Check if job opening exists
        const jobOpeningData = await db
          .select()
          .from(jobOpening)
          .where(eq(jobOpening.id, formData.job_opening_id))
          .limit(1);

        if (jobOpeningData.length === 0) {
          throw new HTTPException(404, {
            res: c.json({ error: "Job opening not found" }, 404),
          });
        }

        const jobInfo = jobOpeningData[0];
        const profileInfo = jobInfo.minimum_profile_information;

        // Validate required fields based on job opening requirements
        const validateField = (
          fieldKey: string,
          fieldValue: any,
          fieldName: string,
        ) => {
          const field = profileInfo.find((item) => item.key === fieldKey);
          if (field?.validation.required && !fieldValue) {
            throw new HTTPException(400, {
              res: c.json({ error: `${fieldName} is required` }, 400),
            });
          }
        };

        validateField("full_name", formData.full_name, "Full name");
        validateField("gender", formData.gender, "Gender");
        validateField("domicile", formData.domicile, "Domicile");
        validateField("phone_number", formData.phone, "Phone number");
        validateField("email", formData.email, "Email");
        validateField("linkedin_link", formData.linkedin_link, "LinkedIn link");
        validateField("photo_profile", formData.photo_profile, "Photo profile");

        // Handle photo upload if provided
        let photoUrl: string | null = null;
        if (formData.photo_profile) {
          try {
            photoUrl = await uploadProfilePhoto(
              formData.photo_profile,
              createId(),
            );
          } catch (error) {
            console.error("Error uploading photo:", error);
            throw new HTTPException(500, {
              res: c.json({ error: "Failed to upload photo" }, 500),
            });
          }
        }

        // Insert job application
        const [application] = await db
          .insert(jobApplication)
          .values({
            job_opening_id: formData.job_opening_id,
            photo_profile_url: photoUrl,
            full_name: formData.full_name || null,
            date_of_birth: formData.date_of_birth
              ? new Date(formData.date_of_birth)
              : null,
            gender: formData.gender || null,
            domicile: formData.domicile || null,
            phone: formData.phone || null,
            email: formData.email || null,
            linkedin_link: formData.linkedin_link || null,
          })
          .returning();

        return c.json(
          {
            message: "Application submitted successfully",
            data: application,
          },
          201,
        );
      } catch (error) {
        console.error("Error submitting job application:", error);
        if (error instanceof HTTPException) {
          throw error;
        }
        throw new HTTPException(500, {
          res: c.json({ error: "Failed to submit application" }, 500),
        });
      }
    },
  )
  .get("/", async (c) => {
    try {
      const applications = await db
        .select()
        .from(jobApplication)
        .orderBy(jobApplication.createdAt);

      return c.json(
        {
          data: applications,
          message: "Success get job applications",
        },
        200,
      );
    } catch (error) {
      console.error("Error fetching job applications:", error);
      throw new HTTPException(500, {
        res: c.json({ error: "Failed to fetch applications" }, 500),
      });
    }
  })
  .get("/:id", async (c) => {
    try {
      const { id } = c.req.param();

      const applications = await db
        .select()
        .from(jobApplication)
        .where(eq(jobApplication.id, id))
        .limit(1);

      if (applications.length === 0) {
        throw new HTTPException(404, {
          res: c.json({ error: "Application not found" }, 404),
        });
      }

      return c.json(
        {
          data: applications[0],
          message: "Success get job application detail",
        },
        200,
      );
    } catch (error) {
      console.error("Error fetching job application detail:", error);
      if (error instanceof HTTPException) {
        throw error;
      }
      throw new HTTPException(500, {
        res: c.json({ error: "Failed to fetch application detail" }, 500),
      });
    }
  });

export default jobApplicationController;
