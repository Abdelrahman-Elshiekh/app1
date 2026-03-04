'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import imglogo from "../../../assets/images/freshcart-logo.svg";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import {  DropdownMenuIcons } from '../dropdown/Dropdown';
import { useQuery } from '@tanstack/react-query';
import { CartInterface } from '@/app/types/cart-interface';
import { wishlistinterface } from '@/app/types/wishlist-interface';

export default function Navbar() {

  const {
    data: cartdata,
    isLoading,
    isError,
  } = useQuery<CartInterface>({
    queryKey: ["get-cart"],
    queryFn: async () => {
      const resp = await fetch("/api/cart");
      const payload = await resp.json();
      return payload;
    },
  });
    const {
      data: wishlistdata,
     
    } = useQuery<wishlistinterface>({
      queryKey: ["get-wishlist"],
      queryFn: async () => {
        const resp = await fetch("/api/wishlist");
        const payload = await resp.json();
        return payload;
      },
    });


   const {data:session,status}= useSession()
 

  function Logout(){
     signOut({
      callbackUrl:"/login"
     })

  }
  
   const [open, setopen] = useState(false)
   const active=usePathname()


  const path = [
    { href: "/", content: "Home" },
    { href: "/categories", content: "categories" },
    { href: "/brands", content: "Brands" },
  ];


  const Authpath = [
    { href: "/login", content: "Login" },
    { href: "/register", content: "Register" },
    
  ];

  return (
    <>
      <nav className="bg-gray-300 py-3">
        <div className="max-w-screen-xl flex  flex-wrap md:flex-nowrap gap-16 items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image alt="logo" width={300} height={300} src={imglogo} />
          </a>
          <button
            onClick={() => {
              setopen(!open);
            }}
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          {open ? (
            <div className=" w-full md:flex   " id="navbar-default">
              <ul className="font-medium flex flex-col  px-4 md:p-0 justify-center text-2xl items-center   rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {path.map((elem) => {
                  return (
                    <li key={elem.content}>
                      <Link
                        href={elem.href}
                        className={
                          active === elem.href
                            ? "active block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                            : "block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                        }
                        aria-current="page"
                      >
                        {elem.content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="font-medium flex flex-col space-y-8 justify-center text-2xl items-center  p-4 md:p-0 rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 md:bg-neutral-primary">
                {status === "authenticated" ? (
                  <>
                    <li className=" font-semibold">
                      Hi, {session?.user?.name}
                    </li>

                    <li className="flex space-x-3">
                      <li className="relative">
                        {cartdata && cartdata?.numOfCartItems > 0 ? (
                          <span className="bg-green-400 start-3 -top-[30px] absolute p-1 px-2 text-xl text-white rounded-full">
                            {cartdata?.numOfCartItems}
                          </span>
                        ) : (
                          ""
                        )}
                        <Link href={"/cart"}>
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
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                            />
                          </svg>
                        </Link>
                      </li>
                      <li className="relative">
                        {wishlistdata && wishlistdata?.count > 0 ? (
                          <span className="bg-green-400 start-3 -top-[30px] absolute p-1 px-2 text-xl text-white rounded-full">
                            {wishlistdata?.count}
                          </span>
                        ) : (
                          ""
                        )}
                        <Link href={"/wishlist"}>
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
                              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                            />
                          </svg>
                        </Link>
                      </li>
                    </li>

                    <li className="flex ">
                      <DropdownMenuIcons Logout={Logout} />
                    </li>
                  </>
                ) : (
                  Authpath.map((elem) => (
                    <li key={elem.content}>
                      <Link
                        href={elem.href}
                        className="block py-2 px-3 rounded"
                      >
                        {elem.content}
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          ) : (
            <div
              className="hidden w-full md:flex justify-between  "
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col  p-4 md:p-0  border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {path.map((elem) => {
                  return (
                    <li key={elem.content}>
                      <Link
                        href={elem.href}
                        className={
                          active === elem.href
                            ? "active block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                            : "block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                        }
                        aria-current="page"
                      >
                        {elem.content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <ul className="font-medium flex flex-col justify-center items-center p-4 md:p-0  border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {status === "authenticated" ? (
                  <>
                    <li>Hi,{session?.user?.name}</li>
                    <li className="relative">
                      {cartdata && cartdata?.numOfCartItems > 0 ? (
                        <span className="bg-green-400 start-3 -top-[30px] absolute p-1 px-2 text-xl text-white rounded-full">
                          {cartdata?.numOfCartItems}
                        </span>
                      ) : (
                        ""
                      )}
                      <Link href={"/cart"}>
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
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                          />
                        </svg>
                      </Link>
                    </li>
                    <li className="relative">
                      {wishlistdata && wishlistdata?.count > 0 ? (
                        <span className="bg-green-400 start-3 -top-[30px] absolute p-1 px-2 text-xl text-white rounded-full">
                          {wishlistdata?.count}
                        </span>
                      ) : (
                        ""
                      )}
                      <Link href={"/wishlist"}>
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
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                          />
                        </svg>
                      </Link>
                    </li>

                    <DropdownMenuIcons Logout={Logout} />
                  </>
                ) : (
                  Authpath.map((elem) => {
                    return (
                      <li key={elem.content}>
                        <Link
                          href={elem.href}
                          className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0"
                          aria-current="page"
                        >
                          {elem.content}
                        </Link>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
