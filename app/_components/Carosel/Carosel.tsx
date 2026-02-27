'use client'
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";


export function Carosel({ images }: { images: string[] }) {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      opts={{
        loop: true,
      }}
      className="w-full "
    >
      <CarouselContent>
        {images.map((src, index) => (
          <CarouselItem key={index}>
            <CardContent className="flex aspect-square items-center justify-center mt-2 p-2 border-2 rounded-2xl">
              <Image
                src={src}
                width={500}
                height={400}
                alt={src}
                className=""
              />
            </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
