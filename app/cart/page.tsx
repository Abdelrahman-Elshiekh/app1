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
    toast.success("error  ");
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
        <div className="flex ">
          <div className="w-3/4">
            <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
              <table className="w-full text-sm text-left rtl:text-right text-body">
                <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-default-medium">
                  <tr>
                    <th scope="col" className="px-16 py-3">
                      <span className="sr-only">Image</span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Product
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
                  {cartdata?.data.products.map((prod) => {
                    return (
                      <tr
                        key={prod._id}
                        className="bg-neutral-primary-soft border-b border-default hover:bg-neutral-secondary-medium"
                      >
                        <td className="p-4">
                          <img
                            src={prod.product.imageCover}
                            className="w-16 md:w-24 max-w-full max-h-full"
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.product.title}
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
                              <button
                                onClick={() => {
                                  handleupdate(
                                    prod.product._id,
                                    prod.count - 1,
                                  );
                                }}
                                type="button"
                                id="decrement-button-1"
                                data-input-counter-decrement="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h14"
                                  />
                                </svg>
                              </button>
                              <span
                                id="counter-input-1"
                                data-input-counter
                                className="mx-3 shrink-0 text-heading border-0 bg-transparent text-sm font-normal focus:outline-none focus:ring-0 max-w-[2.5rem] text-center"
                              >
                                {prod.count}
                              </span>

                              <button
                                onClick={() => {
                                  handleupdate(
                                    prod.product._id,
                                    prod.count + 1,
                                  );
                                }}
                                type="button"
                                id="increment-button-1"
                                data-input-counter-increment="counter-input-1"
                                className="flex items-center justify-center text-body bg-neutral-secondary-medium box-border border border-default-medium hover:bg-neutral-tertiary-medium hover:text-heading focus:ring-4 focus:ring-neutral-tertiary rounded-full text-sm focus:outline-none h-6 w-6"
                              >
                                <svg
                                  className="w-3 h-3 text-heading"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 12h14m-7 7V5"
                                  />
                                </svg>
                              </button>
                            </div>
                          </form>
                        </td>
                        <td className="px-6 py-4 font-semibold text-heading">
                          {prod.price} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => {
                              delcartitem(prod.product._id);
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
              <Button
                className="w-full bg-green-600 my-4 text-2xl "
                onClick={() => {
                  removecart();
                }}
              >
                Clear
              </Button>
            </div>
          </div>
          <div className="w-1/4 ">
            <div className="p-5 m-3 border-2 rounded-2xl ">
              <h2 className="text-2xl">
                Number Of Cart Items{" "}
                <span className="text-green-500 ">
                  {" "}
                  {cartdata?.numOfCartItems}
                </span>
              </h2>
              <h2 className="text-2xl  ">
                Total Price{" "}
                <span className="text-green-500 ">
                  {cartdata?.data.totalCartPrice} EGP
                </span>
              </h2>
              <Button className="text-2xl my-4 bg-emerald-700">
                <Link href={`/checkout/${cartdata?.cartId}`}> Check Out</Link>
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
