CREATE TABLE "job_opening" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"status" text DEFAULT 'draft' NOT NULL,
	"type" text NOT NULL,
	"description" text NOT NULL,
	"number_candidate" integer NOT NULL,
	"min_salary" integer,
	"max_salary" integer,
	"minimum_profile_information" json NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
