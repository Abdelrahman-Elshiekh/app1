'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { METHODS } from "http";
import { json } from "zod";

export async function addtocart(productId:string) {
const token=await getAccessToken()

if(!token){
    throw new Error("unauthorized....")
}

  const response =await fetch(`${process.env.API}/cart `, {
    cache:'no-store',
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
console.log(payload);
return payload

}