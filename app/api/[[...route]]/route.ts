import healtController from "@/server/Controller/Healt";
import jobApplicationController from "@/server/Controller/JobApplication";
import jobOpeningController from "@/server/Controller/JobOpening";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { handle } from "hono/vercel";

const app = new Hono().basePath("/api");
app.use("*", secureHeaders());
app.use(
  "*",
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://yourdomain.com"]
        : ["http://localhost:3000"],
    credentials: true,
  }),
);
app.use("*", logger());

app.onError((err, c) => {
  console.error("Error:", {
    message: err.message,
    stack: err.stack,
    path: c.req.path,
    method: c.req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: err.message,
        status: err.status,
      },
      err.status,
    );
  }

  return c.json(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    },
    500,
  );
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes = app
  .route("/", healtController)
  .route("/job-opening", jobOpeningController)
  .route("/job-application", jobApplicationController);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
