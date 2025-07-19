import Link from 'next/link'
import React from 'react'
import Logout from './Logout'

const Header2 = () => {
  return (
    <div className='hidden md:flex justify-between gap-5 bg-indigo-600 px-10 xl:px-80 rounded-b-md w-full h-12 font-bold'>
      <div className='flex gap-10'>
        <Link href={'/product-categor/home-appliances'}>Home appliances</Link>
        <div>Air conditioner</div>
        <div>Laptops</div>
        <div>Smart Home</div>
        <div>Mobiles</div>
        <div>Television</div>
      </div>
      <div className='flex gap-10'>
        <Link href={'/cart'}>Cart</Link>
        <Logout/>
      </div>
    </div>
  )
}

export default Header2
