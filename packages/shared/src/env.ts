import { z } from "zod";

/** Schema for API/server env (Zod-validated at startup). Do not put secrets in shared if consumed by web. */
export const apiEnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  API_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  GOOGLE_REDIRECT_URI: z.string().url().optional(),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

/** Parse and return API env from process.env. Throws if invalid. */
export function parseApiEnv(env: unknown): ApiEnv {
  return apiEnvSchema.parse(env);
}
