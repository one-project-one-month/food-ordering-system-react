import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./../../../components/ui/button"
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormMessage,
} from "./../../../components/ui/form"
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
	InputOTPSeparator,
} from "./../../../components/ui/input-otp"
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader
} from "./../../../components/ui/card";
import { otpFormSchema } from "../../../schemas/auth/otpSchema"

export default function OTP() {
	const form = useForm<z.infer<typeof otpFormSchema>>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			otp: "",
		},
	})

	function onSubmit(data: z.infer<typeof otpFormSchema>) {
		console.log(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-center items-center">
					<Card className="my-12">
						<CardHeader className="text-xl">
							OTP Verification
						</CardHeader>
						<CardContent>
							<FormField
								control={form.control}
								name="otp"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<InputOTP maxLength={6} {...field}>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
												</InputOTPGroup>
												<InputOTPSeparator className="hidden md:block" />
												<InputOTPGroup>
													<InputOTPSlot index={1} />
												</InputOTPGroup>
												<InputOTPSeparator className="hidden md:block" />
												<InputOTPGroup>
													<InputOTPSlot index={2} />
												</InputOTPGroup>
												<InputOTPSeparator className="hidden md:block" />
												<InputOTPGroup>
													<InputOTPSlot index={3} />
												</InputOTPGroup>
												<InputOTPSeparator className="hidden md:block" />
												<InputOTPGroup>
													<InputOTPSlot index={4} />
												</InputOTPGroup>
												<InputOTPSeparator className="hidden md:block" />
												<InputOTPGroup>
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter the OTP sent to your phone.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex gap-2">
							<Button className="w-1/3" variant='link' type="button">Resend OTP</Button>
							<Button className="w-2/3 rounded-full" type="submit">Verify</Button>
						</CardFooter>
					</Card>
				</div>
			</form>
		</Form>
	)
}
