"use client"

import CardWrapper from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormControl, FormLabel, FormItem, FormMessage } from "@/components/ui/form"
import * as z from "zod"
import { RegisterSchema } from "@/schemas"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";


export default function RegisterForm() {
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    }
  })

  const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      register(data)
        .then((res) => {
          // Handle potential errors or success from the server
          if (res.error) {
            setError(res.error);
            setSuccess("");
          } else {
            setSuccess(res.success);
            setError("");
          }
        })
        .catch((err) => {
          // Catch any unexpected errors
          setError("An unexpected error occurred. Please try again.");
        });
    });
  };


  return (
    <CardWrapper headerLabel="Create An Account" backButtonLabel="Already Have An Account?" backButtonHref="/auth/login"
      showSocial >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}  method="POST" className="space-y-6">
          <div className="space-y-4">

            <FormField control={form.control} name="name" render={({ field }) => (<FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="John Doe" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />

            <FormField control={form.control} name="email" render={({ field }) => (<FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="john.doe@example.com" type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />



            <FormField control={form.control} name="password" render={({ field }) => (<FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} placeholder="******" type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>)} />

          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">Create An Account</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
