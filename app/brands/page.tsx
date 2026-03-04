import BrandCard from "../_components/BrandCard/BrandCard";
import { Daum } from "../types/categoryinterface";


export default async function brands() {
  let response = await fetch("https://ecommerce.routemisr.com/api/v1/brands");

  let { data: allbrands }: { data: Daum[] } = await response.json();

  return (
    <>
      <div className=" gap-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5  ">
        {allbrands.map((prod) => {
          return <BrandCard key={prod._id} prod={prod} />;
        })}
      </div>
    </>
  );
}
