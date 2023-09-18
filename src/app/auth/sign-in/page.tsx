"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInUser, signUpUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function SignInPage() {
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => router.push("/"),
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    console.log(values);
    mutate(values);
  }

  return (
    <div className="min-h-screen border  flex justify-center items-center">
      <Form {...signInForm}>
        <form
          onSubmit={signInForm.handleSubmit(onSubmit)}
          className="space-y-8 border border-black w-1/2 p-4 rounded-md"
        >
          <FormField
            control={signInForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signInForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign In</Button>
        </form>
      </Form>
    </div>
  );
}

export default SignInPage;
