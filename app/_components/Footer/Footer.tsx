"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";
import imglogo from "../../../assets/images/freshcart-logo.svg";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white mt-20">
      <div className="max-w-screen-xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">FreshCart</h2>
            <p className="text-sm text-gray-400 leading-6">
              Your trusted online store for the best products with fast delivery
              and secure payment.
            </p>
            <Image className="bg-white p-2 rounded-2xl mt-2" alt="logo" width={300} height={300} src={imglogo} />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className="hover:text-white transition"
                >
                  categories
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition">
                  brands
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition">
                  Cart
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-white transition">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates about new products.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-l-md text-black outline-none"
              />
              <button className="bg-green-500 px-4 rounded-2xl hover:bg-green-600 transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 my-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} FreshCart. All rights reserved.
          </p>

          <div className="flex space-x-4">
            <Facebook className="cursor-pointer hover:text-blue-700 transition" />
            <Instagram className="cursor-pointer hover:text-red-500 transition" />
            <Twitter className="cursor-pointer hover:text-blue-400 transition" />
            <Mail className="cursor-pointer hover:text-green-400 transition" />
          </div>
        </div>
      </div>
    </footer>
  );
}
