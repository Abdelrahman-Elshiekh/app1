'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";


export async function clearcart() {
const token=await getAccessToken()

if(!token){
    throw new Error("unauthorized....")
}

  const response = await fetch(`${process.env.API}/cart`, {
    method: "DELETE",
    headers: {
      token: token,
      "content-type": "application/json",
    },
  });
const payload=await response?.json()

return payload

}