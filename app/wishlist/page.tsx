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
      {wishlistdata?.count > 0 ? (
        <div className="flex ">
          <div className="w-full">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      description
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Qty
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistdata?.data.map((prod) => {
                    return (
                      <tr
                        key={prod._id}
                        className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                      >
                        <td className="p-4">
                          <img
                            src={prod.imageCover}
                            className="w-16 md:w-24 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.title}
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading ">
                          {prod.description}
                        </td>
                        <td className="px-6 py-4">
                          <form className="max-w-xs mx-auto">
                            <label
                              htmlFor="counter-input-1"
                              className="sr-only"
                            >
                              Choose quantity:
                            </label>
                            <div className="relative flex items-center">
                              <span
                                id="counter-input-1"
                                data-input-counter
                                className="mx-3 shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                              >
                                {prod.quantity}
                              </span>
                            </div>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.price} EGP
                        </td>

                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              delwishlistitem(prod._id);
                            }}
                            className="font-medium text-fg-danger cursor-pointer"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center ">
          <Image src={cartimage} width={500} height={500} alt="cart" />
        </div>
      )}
    </>
  );
}
