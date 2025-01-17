import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Utensils } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signinSchema } from "@/schemas/auth";
import { useAuth } from "@/stores/auth";
import { api } from "@/lib/api";

export const LoginPage = () => {
  const setUser = useAuth((state) => state.setUser);
  const setToken = useAuth((state) => state.setToken);

  const [isPending, setPending] = useState(false);

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    setPending(true);
    try {
      const response = await api.post("/signin", values);
      localStorage.setItem("token", response.data.token as string);
      setUser(response.data.user);
      setToken(response.data.token);
    } catch (error) {
      setPending(false);
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[75%] md:w-[50%]">
        <header className="flex justify-between mx-3 items-center mb-8">
          <div className="flex items-baseline space-x-2 mb-5">
            <h1 className="text-4xl font-bold text-dish-dash-700">Dish Dash</h1>
            <Utensils className=" text-dish-dash-700" size={29} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Log in</h2>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
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
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex sm:flex-row sm:items-end sm:justify-between">
              <div className="flex justify-center space-x-1 mt-5 sm:mt-0 ">
                <span>Don't have an account yet?</span>
                <Link
                  className="text-dish-dash-800 hover:underline"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
              <div className="flex justify-end space-x-3 items-center mt-1">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 font-bold"
                >
                  Sign in
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
