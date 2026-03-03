'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { METHODS } from "http";
import { json } from "zod";

export async function updatecartitem({
  productId,
  count,
}: {
  productId: string;
  count:number}) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("unauthorized....");
  }

  const response = await fetch(`${process.env.API}/cart/${productId} `, {
    method: "PUT",
    headers: {
      token: token,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      count: count,
    }),
  });
  const payload = await response?.json();

  return payload;
}