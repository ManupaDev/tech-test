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
import { signUpUser } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { cn } from "@/lib/utils";

const signUpFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

function SignUpPage() {
  const { toast } = useToast();

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();
  const { mutate, isLoading } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => router.push("/auth/sign-in"),
    onError: () => {
      toast({
        variant: "destructive",
        title: "Could not Sign Up",
      });
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    mutate(values);
  }

  return (
    <div className="min-h-screen border  flex justify-center items-center">
      <Form {...signUpForm}>
        <form
          onSubmit={signUpForm.handleSubmit(onSubmit)}
          className="space-y-8 border border-black w-1/2 p-4 rounded-md"
        >
          <FormField
            control={signUpForm.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
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
            control={signUpForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signUpForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className={cn({ "cursor-wait": isLoading })}>
            {!isLoading ? "Sign Up" : "Signing Up..."}
          </Button>
          <p>Already have an account ?</p>
          <Link href={"/auth/sign-in"} className="underline">
            Sign In
          </Link>
        </form>
      </Form>
    </div>
  );
}

export default SignUpPage;
