import Image from "next/image";
import ProductCard from "./_components/Productcard/ProductCard";
import { ProductItem } from "./types/Productenterface";
import MainSlider from "./_components/MainSlider/MainSlider";
import Categoryslider from "./_components/Categoryslider/Categoryslider";



export  default async function Home() {
  
  let response = await fetch('https://ecommerce.routemisr.com/api/v1/products')
  let {data :allproducts}:{data:ProductItem[]}=await response.json()
  
 


  return (
    <>
      <MainSlider />
      <Categoryslider/>
      <div className=" gap-5 w-8/9 mx-auto grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5  ">
        {allproducts.map((prod) => {
          return <ProductCard key={prod._id} prod={prod} />;
        })}
      </div>
    </>
  );
}
