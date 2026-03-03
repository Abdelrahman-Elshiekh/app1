'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import imglogo from "../../../assets/images/ChatGPT Image Jan 31, 2026, 01_39_02 AM.png";
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';
import { DropdownMenuBasic } from '../dropdown/Dropdown';
import { useQuery } from '@tanstack/react-query';
import { CartInterface } from '@/app/types/cart-interface';

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
    { href: "/products", content: "Products" },
    { href: "/brands", content: "Brands" },
  ];


  const Authpath = [
    { href: "/login", content: "Login" },
    { href: "/register", content: "Register" },
    
  ];

  return (
    <>
      <nav className="bg-gray-300 py-3">
        <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap gap-16 items-center justify-between mx-auto p-4">
          <a
            href="https://flowbite.com/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image alt="logo" width={50} height={30} src={imglogo} />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Fresh cart
            </span>
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
            <div
              className=" w-full md:flex justify-between  "
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col  px-4 md:p-0   rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
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
              <ul className="font-medium flex flex-col  p-4 md:p-0  rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {Authpath.map((elem) => {
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
              <ul className="font-medium flex flex-col  justify-center items-center p-4 md:p-0  border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                {status === "authenticated" ? (
                  <>
                    <li>Hi,{session?.user?.name}</li>
                    <li className="relative">
                      { cartdata &&cartdata?.numOfCartItems>0?<span className="bg-green-400 start-3 -top-[30px] absolute p-1 px-2 text-xl text-white rounded-full">
                       {cartdata?.numOfCartItems}
                      </span>:""}
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

                    {/* <li onClick={Logout} className="cursor-pointer">
                      logout
                    </li> */}
                    <DropdownMenuBasic Logout={Logout} />
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
