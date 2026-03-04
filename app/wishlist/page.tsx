"use client";
import cartimage from "../../assets/images/cart.webp";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import Image from "next/image";

import { wishlistinterface } from "../types/wishlist-interface";
import { deletewishlistitem } from "../services/Wishlist/remove-wishlist";

export default function Wishlist() {
  const Quaryclient = useQueryClient();
  const {
    data: wishlistdata,
    isLoading,
    isError,
  } = useQuery<wishlistinterface>({
    queryKey: ["get-wishlist"],
    queryFn: async () => {
      const resp = await fetch("/api/wishlist");
      const payload = await resp.json();
      return payload;
    },
  });
  
 const { mutate: delwishlistitem, isPending } = useMutation({
   mutationFn: deletewishlistitem,
   onSuccess: () => {
     toast.success("item deleted ");
     Quaryclient.invalidateQueries({ queryKey: ["get-wishlist"] });
   },
   onError: () => {
     toast.success("error  ");
   },
 });

  if (isLoading) {
    return <h2>loading .....</h2>;
  }
  if (isError) {
    return <h2>error .....</h2>;
  }
  if (!wishlistdata) return null;


  return (
    <>
      <div className="flex flex-col gap-4 py-8 min-h-[400px]">
  {wishlistdata?.data.map((prod) => (
    <div
      key={prod._id}
      className="bg-neutral-primary-soft border border-default rounded-xl p-4 md:flex md:items-center md:justify-between hover:bg-neutral-secondary-medium"
    >
      {/* Image */}
      <div className="flex justify-center md:justify-start mb-3 md:mb-0 md:w-1/6">
        <img
          src={prod.imageCover}
          className="w-24 h-24 md:w-24 md:h-24 object-cover rounded-lg"
          alt={prod.title}
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col md:flex-row md:justify-between md:items-center gap-3 md:gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <span className="font-semibold text-lg md:text-heading">{prod.title}</span>
          <span className="text-sm text-gray-600 md:text-body">{prod.description}</span>
        </div>

        {/* Quantity and Price */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mt-2 md:mt-0">
          <span className="text-sm md:text-body font-medium">Qty: {prod.quantity}</span>
          <span className="text-sm md:text-body font-semibold">{prod.price} EGP</span>
        </div>

        {/* Action */}
        <div className="mt-2 md:mt-0">
          <button
            onClick={() => delwishlistitem(prod._id)}
            className="text-red-600 font-medium hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  ))}

  {/* Empty Wishlist */}
  {wishlistdata?.count === 0 && (
    <div className="w-full flex justify-center items-center py-10">
      <Image src={cartimage} width={300} height={300} alt="Empty Wishlist" />
    </div>
  )}
</div>
    </>
  );
}
