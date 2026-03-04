'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { METHODS } from "http";
import { json } from "zod";

export async function deletewishlistitem(productId:string) {
const token=await getAccessToken()

if(!token){
    throw new Error("unauthorized....")
}

  const response = await fetch(`${process.env.API}/wishlist/${productId} `, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
const payload=await response?.json()

return payload

}