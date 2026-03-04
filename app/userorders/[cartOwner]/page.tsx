import { getAccessToken } from "@/app/Auth/getaccesstoken";
import { Order } from "@/app/types/orderinterface";
import { Award } from "lucide-react";
import Image from "next/image";
import React from "react";
interface Myprops {
  params: {
    cartOwner: string;
  };
}


export default async function userorders(props: Myprops) {
  const { cartOwner } = await props.params;
  console.log("Cart Owner ID:", cartOwner);
  const token = await getAccessToken();

  if (!token) {
    throw new Error("Token not found");
  }
  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`,
    {
      method: "GET",
      headers: {
        token: token,
      },
      cache: "no-store",
    },
  );
  const paylaod: Order[] = await response.json();
  console.log("the payload of orders", paylaod);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Orders</h1>

      <div className="space-y-8 max-w-5xl mx-auto">
        {paylaod.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md p-6 border"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-500 text-lg">Order ID: {order.id}</p>
                <p className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  order.isDelivered
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {order.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>

            {/* Payment & Status */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethodType}
              </p>
              <p>
                <span className="font-semibold">Paid:</span>{" "}
                <span
                  className={order.isPaid ? "text-green-600" : "text-red-500"}
                >
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </p>
              <p>
                <span className="font-semibold">Total:</span>{" "}
                <span className="text-emerald-600 font-bold">
                  {order.totalOrderPrice} EGP
                </span>
              </p>
              <p>
                <span className="font-semibold">Shipping:</span>{" "}
                {order.shippingPrice} EGP
              </p>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <p>{order.shippingAddress.details}</p>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>

            {/* Products */}
            <div>
              <h3 className="font-semibold mb-3 text-2xl text-center">
                Products
              </h3>
              <div className="space-y-4">
                {order.cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b pb-4"
                  >
                    <Image
                      src={item.product.imageCover}
                      alt={item.product.title}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.title}</h4>
                      <p className="text-sm text-gray-500">
                        Brand: {item.product.brand.name} | Category:{" "}
                        {item.product.category.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        Subcategory:{" "}
                        {item.product.subcategory.map((s) => s.name).join(", ")}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.count} | Price: {item.price} EGP
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}