'use client'
import { Category } from '@/app/types/cart-interface';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
// Import Swiper styles
import "swiper/css";


export default function Slider({ categories }: { categories: Category[] }) {
  console.log(categories);

  return (
    <>
      <div className=' pb-8'>
        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 1000,
          }}
          spaceBetween={0}
          slidesPerView={5}
         
        >
          {categories?.map((Category,index) => {
            return (
              <div key={index}>
                <SwiperSlide key={Category._id}>
                  {" "}
                  <Image
                    className="w-full h-[200px] object-cover"
                    src={Category.image}
                    width={200}
                    height={300}
                    alt="img1"
                  />
                </SwiperSlide>
                <h2>{Category.name}</h2>
              </div>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
