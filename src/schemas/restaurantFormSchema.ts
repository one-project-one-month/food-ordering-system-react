import { z } from "zod";

export const restaurantFormSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant Name is required"),
  contactNumber: z
    .string()
    .min(1, "Contact Number is required")
    .regex(/^\d+$/, "Contact Number must contain only digits")
    .min(6, "Contact Number must be at least 6 number"),
  nrc: z.string()
    .min(1, "NRC is required")
    .regex(/^\d{1,2}\/[a-zA-Z]+\([a-zA-Z]\)\d{6}$/, "NRC must be in the format 12/kamata(N)111111"),
  kpayNumber: z
    .string()
    .min(1, "Contact Number is required")
    .regex(/^\d+$/, "Contact Number must contain only digits")
    .min(6, "Contact Number must be at least 6 number"),
});
