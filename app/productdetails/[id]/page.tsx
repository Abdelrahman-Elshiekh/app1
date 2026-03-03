
import React from 'react'
import { ProductItem } from '@/app/types/Productenterface';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Carosel } from '@/app/_components/Carosel/Carosel';
import AddBTn from '@/app/_components/AddBtn/AddBTn';


type Myprops={
 params : {
  id:string
 }

}
 

export default async function productdetails(props: Myprops) {
  let { id } = await props.params;


  let response = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  let { data: singleproduct }: { data: ProductItem} = await response.json();





  return (
    <>
      <div className="grid md:grid-cols-3 gap-5 items-center justify-center">
        <div className="col-span-1">
          <Carosel images={singleproduct.images}></Carosel>
        </div>
        <div className="col-span-2  ">
          <Card className="relative p-8">
            <CardHeader>
              <CardAction>
                <Badge variant="secondary">{singleproduct.brand.name}</Badge>
              </CardAction>
              <CardTitle>
                {singleproduct.title.split(" ").slice(0, 2).join("")}
              </CardTitle>
              <div>
                <CardDescription>
                  <p>{singleproduct.description}</p>
                </CardDescription>
                <CardDescription>
                  <div className="flex justify-between">
                    <span>{singleproduct.price} EGP</span>
                    <span className="flex justify-between items-center gap-1 ">
                      {singleproduct.ratingsAverage}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 text-yellow-300"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                </CardDescription>
                <CardDescription>
                  <p>{singleproduct.quantity}</p>
                </CardDescription>
              </div>
            </CardHeader>

            <AddBTn productId={singleproduct._id}/>
          </Card>
        </div>
      </div>
    </>
  );
}
