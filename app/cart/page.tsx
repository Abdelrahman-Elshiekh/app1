'use client'
import cartimage from '../../assets/images/cart.webp'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartInterface } from '../types/cart-interface'
import { deletecartitem } from '../services/cart/delete-cart'
import toast from 'react-hot-toast'
import { updatecartitem } from '../services/cart/update-cart'
import { Button } from '@/components/ui/button'
import { Space_Mono } from 'next/font/google'
import { clearcart } from '../services/cart/clear-cart'
import { Divide } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const Quaryclient = useQueryClient();
  const {data:cartdata,isLoading,isError} = useQuery<CartInterface>({
    queryKey:['get-cart'],
    queryFn:async()=>{
      const resp=await fetch('/api/cart')
      const payload =await resp.json()
      return payload
    }
  })




const {
  mutate: delcartitem ,isPending} = useMutation({
  mutationFn: deletecartitem,
  onSuccess:()=>{
    toast.success("item deleted ")
    Quaryclient.invalidateQueries({ queryKey: ["get-cart"] });
  },
  onError:()=>{
    toast.success("error  ");
  }
});


// update
const { mutate: updatecart, isPending:updateloading } = useMutation({
  mutationFn: updatecartitem,
  onSuccess: () => {
    toast.success("item updated ");
    Quaryclient.invalidateQueries({ queryKey: ["get-cart"] });
  },
  onError: () => {
    toast.success("error  ");
  },
});


// clear
const { mutate: removecart, data } = useMutation({
  mutationFn: clearcart,
  onSuccess: () => {
    toast.success("cart cleared ");
    Quaryclient.invalidateQueries({ queryKey: ["get-cart"] });
  },
  onError: () => {
    toast.error("error");
  },
});

if (isLoading) {
  return <h2>loading .....</h2>;
}
if (isError) {
  return <h2>error .....</h2>;
}
if (!cartdata) return null;

function handleupdate(productId:string,count:number){
  updatecart({productId,count})

}
  
  return (
    <>
      {cartdata?.numOfCartItems > 0 ? (
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Left: Cart Table */}
          <div className="w-full md:w-3/4">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-4 py-2 md:px-16 md:py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 md:px-6 md:py-3 font-medium"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 md:px-6 md:py-3 font-medium"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 md:px-6 md:py-3 font-medium"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-2 md:px-6 md:py-3 font-medium"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cartdata?.data.products.map((prod) => (
                    <tr
                      key={prod._id}
                      className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                    >
                      <td className="p-2 md:p-4 flex justify-center">
                        <img
                          src={prod.product.imageCover}
                          className="w-16 md:w-24 max-w-full max-h-full"
                          alt={prod.product.title}
                        />
                      </td>
                      <td className="px-2 py-1 md:px-6 md:py-4 font-semibold text-heading">
                        {prod.product.title}
                      </td>
                      <td className="px-2 py-1 md:px-6 md:py-4">
                        <form className="max-w-xs mx-auto">
                          <div className="relative flex items-center justify-center md:justify-start">
                            <button
                              onClick={() =>
                                handleupdate(prod.product._id, prod.count - 1)
                              }
                              type="button"
                              className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full h-6 w-6"
                            >
                              <svg
                                className="w-3 h-3 text-heading"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h14"
                                />
                              </svg>
                            </button>
                            <span className="mx-2 shrink-0 text-heading text-center w-6">
                              {prod.count}
                            </span>
                            <button
                              onClick={() =>
                                handleupdate(prod.product._id, prod.count + 1)
                              }
                              type="button"
                              className="flex items-center justify-center text-body bg-neutral-secondary-medium border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading rounded-full h-6 w-6"
                            >
                              <svg
                                className="w-3 h-3 text-heading"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 12h14m-7 7V5"
                                />
                              </svg>
                            </button>
                          </div>
                        </form>
                      </td>
                      <td className="px-2 py-1 md:px-6 md:py-4 font-semibold text-heading">
                        {prod.price} EGP
                      </td>
                      <td className="px-2 py-1 md:px-6 md:py-4">
                        <span
                          onClick={() => delcartitem(prod.product._id)}
                          className="font-medium text-fg-danger cursor-pointer"
                        >
                          Remove
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Button
                className="w-full bg-green-600 my-4 text-2xl"
                onClick={() => removecart()}
              >
                Clear
              </Button>
            </div>
          </div>

          {/* Right: Summary */}
          <div className="w-full md:w-1/4">
            <div className="p-5 m-3 border-2 rounded-2xl">
              <h2 className="text-2xl text-center mb-2">
                Number Of Cart Items{" "}
                <span className="text-green-500">
                  {cartdata?.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-2xl text-center mb-4">
                Total Price{" "}
                <span className="text-green-500">
                  {cartdata?.data.totalCartPrice} EGP
                </span>
              </h2>
              <Button className="text-2xl w-full my-2 bg-emerald-700">
                <Link href={`/checkout/${cartdata?.cartId}`}>Check Out</Link>
              </Button>
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
