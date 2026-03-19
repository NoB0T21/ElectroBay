'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const ShopCategories2 = () => {
    const location = usePathname()
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    return (
        <div className='w-full flex overflow-x-auto pb-2 gap-2 scrollbar-hide'>
            {categorys.map((c,index)=>(
                <Link key={index} href={links[index]} className={`flex justify-center rounded-lg items-center ${location == links[index] ? 'bg-amber-400 text-white' : 'border border-zinc-400 text-zinc-400'}  p-1.5 shadow-md hover:text-white hover:bg-amber-400 transition-colors`} >
                    {c}
                </Link>
            ))}
        </div>
    )
}

export default ShopCategories2
