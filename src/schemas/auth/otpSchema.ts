import { z } from "zod";

const otpFormSchema = z.object({
    otp: z.string().min(6, {
        message: "Your OTP must be 6 characters.",
    }),
})

export {
    otpFormSchema,
}