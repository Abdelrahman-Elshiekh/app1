'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";


export async function addtocart(productId:string) {
const  token = await getAccessToken();


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

return payload

}