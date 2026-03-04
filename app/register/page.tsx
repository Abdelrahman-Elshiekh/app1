'use client'
import * as zod from "zod";
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { log } from 'console';
import { register } from 'module';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from '../Auth/registerSchema';
import toast from "react-hot-toast";

export default function Register() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
    mode:'onBlur'
  });

 async function submitform(values: zod.infer<typeof registerSchema>) {
   try {
     const response = await fetch(
       "https://ecommerce.routemisr.com/api/v1/auth/signup",
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify(values),
       },
     );

     const data = await response.json();

     if (!response.ok) {
       toast.error(data.message); 
       return;
     }
         toast.success("Account created successfully");

         setTimeout(() => {
           window.location.href = "/login";
         }, 1500);

     
    
   } catch (error) {
     toast.error("Something went wrong");
   }
 }





  return (
    <>
      <div className="w-full max-w-3/4 mx-auto p-4 md:p-6 lg:p-8 mt-9 bg-gray-300 rounded-2xl">
        <h1 className="text-3xl md:text-5xl text-green-800 text-center mb-6 md:mb-9">
          Register Now
        </h1>

        <form
          onSubmit={form.handleSubmit(submitform)}
          className="flex flex-col gap-4"
        >
          {/* Name */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg md:text-xl">
                  Name
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Name"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg md:text-xl">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Email"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg md:text-xl">
                  Password
                </FieldLabel>
                <Input
                  type="password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Password"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* RePassword */}
          <Controller
            name="rePassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg md:text-xl">
                  Confirm Password
                </FieldLabel>
                <Input
                  type="password"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Re-enter Your Password"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Phone */}
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-lg md:text-xl">
                  Phone
                </FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter Your Phone Number"
                  className="bg-white"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button
            type="submit"
            className="w-full py-4 md:py-5 text-xl md:text-2xl bg-amber-600 mt-4"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
