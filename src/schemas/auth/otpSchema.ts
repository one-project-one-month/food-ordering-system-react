import { z } from "zod";

const otpFormSchema = z.object({
    code: z.string().min(6, {
        message: "Your OTP must be 6 digits.",
    }),
})

export {
    otpFormSchema,
}