import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductItem } from "../../types/Productenterface";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

import { Daum } from "@/app/types/categoryinterface";

export default function BrandCard({ prod }: { prod: Daum }) {
  

  return (
    <>
      <Card className="relative mx-auto w-full max-w-sm pt-0">
        <Link href={`/branddetails/${prod._id}`}>
          <Image
            width={300}
            height={200}
            src={prod.image}
            alt={prod.name}
            className="  w-full "
          />
          <CardHeader>
            <CardAction></CardAction>
            <CardTitle>{prod.name}</CardTitle>
            <CardDescription>
              <div className="">
                <h2 className="font-bold py-4 ">{prod.createdAt} </h2>
                <h2 className="font-bold py-4 ">{prod.updatedAt}</h2>
              </div>
            </CardDescription>
          </CardHeader>
        </Link>
      </Card>
    </>
  );
}
