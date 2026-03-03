'use server'
import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { shipping } from "@/app/types/cart-interface";


export async function payonlineorder(cartId: string, shippingAddress: shipping) {
  const token = await getAccessToken();

  if (!token) {
    throw new Error("unauthorized....");
  }
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;


  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
    {
      method: "POST",
      headers: {
        token: token,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );
  const payload = await response?.json();
  return payload;
}