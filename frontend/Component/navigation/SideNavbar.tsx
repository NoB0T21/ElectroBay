import Link from 'next/link'
import React from 'react'

const SideNavbar = () => {
    const shops = ['Air Conditioner','Smart Home','Home appliances','Mobiles','Laptop','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
  return (
    <div className='flex flex-col gap-10 bg-zinc-800 p-8 md:rounded-r-xl rounded-b-xl w-full md:w-70 h-20 md:h-full'>
      <div className='hidden md:flex flex-col items-center pb-10 border-b-2 w-full'>
        <p className='mb-5 font-semibold text-2xl'>Categoires</p>
        <div className='flex flex-col gap-5 px-1 pl-10 w-full text-mb'>{shops.map((shop,index)=>(<Link href={links[index]} className='pr-2 w-full font-medium' key={index}>{shop}</Link>))}</div>
      </div>
    </div>
  )
}

export default SideNavbar
