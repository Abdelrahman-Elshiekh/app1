"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { loginSchema } from "../Auth/LoginSchema";
import { Button } from "@/components/ui/button";
import * as zod from "zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "next/navigation";

export default function Login() {
   const searchparams= useSearchParams()
   const callbackurl = searchparams.get("callback-url");
   
   
  const [islaoding, setislaoding] = useState(false)
  const Form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

 async function submitform(values: zod.infer<typeof loginSchema>) {
    setislaoding(true)
   const respones = await signIn("credentials", {
     email: values.email,
     password: values.password,
     redirect: false,
     callbackUrl: callbackurl??"/"
   });
    console.log(respones);
    if(respones?.ok){
toast.success("successfull Login");
      window.location.href=respones.url || "/"
      

    }else{
      toast.error("invalid email or password");
      
    }
    setislaoding(false)
  }

  return (
    <>
      <div className="bg-gray-400 w-1/2 p-5 border-2 rounded-2xl m-auto mt-9">
        <h1 className="text-5xl my-9 text-red-500">Login Now</h1>

        <form onSubmit={Form.handleSubmit(submitform)}>
          <Controller
            name="email"
            control={Form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  type="email"
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your Email"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={Form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  type="password"
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button disabled={islaoding} className="w-full bg-emerald-900 my-4">
            {islaoding ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 animate-spin"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
