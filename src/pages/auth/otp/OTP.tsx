 
/* eslint-disable @typescript-eslint/no-misused-promises */
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
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../store"
import { setOtpVerified, verifyAccount } from "../../../features/auth/authSlice"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import type { OtpProps } from "../../../types/auth.types"
import { toast } from "react-toastify"

export default function OTP() {
	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()
	const { loading } = useSelector((state: RootState) => state.auth.verifyEMailState);
	const form = useForm<z.infer<typeof otpFormSchema>>({
		resolver: zodResolver(otpFormSchema),
		defaultValues: {
			code: "",
		},
	})
	const email = Cookies.get('checkedEmail')

	function onSubmit(data: z.infer<typeof otpFormSchema>) {
		const payload = {
			email,
			code: data.code
		}
		void otpCheck(payload as OtpProps)
	}

	const otpCheck = async (values:OtpProps)=>{
		try{
			const result:any = await dispatch(verifyAccount(values))
			if(result.code === 200){
				dispatch(setOtpVerified(true))
				void navigate('/signup')
			}
		}catch(error:any){
			console.log(error)
			toast.error("Something is wrong while verifying account")	
		}
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
								name="code"
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
											Please enter the OTP sent to your email.
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className="flex gap-2">
							<Button className="w-1/3" variant='link' type="button">Resend OTP</Button>
							<Button className="w-2/3 rounded-full" type="submit" disabled={loading}>{loading && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}Verify</Button>
						</CardFooter>
					</Card>
				</div>
			</form>
		</Form>
	)
}
