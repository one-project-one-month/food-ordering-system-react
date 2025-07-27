/* eslint-disable @typescript-eslint/no-deprecated */
import { z } from "zod";

const userRegisterFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required.")
		.email("Invalid email format."), 		
	password: z
		.string()
		.min(1, "Password is required.")
		.min(8, "Password must be at least 8 characters."),
	role: z.string(),
});

const shopOwnerRegisterFormSchema = z.object({
	restaurantName: z.string().nonempty({ message: 'Restaurant name is required' }),
	restaurantImg: z.string().nonempty({ message: 'Restaurant image is required' }),
	contactNumber: z.string().nonempty({ message: 'Contact number is required' }),
	nrcRegionCode: z.string().nonempty({ message: 'Required' }),
	nrcTownship: z.string().nonempty({ message: 'Required' }),
	nrcCitizenship: z.string().nonempty({ message: 'Required' }),
	nrcNumber: z.string().nonempty({ message: 'NRC no is required' }),
	kpayNumber: z.string().nonempty({ message: 'Kpay no is required' }),
});

const deliveryStaffRegisterFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { 
		message: "Password must be at least 8 characters." 
	}),
});

export {
    userRegisterFormSchema,
    shopOwnerRegisterFormSchema,
    deliveryStaffRegisterFormSchema,
}