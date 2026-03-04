import React from 'react'
import img2 from '../assets/images/error.svg'
import Image from 'next/image'
export default function Notfound() {
  return (
    <>

      <div className="flex justify-center items-center flex-wrap flex-col" >
        <h1 className='text-red-600 text-7xl p-4'>Page Not Found</h1>
        <Image
          className="object-cover"
          src={img2}
          width={900}
          height={900}
          alt="error"
        />
      </div>
    </>
  );
}
