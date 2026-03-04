import React from 'react'
import Slider from '../Slider/Slider';
import { Category } from '@/app/types/cart-interface';


export default async function Categoryslider() {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories");
    const payload= await response.json()
    const categories:Category[]=payload.data
    


  return <Slider categories={categories} />;
}
