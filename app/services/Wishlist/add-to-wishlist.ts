'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { METHODS } from "http";
import { json } from "zod";

export async function addtowishlist(productId:string) {
const token=await getAccessToken()

if(!token){
    throw new Error("unauthorized....")
}

  const response = await fetch(`${process.env.API}/wishlist `, {
    cache: "no-store",
    method: "POST",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      productId,
    }),
  });
const payload=await response?.json()
return payload
}