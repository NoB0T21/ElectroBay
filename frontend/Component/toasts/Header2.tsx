import Link from 'next/link'
import React from 'react'

const Header2 = () => {
  return (
    <div className='hidden md:flex justify-between bg-indigo-600 px-10 xl:px-80 rounded-b-md w-full h-12 font-bold'>
      <div className='flex gap-10'>
        <Link href={'/product-categor/home-appliances'}>Home appliances</Link>
        <div>Air conditioner</div>
        <div>Laptops</div>
        <div>Smart Home</div>
        <div>Mobiles</div>
        <div>Television</div>
      </div>
      <div className='flex gap-10'>
        <div>Cart</div>
        <div>Logout</div>
      </div>
    </div>
  )
}

export default Header2
