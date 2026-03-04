"use client";
import React from "react";
import img1 from "../../../assets/images/grocery-banner-2.jpeg";
import img2 from "../../../assets/images/grocery-banner.png";
import img3 from "../../../assets/images/slider-image-1.jpeg";
import img4 from "../../../assets/images/slider-image-2.jpeg";
import img5 from "../../../assets/images/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

export default function MainSlider() {
  return (
    <div className="flex flex-col md:flex-row gap-4 pt-8">
      {/* Main Slider */}
      <div className="w-full md:w-3/4">
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          spaceBetween={16}
          slidesPerView={1}
        >
          {[img3, img4, img5].map((img, idx) => (
            <SwiperSlide key={idx}>
              <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[400px]">
                <Image
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Side Images */}
      <div className="w-full md:w-1/4 flex flex-col gap-4 my-4">
        {[img1, img2].map((img, idx) => (
          <div
            key={idx}
            className="relative w-full h-32 sm:h-40 md:h-48 lg:h-52 rounded-xl overflow-hidden"
          >
            <Image
              src={img}
              alt={`Banner ${idx + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
