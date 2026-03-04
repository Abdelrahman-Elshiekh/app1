"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import toast from "react-hot-toast";

const forgotPasswordSchema = zod.object({
  email:zod
      .string()
      .nonempty("Email is required")
      .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
});

export default function forgotpassword() {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function submitForm(values: zod.infer<typeof forgotPasswordSchema>) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: values.email }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Password reset email sent!");
        window.location.href="/verifycode"
      } else {
        toast.error(data.message || "Failed to send reset email");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-400 w-1/2 p-5 border-2 rounded-2xl m-auto mt-9">
      <h1 className="text-3xl mb-5 text-red-500">Forgot Password</h1>
      <form onSubmit={form.handleSubmit(submitForm)}>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input 
              className="bg-white"
                {...field}
                placeholder="Enter your email"
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-emerald-900"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>
      </form>
    </div>
  );
}
