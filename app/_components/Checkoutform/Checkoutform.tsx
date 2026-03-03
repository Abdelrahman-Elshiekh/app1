"use client";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast";
import { shipping } from "@/app/types/cart-interface";
import { paycashorder } from "@/app/services/cart/pay-cash";
import { payonlineorder } from "@/app/services/cart/pay-online";

export default function Checkoutform({ cartId }: { cartId :string}) {

    const [isonline, setisonline] = useState(false)

  async function paycash(cartId: string, shippingAddress: shipping) {
    const response = await paycashorder(cartId, shippingAddress);
    console.log(response);
    if(response.status=="success"){
        toast.success('order will be delivered soon')
        window.location.href='/'
    }else{
        toast.error('error')
    }
    
  }


  async function payonline(cartId: string, shippingAddress: shipping) {
    const response = await payonlineorder(cartId, shippingAddress);
    console.log(response);
    if (response.status == "success") {
      window.location.href = response.session.url;
    } else {
      toast.error("error");
    }
  }

  const [islaoding, setislaoding] = useState(false);
  const Form = useForm({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
  });

  async function submitform(values: shipping) {
    setislaoding(true);
    const shippingAddress={
        ...values
    }
    if(isonline){
         payonline(cartId, shippingAddress);
    }else{
        paycash(cartId, shippingAddress);
    }

     setislaoding(false);
  }

  return (
    <>
      <div className="bg-gray-400 w-1/2 p-5 border-2 rounded-2xl m-auto mt-9">
        <h1 className="text-5xl my-9 text-red-500">shipping Now</h1>

        <form onSubmit={Form.handleSubmit(submitform)}>
          <Controller
            name="details"
            control={Form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Details</FieldLabel>
                <Input
                  type="text"
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your details"
                  autoComplete="off"
                />
              </Field>
            )}
          />

          <Controller
            name="phone"
            control={Form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>phone</FieldLabel>
                <Input
                  type="text"
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
              </Field>
            )}
          />
          <Controller
            name="city"
            control={Form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>city</FieldLabel>
                <Input
                  type="text"
                  className="bg-white"
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="Enter your password"
                  autoComplete="off"
                />
              </Field>
            )}
          />

          <Button
            onClick={() => {
              setisonline(false);
            }}
            disabled={islaoding}
            className="w-full bg-emerald-900 my-4"
          >
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
              "pay cash"
            )}
          </Button>

          <Button
            onClick={() => {
              setisonline(true);
            }}
            disabled={islaoding}
            className="w-full bg-emerald-900 my-4"
          >
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
              "pay online"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
