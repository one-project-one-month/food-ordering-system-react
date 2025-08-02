 
 
 
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
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { shopOwnerLoginFormSchema } from "../../../../schemas/auth/loginSchema";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../../../store";
import { login } from "../../../../features/auth/authSlice";
import { Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function ShopOwnerLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.auth.loginState);
  const { redirectPath } = useSelector((state: RootState) => state.auth);

  const form = useForm<z.infer<typeof shopOwnerLoginFormSchema>>({
    resolver: zodResolver(shopOwnerLoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { handleSubmit } = form;

  async function onSubmit(values: z.infer<typeof shopOwnerLoginFormSchema>) {
    const payload = {
      email: values.email,
      password: values.password,
    };
    try {
      const result = await dispatch(login(payload)).unwrap();
      if (result?.code === 200) {
        const targetPath = redirectPath ?? "/";
        await
         navigate(targetPath);
      } else if(result.type==='auth/signup/rejected') {
        toast.error(result.payload as string)
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full md:w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent className="flex flex-col items-center">
          <div className="mb-8 text-center">
            <CardTitle className="text-lg font-medium mb-2 mt-5">Login</CardTitle>
            <CardDescription className="text-xs">
              You Create Flavors — We Create Opportunities
            </CardDescription>
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-3 w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="!mt-1 rounded-full border-[#000] !text-xs"
                    type="email"
                    placeholder="please enter your email"
                    {...field}
                  />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    className="!mt-1 rounded-full border-[#000] !text-xs"
                    type="password"
                    placeholder="please enter your password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>

        <CardFooter>
          <Button className="w-full rounded-full" disabled={loading}>
            {loading && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}Continue
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
