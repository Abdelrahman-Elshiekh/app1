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
      <div className="w-1/2 mx-auto p-5 mt-9 bg-gray-300 rounded-2xl">
        <h1 className="text-green-800 text-5xl">Register Now </h1>
        <form onSubmit={form.handleSubmit(submitform)}>
          <div className="mt-9  ">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="  text-xl" htmlFor={field.name}>
                    Name :{" "}
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-9  ">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="  text-xl" htmlFor={field.name}>
                    Email :{" "}
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Email "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-9  ">
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="  text-xl" htmlFor={field.name}>
                    Password :{" "}
                  </FieldLabel>
                  <Input
                    type="password"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Password "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-9  ">
            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="  text-xl" htmlFor={field.name}>
                    RePassword :{" "}
                  </FieldLabel>
                  <Input
                    type="password"
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your RePassword "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="mt-9  ">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="  text-xl" htmlFor={field.name}>
                    phone :{" "}
                  </FieldLabel>
                  <Input
                    className="bg-white"
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your phone "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <Button
            className="my-5 w-full p-7 text-3xl bg-amber-600 "
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
