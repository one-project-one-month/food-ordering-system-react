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
	CardFooter,
	CardDescription, 
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { adminLoginFormSchema } from "../../../../schemas/auth/loginSchema";

export default function AdminLogin() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof adminLoginFormSchema>>({
		resolver: zodResolver(adminLoginFormSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onSubmit(values: z.infer<typeof adminLoginFormSchema>) {
		console.log(values);
		navigate("/");
	}

	return (
		<>
			<Form {...form}>
				<form className="w-full md:w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
					<CardContent className="flex flex-col items-center">
						<div className="mb-6 text-center">
							<CardTitle className="text-sm font-medium mb-2">Login</CardTitle>
							<CardDescription className="text-xs">Manage smarter. One click to take control.</CardDescription>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="mb-3 w-full">
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
								<FormItem className="w-full">
									<FormLabel>password</FormLabel>
									<FormControl>
										<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="password" placeholder="please enter your password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
					<CardFooter>
						<Button className="w-full rounded-full" type="submit">Continue</Button>
					</CardFooter>
				</form>
			</Form>
		</>
	);
}