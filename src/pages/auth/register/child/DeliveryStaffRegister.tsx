import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { 
	Form, 
	FormControl, 
	FormField, 
	FormItem,
	FormLabel,
	FormMessage,
} from "../../../../components/ui/form";
import { 
	CardContent,
	CardTitle, 
	CardDescription, 
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { deliveryStaffRegisterFormSchema } from "../../../../schemas/auth/registerSchema";

export default function DeliveryStaffRegister() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof deliveryStaffRegisterFormSchema>>({
		resolver: zodResolver(deliveryStaffRegisterFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof deliveryStaffRegisterFormSchema>) {
		console.log(values);
		navigate("/otp");
	}

	return (
		<CardContent className="flex flex-col items-center">
			<div className="mb-6 text-center">
				<CardTitle className="text-sm font-medium mb-2">Register</CardTitle>
				<CardDescription className="text-xs">Delivering smiles? Start your route with a tap.</CardDescription>
			</div>
			<Form {...form}>
				<form className="w-full md:w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="mb-3">
								<FormLabel>email</FormLabel>
								<FormControl>
									<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="email" placeholder="please enter your email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="mb-3">
								<FormLabel>password</FormLabel>
								<FormControl>
									<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="password" placeholder="please enter your password" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full mt-3 rounded-full" type="submit">Continue</Button>
				</form>
			</Form>
		</CardContent>
	);
}