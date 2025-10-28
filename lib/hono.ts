import { AppType } from "@/app/api/[[...route]]/route";
import { hc } from "hono/client";

import { API_URL } from "@/constants/config";

export const client = hc<AppType>(API_URL || "http://localhost:3000");
