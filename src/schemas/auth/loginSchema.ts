/* eslint-disable @typescript-eslint/no-deprecated */
import { z } from "zod";

const adminLoginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { 
		message: "Password must be at least 8 characters." 
	}),
});

const userLoginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { 
		message: "Password must be at least 8 characters." 
	}),
});

const shopOwnerLoginFormSchema = z.object({
	email: z
		.string()
		.min(1, "Email is required.")
		.email("Invalid email format."), 		
	password: z
		.string()
		.min(1, "Password is required.")
		.min(8, "Password must be at least 8 characters."),
});

const deliveryStaffLoginFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8, { 
		message: "Password must be at least 8 characters." 
	}),
});

export { 
    adminLoginFormSchema, 
    userLoginFormSchema, 
    shopOwnerLoginFormSchema, 
    deliveryStaffLoginFormSchema 
};