"use client";
import { Category } from "@/app/types/cart-interface";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";

export default function Slider({ categories }: { categories: Category[] }) {
  return (
    <div className="pb-8">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        spaceBetween={16}
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          480: { slidesPerView: 2 }, // small tablets
          768: { slidesPerView: 3 }, // tablets
          1024: { slidesPerView: 4 }, // small desktop
          1280: { slidesPerView: 5 }, // large desktop
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id}>
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-40 md:h-48 lg:h-52 relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <h2 className="text-center font-medium text-sm md:text-base lg:text-lg">
                {category.name}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
