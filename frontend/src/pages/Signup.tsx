import { z } from "zod";
import { Utensils } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";

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
import { signupSchema } from "@/schemas/auth";
import { useAuth } from "@/stores/auth";

const SignupPage = () => {
  const [isPending, setPending] = useState(false);

  const setUser = useAuth((state) => state.setUser);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    setPending(true);
    const response = await axios.post("http://localhost:4000/signup", values);
    localStorage.setItem("token", response.data.token as string);
    setUser(response.data.user);
    setPending(false);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[90%] sm:w-[75%] md:w-[50%]">
        <header className="flex justify-between mx-3 items-center mb-8">
          <div className="flex items-baseline space-x-2 mb-5">
            <h1 className="text-4xl font-bold text-dish-dash-700">Dish Dash</h1>
            <Utensils className=" text-dish-dash-700" size={29} />
          </div>
          <h2 className="text-2xl font-bold mb-3">Sign up</h2>
        </header>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="flex justify-between space-x-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Name"
                        className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Lastname"
                        className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      className="border-dish-dash-800/50 focus-visible:ring-offset-0 focus-visible:ring-dish-dash-800/50 rounded-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription></FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col-reverse sm:flex sm:flex-row sm:items-end sm:justify-between">
              <div className="flex justify-center space-x-1 mt-5 sm:mt-0 ">
                <span>Already have an account?</span>
                <Link
                  className="text-dish-dash-800 hover:underline"
                  to="/login"
                >
                  Sign in
                </Link>
              </div>
              <div className="flex justify-end space-x-3 items-center mt-1">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="w-full sm:w-auto bg-dish-dash-950 hover:bg-dish-dash-900 font-bold"
                >
                  Sign Up
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignupPage;
