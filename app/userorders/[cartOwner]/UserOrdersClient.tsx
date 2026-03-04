
"use client";
import React, { useEffect, useState } from "react";

import { Order } from "@/app/types/orderinterface";
import Image from "next/image";

interface Props {
  cartOwner: string;
}

export default function UserOrdersClient({ cartOwner }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cartOwner) {
      setError("Cart owner ID not found");
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${cartOwner}`,
        );

        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to fetch orders");
        }

        const data: Order[] = await res.json();
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [cartOwner]);

  if (loading) return <h2 className="text-center mt-10">Loading orders...</h2>;
  if (error)
    return <h2 className="text-center mt-10 text-red-600">Error: {error}</h2>;
  if (!orders.length)
    return <h2 className="text-center mt-10">You have no orders yet.</h2>;

  console.log(orders);
  function formatDate(date: string) {
    return new Date(date).toLocaleDateString();
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white shadow-xl rounded-2xl p-8 space-y-6"
        >
          {/* Top Section */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-semibold text-gray-700">
                Order ID: {order.id}
              </h2>
              <p className="text-gray-500 mt-1">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <span
              className={`px-4 py-1 rounded-full text-sm font-medium ${
                order.isDelivered
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {order.isDelivered ? "Delivered" : "Pending"}
            </span>
          </div>

          {/* Payment Section */}
          <div className="grid md:grid-cols-2 gap-6 text-lg">
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Payment:</span>{" "}
                {order.paymentMethodType}
              </p>

              <p>
                <span className="font-semibold">Total:</span>{" "}
                <span className="text-green-600 font-bold">
                  {order.totalOrderPrice} EGP
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <span className="font-semibold">Paid:</span>{" "}
                <span
                  className={
                    order.isPaid
                      ? "text-green-600 font-medium"
                      : "text-red-500 font-medium"
                  }
                >
                  {order.isPaid ? "Yes" : "No"}
                </span>
              </p>

              <p>
                <span className="font-semibold">Shipping:</span>{" "}
                {order.shippingPrice} EGP
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gray-100 rounded-xl p-5">
            <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.details || "No details provided"}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.city}
            </p>
            <p className="text-sm text-gray-600">
              {order.shippingAddress.phone}
            </p>
          </div>

          {/* Products */}
          <h3 className="text-2xl font-semibold text-center mt-6">Products</h3>

          <div className="space-y-6">
            {order.cartItems.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center gap-6 border-b pb-6"
              >
                <Image
                  src={item.product.imageCover}
                  width={80}
                  height={80}
                  alt={item.product.title}
                  className="rounded-lg"
                />

                <div className="space-y-1">
                  <h4 className="text-lg font-semibold">
                    {item.product.title}
                  </h4>

                  <p className="text-gray-600 text-sm">
                    Brand: {item.product.brand.name} | Category:{" "}
                    {item.product.category.name}
                  </p>

                  <p className="text-gray-600 text-sm">
                    Subcategory: {item.product.subcategory[0]?.name}
                  </p>

                  <p className="text-gray-600 text-sm">
                    Qty: {item.count} | Price: {item.price} EGP
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}