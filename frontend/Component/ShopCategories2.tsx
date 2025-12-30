'use client'
import Link from 'next/link'
import React from 'react'
import { AirConditioner, Appliances, Laptop, Mobile, SmartHome, Tv, } from './Icons'

const ShopCategories2 = () => {
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    const icon = [<AirConditioner/>,<SmartHome/>, <Appliances/>, <Mobile/>, <Laptop/>, <Tv/>]
    return (
        <div className='w-full flex'>
            {categorys.map((_,index)=>(
                <div key={index} className='flex flex-col w-full items-center h-12 mb-2'>
                    <Link href={links[index]} className='flex flex-col rounded-2xl bg-amber-400 justify-center items-center p-1.5 gap-2 w-11 h-10' >
                        {icon[index]}
                    </Link>
                    <p>{categorys[index]}</p>
                </div>
            ))}
        </div>
    )
}

export default ShopCategories2
