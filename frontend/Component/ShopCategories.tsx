'use client'
import Link from 'next/link'
import React from 'react'
import { Category, RightArrow } from './Icons'

const ShopCategories = () => {
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    return (
        <div className='w-50 xl:w-68'>
            <div className='mb-5 font-bold text-sm xl:text-2xl gap-2 p-3 text-center rounded-xl flex justify-center items-center shadow-xl/30'>
                <div className='rounded-lg size-4 md:size-6 2xl:size-8 bg-[#fab65c] p-1.5'><Category/></div>
                Shop by Category 
            </div>
            <ul className='list-disc pl-10'>
                {categorys.map((_,index)=>(
                    <li key={index} className='w-full h-12 mb-2'>
                        <Link href={links[index]} className='flex justify-between items-center gap-2 w-full h-12' >
                            <p>{categorys[index]}</p>
                            <div className='size-3 md:size-4'><RightArrow/></div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShopCategories
