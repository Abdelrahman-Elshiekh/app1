import Categorycard from "../_components/Categorycard/Categorycard";
import { categoryinterface, Daum } from "../types/categoryinterface";


export  default async function categories() {
  
  let response = await fetch(
    "https://ecommerce.routemisr.com/api/v1/categories",
  );
 
  let { data: allcategories }: { data: Daum[] } = await response.json();
  
 


  return (
    <>
      <div className=" gap-5 grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-5  ">
        {allcategories.map((prod) => {
          return <Categorycard key={prod._id} prod={prod} />;
        })}
      </div>
    </>
  );
}
