/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
} from "../../../components/ui/form";
import { 
    Card,
	CardContent,
	CardDescription,
	CardTitle, 
} from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { checkMailSchema } from "../../../schemas/auth/checkMailSchema";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../store";
import { setEmailSubmitted, verifyEmail } from "../../../features/auth/authSlice";
import { useToast } from "../../../hooks/use-toast";

export default function CheckMail() {
	const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const { loading } = useSelector((state: RootState) => state.auth.verifyEMailState);
    const { toast } = useToast()
	const form = useForm<z.infer<typeof checkMailSchema>>({
		resolver: zodResolver(checkMailSchema),
		defaultValues: {
			email: '',
		},
	})

	async function onSubmit(values: z.infer<typeof checkMailSchema>) {
        const email = values.email;
        try {
            const result = await dispatch(verifyEmail({email})).unwrap();
            console.log("Resulet ", result)
            if (result?.status === 200) {
                void navigate(`/otp`);
                Cookies.set('checkedEmail', values.email)
                dispatch(setEmailSubmitted(true));
            } else {
                console.error("Login failed", result);
            }
        } catch (error) {
            toast({
                title: "Scheduled: Catch up",
                description: "Friday, February 10, 2023 at 5:57 PM",
            })
              console.error("Login error:", error);
        }
	}

	return (
        <div className="flex justify-center items-center">
            <Card className="mx-3 my-12 md:px-10">
                <CardContent className="flex mt-5 flex-col items-center">
                    <div className="mb-8 text-center">
                        <CardTitle className="text-lg font-medium mb-2">Verify Email</CardTitle>
                        <CardDescription className="text-xs">
                            Send otp to your email - to verify account
                        </CardDescription>
                    </div>
                    <Form {...form}>
                        <form className="w-full md:w-[400px]" onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }:any) => (
                                    <FormItem className="mb-3">
                                        <FormLabel>email</FormLabel>
                                        <FormControl>
                                            <Input className="!mt-1 rounded-full border-[#000] !text-xs" type="email" placeholder="please enter your email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full mt-3 rounded-full" type="submit" disabled={loading} >
                                {loading && (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                )}Continue
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
	);
}