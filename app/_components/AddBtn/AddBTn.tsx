'use client'
import { addtocart } from '@/app/services/cart/add-to-cart';
import { deletecartitem } from '@/app/services/cart/delete-cart';
import { addtowishlist } from '@/app/services/Wishlist/add-to-wishlist';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import toast from 'react-hot-toast';

export default function AddBTn({ productId }: { productId :string}) {
    const Quaryclient= useQueryClient()

    const {data,isPending,error,mutate:addproducttocart} = useMutation({
      mutationFn: addtocart,
      onSuccess:(data)=>{
        toast.success(data?.message)
        Quaryclient.invalidateQueries({queryKey:['get-cart']})
      },
      onError:(data)=>{
        toast.error('login first')
      }
    });
   

  const { data: wishlist, mutate: addproducttowishlist } = useMutation({
    mutationFn: addtowishlist,
    onSuccess: (data) => {
      toast.success(data?.message);
      Quaryclient.invalidateQueries({ queryKey: ["get-wishlist"] });
    },
    onError: (data) => {
      toast.error("login first");
    },
  });
   
    
  return (
    <>
      <CardFooter className="flex justify-between">
        <div className='flex flex-col space-y-5 '>
          <Button 
            onClick={() => {
              addproducttocart(productId);
            }}
            className="bg-emerald-600 w-full"
          >
            add to cart
          </Button>
          <Button
            onClick={() => {
              addproducttowishlist(productId);
            }}
            className="bg-emerald-600 w-full"
          >
            add to wishlist
          </Button>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </CardFooter>
    </>
  );
}
