CREATE TABLE "job_application" (
	"id" text PRIMARY KEY NOT NULL,
	"job_opening_id" text NOT NULL,
	"photo_profile_url" text,
	"full_name" text,
	"date_of_birth" timestamp,
	"gender" text,
	"domicile" text,
	"phone" text,
	"email" text,
	"linkedin_link" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
ALTER TABLE "job_application" ADD CONSTRAINT "job_application_job_opening_id_job_opening_id_fk" FOREIGN KEY ("job_opening_id") REFERENCES "public"."job_opening"("id") ON DELETE no action ON UPDATE no action;