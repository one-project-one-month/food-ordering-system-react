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
import { 
	Select, 
	SelectContent, 
	SelectItem, 
	SelectTrigger, 
	SelectValue 
} from "../../../../components/ui/select";

const formSchema = z.object({
	restaurantName: z.string().nonempty({ message: 'Restaurant name is required' }),
	restaurantImg: z.string().nonempty({ message: 'Restaurant image is required' }),
	contactNumber: z.string().nonempty({ message: 'Contact number is required' }),
	nrcRegionCode: z.string().nonempty({ message: 'Required' }),
	nrcTownship: z.string().nonempty({ message: 'Required' }),
	nrcCitizenship: z.string().nonempty({ message: 'Required' }),
	nrcNumber: z.string().nonempty({ message: 'NRC no is required' }),
	kpayNumber: z.string().nonempty({ message: 'Kpay no is required' }),
});

export default function ShopOwnerRegister() {
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			restaurantName: '',
			restaurantImg: '',
			contactNumber: '',
			nrcRegionCode: '',
			nrcTownship: '',
			nrcCitizenship: '',
			nrcNumber: '',
			kpayNumber: '',
		},
	})

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		navigate("/otp");
	}

	return (
		<CardContent className="flex flex-col items-center">
			<div className="mb-6 text-center">
				<CardTitle className="text-sm font-medium mb-2">Register</CardTitle>
				<CardDescription className="text-xs">You Create Flavors — We Create Opportunities</CardDescription>
			</div>
			<Form {...form}>
				<form className="w-full max-w-5xl" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex flex-wrap">
						<div className="w-full md:w-1/2 md:pe-8">
							<FormField
								control={form.control}
								name="restaurantName"
								render={({ field }) => (
									<FormItem className="mb-3">
										<FormLabel>Restaurant Name</FormLabel>
										<FormControl>
											<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="text" placeholder="enter your restaurant name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="restaurantImg"
								render={({ field }) => (
									<FormItem className="mb-3">
										<FormLabel>Restaurant Image</FormLabel>
										<FormControl>
											<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="file" placeholder="upload image" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="contactNumber"
								render={({ field }) => (
									<FormItem className="mb-3">
										<FormLabel>Contact Number</FormLabel>
										<FormControl>
											<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="text" placeholder="enter your Contact number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="w-full md:w-1/2 md:ps-8">
							<FormLabel>NRC</FormLabel>
							<div className="flex gap-3">
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="nrcRegionCode"
										render={({ field }) => (
											<FormItem className="mb-3">
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className="rounded-full border-[#000] !text-xs">
															<SelectValue placeholder="" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Array.from({ length: 13 }, (_, i) => (
															<SelectItem key={i + 1} value={`${i + 1}`}>
																{i + 1}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-2/4">
									<FormField
										control={form.control}
										name="nrcTownship"
										render={({ field }) => (
											<FormItem className="mb-3">
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className="rounded-full border-[#000] !text-xs">
															<SelectValue placeholder="" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Array.from({ length: 13 }, (_, i) => (
															<SelectItem key={i + 1} value={`${i + 1}`}>
																{i + 1}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
								<div className="w-1/4">
									<FormField
										control={form.control}
										name="nrcCitizenship"
										render={({ field }) => (
											<FormItem className="mb-3">
												<Select onValueChange={field.onChange} defaultValue={field.value}>
													<FormControl>
														<SelectTrigger className="rounded-full border-[#000] !text-xs">
															<SelectValue placeholder="" />
														</SelectTrigger>
													</FormControl>
													<SelectContent>
														{Array.from({ length: 13 }, (_, i) => (
															<SelectItem key={i + 1} value={`${i + 1}`}>
																{i + 1}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
												<FormMessage className="text-xs" />
											</FormItem>
										)}
									/>
								</div>
							</div>
							<FormField
								control={form.control}
								name="nrcNumber"
								render={({ field }) => (
									<FormItem className="mb-3">
										<FormControl>
											<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="text" placeholder="Number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="kpayNumber"
								render={({ field }) => (
									<FormItem className="mb-3">
										<FormLabel>Kpay Number</FormLabel>
										<FormControl>
											<Input className="!mt-1 rounded-full border-[#000] !text-xs" type="text" placeholder="enter your kpay number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div className="flex justify-center">
						<Button className="w-4/5 mt-3 rounded-full" type="submit">Continue</Button>
					</div>
				</form>
			</Form>
		</CardContent>
	);
}