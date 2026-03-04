import React from "react";
import { ProductItem } from "@/app/types/Productenterface";
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
import { Carosel } from "@/app/_components/Carosel/Carosel";
import AddBTn from "@/app/_components/AddBtn/AddBTn";
import { Daum } from "@/app/types/categoryinterface";
import Image from "next/image";

type Myprops = {
  params: {
    id: string;
  };
};

export default async function categorydetails(props: Myprops) {
  let { id } = await props.params;

  let response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/categories/${id}`,
  );
  let { data: singleproduct }: { data: Daum } = await response.json();

  return (
    <>
      <div className="grid md:grid-cols-3 min-h-[400px]   items-center justify-center pt-8">
        <div className="col-span-1  ">
          <Image
            className="border-2 rounded-2xl"
            src={singleproduct.image}
            width={300}
            height={200}
            alt="img"
          />
        </div>
        <div className="col-span-2   ">
          <Card className="relative p-8 ">
            <CardHeader>
              <CardAction></CardAction>
              <CardTitle className="text-4xl"> {singleproduct.name}</CardTitle>
              <div>
                <CardDescription>
                  <p className="font-bold my-5">{singleproduct.slug}</p>
                </CardDescription>
                <CardDescription>
                  <div className="flex justify-between">
                    <span className="font-bold text-2xl">
                      <span className="text-red-400 pe-2 text-2xl">
                        {" "}
                        createdAt{" "}
                      </span>
                      {singleproduct.createdAt}{" "}
                    </span>
                    <span className="font-bold text-2xl  ">
                      <span className="text-red-400 pe-2 text-2xl">
                        {" "}
                        updatedAt{" "}
                      </span>
                      {singleproduct.updatedAt}
                    </span>
                  </div>
                </CardDescription>
                <CardDescription></CardDescription>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}
