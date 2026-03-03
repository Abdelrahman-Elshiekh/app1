import { CheckCheckIcon } from 'lucide-react'
import React from 'react'
import Checkoutform from '../../_components/Checkoutform/Checkoutform'

export default async function checkout({ params }: { params: { cartId: string } }) {
  const { cartId } = await params;
  console.log(cartId);
  
  return (
    <>
      <Checkoutform cartId={cartId}></Checkoutform>
    </>
  );
}
