import { z } from "zod";

export const sessionPayloadSchema = z.object({
  sub: z.string().optional(),
  email: z.string().email().optional(),
  role: z.string().optional(),
});

export type SessionPayload = z.infer<typeof sessionPayloadSchema>;
