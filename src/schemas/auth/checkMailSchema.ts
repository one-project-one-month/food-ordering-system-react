import { z } from "zod";

export const checkMailSchema = z.object({
    email: z.email(),
});