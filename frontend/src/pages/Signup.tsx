import { z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link } from "react-router";
import { signupSchema } from "../schemas/auth";

const SignupPage = () => {
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
    const response = await axios.post("http://localhost:4000/signup", values);

    console.log(response);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Email"
                  className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Name"
                  className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
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
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lastname"
                  className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
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
                  className="bg-magic-550 border-magic-400 focus-visible:ring-offset-0 focus-visible:ring-magic-550"
                  {...field}
                />
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-3 items-center">
          <Button type="submit">Sign up</Button>
        </div>
        <div className="text-sm flex justify-center space-x-1">
          <span>Already have an account?</span>
          <Link to="/signin" className="text-magic-600 hover:underline">
            {" "}
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default SignupPage;
