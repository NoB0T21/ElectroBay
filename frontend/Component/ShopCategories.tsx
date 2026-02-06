'use client'
import Link from 'next/link'
import React from 'react'
import { Category, RightArrow } from './Icons'

const ShopCategories = () => {
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    return (
        <div className='w-full bg-white rounded-xl shadow-sm border border-gray-100 p-4'>
            <div className='mb-4 font-bold text-lg flex items-center gap-3 text-slate-800 pb-3 border-b border-gray-100'>
                <div className='rounded-lg size-8 bg-[#fab65c] p-1.5 text-white'><Category/></div>
                Shop by Category 
            </div>
            <ul className='flex flex-col gap-1'>
                {categorys.map((_,index)=>(
                    <li key={index} className='w-full'>
                        <Link href={links[index]} className='flex justify-between items-center w-full py-2.5 px-2 rounded-lg hover:bg-gray-50 text-slate-600 hover:text-blue-600 transition-colors font-medium text-sm' >
                            <p>{categorys[index]}</p>
                            <div className='size-3 text-gray-400'><RightArrow/></div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ShopCategories
