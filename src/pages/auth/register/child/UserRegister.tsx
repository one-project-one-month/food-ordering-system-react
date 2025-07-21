/* eslint-disable @typescript-eslint/no-misused-promises */
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { 
	CardContent,
	CardTitle, 
	CardDescription, 
} from "../../../../components/ui/card";
import Cookies from "js-cookie";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { userRegisterFormSchema } from "../../../../schemas/auth/registerSchema";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../store";
import { resetFlow } from "../../../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

export default function UserRegister() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const { loading } = useSelector((state: RootState) => state.auth.loginState);
	const form = useForm<z.infer<typeof userRegisterFormSchema>>({
		resolver: zodResolver(userRegisterFormSchema),
		defaultValues: {
			email: '',
			password: '',
			role: 'user',
		},
	})

	function onSubmit(values: z.infer<typeof userRegisterFormSchema>) {
		console.log("registered ", values);
		Cookies.remove('checkedEmail')
		void navigate('/login', { replace: true });
		setTimeout(() => {
			dispatch(resetFlow());
		}, 100);
	}

	return (
		<CardContent className="flex flex-col items-center ">
			<div className="mb-8 text-center ">
				<CardTitle className="text-lg font-medium mb-2 mt-5">Register</CardTitle>
				<CardDescription className="text-xs">Hungry? Get started with just one click</CardDescription>
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
					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<FormItem className="mb-3">
							<FormLabel>Choose your Role</FormLabel>
							<FormControl>
								<Select
								onValueChange={field.onChange}
								defaultValue={field.value}
								>
								<SelectTrigger className="rounded-full border border-[#000] text-xs">
									<SelectValue placeholder="Select a role" />
								</SelectTrigger>
								<SelectContent className="bg-white rounded-xl shadow-md animate-in fade-in">
									<SelectItem value="CUSTOMER">Customer</SelectItem>
									<SelectItem value="DELIVERY_STUFF">Delivery</SelectItem>
									<SelectItem value="RESTAURANT_OWNER">Restaurant Owner</SelectItem>
								</SelectContent>
								</Select>
							</FormControl>
							<FormMessage />
							</FormItem>
						)}
					/>
					<Button className="w-full rounded-full" type="submit" disabled={loading}>
						{loading && (
						<Loader2 className="h-4 w-4 animate-spin" />
						)}Continue
					</Button>
				</form>
			</Form>
		</CardContent>
	);
}