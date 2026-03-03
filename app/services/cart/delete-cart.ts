'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { METHODS } from "http";
import { json } from "zod";

export async function deletecartitem(productId:string) {
const token=await getAccessToken()

if(!token){
    throw new Error("unauthorized....")
}

  const response = await fetch(`${process.env.API}/cart/${productId} `, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
const payload=await response?.json()

return payload

}