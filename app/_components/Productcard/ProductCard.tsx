import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductItem } from "../../types/Productenterface";
import imglogo from '../../../assets/images/ChatGPT Image Jan 31, 2026, 01_39_02 AM.png'
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
import AddBTn from "../AddBtn/AddBTn";




export default function ProductCard( {prod}:{prod :  ProductItem}) {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <Link href={`/productdetails/${prod._id}`}>
        <Image
          width={300}
          height={200}
          src={prod.imageCover}
          alt={prod.title}
          className="  w-full "
        />
        <CardHeader>
          <CardAction>
            <Badge variant="secondary">{prod.brand.name}</Badge>
          </CardAction>
          <CardTitle>{prod.title.split(" ").slice(0, 2).join("")}</CardTitle>
          <CardDescription>
            <div className="flex justify-between">
              <span>{prod.price} EGP</span>
              <span className="flex justify-between items-center gap-1 ">
                {prod.ratingsAverage}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 text-yellow-300"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          </CardDescription>
        </CardHeader>
      </Link>
      <AddBTn productId={prod._id} />
    </Card>
  );
}
