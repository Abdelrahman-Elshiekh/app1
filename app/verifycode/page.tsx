"use client";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import toast from "react-hot-toast";
import * as z from "zod";

const verifyResetSchema = z.object({
  code: z.string().min(4, "Reset code must be at least 4 characters"),
});

export default function VerifyResetCode() {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: { code: "" },
    resolver: zodResolver(verifyResetSchema),
    mode:'onBlur'
  });

  async function submitForm(values: z.infer<typeof verifyResetSchema>) {
    setLoading(true);
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resetCode: values.code }),
        },
      );

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message || "Code verified successfully!");
        
        window.location.href = `/reset-password`;
      } else {
        toast.error(data.message || "Invalid reset code");
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
      <h1 className="text-3xl mb-5 text-red-500">Verify Reset Code</h1>
      <form onSubmit={form.handleSubmit(submitForm)}>
        
        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Reset Code</FieldLabel>
              <Input className="bg-white" {...field} placeholder="Enter your reset code" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-emerald-900"
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>
    </div>
  );
}
