import Link from 'next/link'
import React from 'react'

const Header2 = () => {
  return (
    <div className='hidden md:flex justify-between gap-5 bg-[#222832] px-20 lg:px-40 rounded-b-md w-full h-12 font-bold'>
        <Link href={'/product-categor/home-appliances'}>Home appliances</Link>
        <Link href={'/product-categor/air-conditioner'}>Air conditioner</Link>
        <Link href={'/product-categor/laptops'}>Laptops</Link>
        <Link href={'/product-categor/smart-home'}>Smart Home</Link>
        <Link href={'/product-categor/mobiles'}>Mobiles</Link>
        <Link href={'/product-categor/television'}>Television</Link>
    </div>
  )
}

export default Header2
