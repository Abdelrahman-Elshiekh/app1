"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import toast from "react-hot-toast";
import * as z from "zod";


const resetPasswordSchema = z.object({
  email:z
       .string()
       .nonempty("Email is required")
       .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
  newPassword: z
    .string()
    .nonempty("Password is required")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Invalid password. Must include uppercase, lowercase, number & special char, min 8 chars",
    ),
});

export default function ResetPassword({
  prefilledEmail,
}: {
  prefilledEmail?: string;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: { email: prefilledEmail || "", newPassword: "" },
    resolver: zodResolver(resetPasswordSchema),
  });

  async function submitForm(values: z.infer<typeof resetPasswordSchema>) {
    setLoading(true);
    try {
   const res = await fetch("/api/passr", {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       email: values.email,
       newPassword: values.newPassword,
     }),
   });
   const data = await res.json();

     

      if (res.ok) {
        toast.success(data.message || "Password reset successful");
        window.location.href = "/login"; 
      } else {
        toast.error(data.message || "Password reset failed");
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
      <h1 className="text-3xl mb-5 text-red-500">Reset Password</h1>
      <form onSubmit={form.handleSubmit(submitForm)}>
        {/* Email field */}
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Email</FieldLabel>
              <Input {...field} placeholder="Enter your email" type="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* New Password field */}
        <Controller
          name="newPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="mt-4">
              <FieldLabel>New Password</FieldLabel>
              <Input
                {...field}
                placeholder="Enter new password"
                type="password"
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
          {loading ? "Resetting..." : "Reset Password"}
        </Button>
      </form>
    </div>
  );
}
