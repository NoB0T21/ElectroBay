'use client'
import Link from 'next/link'
import React from 'react'
import { AirConditioner, Appliances, Laptop, Mobile, SmartHome, Tv, } from './Icons'

const ShopCategories2 = () => {
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    const icon = [<AirConditioner/>,<SmartHome/>, <Appliances/>, <Mobile/>, <Laptop/>, <Tv/>]
    return (
        <div className='w-full flex overflow-x-auto pb-2 gap-4 md:gap-0 scrollbar-hide'>
            {categorys.map((_,index)=>(
                <div key={index} className='flex flex-col min-w-[80px] w-full items-center gap-2'>
                    <Link href={links[index]} className='flex justify-center items-center rounded-full bg-amber-400 text-white p-3 w-12 h-12 md:w-14 md:h-14 shadow-md hover:bg-amber-500 transition-colors' >
                        {icon[index]}
                    </Link>
                    <p className="text-xs md:text-sm font-medium text-center text-slate-700 whitespace-nowrap">{categorys[index]}</p>
                </div>
            ))}
        </div>
    )
}

export default ShopCategories2
