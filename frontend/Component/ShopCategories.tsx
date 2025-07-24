'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'

const ShopCategories = () => {
    const images = ['/Catrgory/Ac.png','/Catrgory/Alexa.png','/Catrgory/HomeAppliances.png','/Catrgory/iPhone.png','/Catrgory/laptop.png','/Catrgory/tv.png']
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
    return (
        <div className='px-5 lg:px-25 py-1 rounded-xl'>
            <div className='flex flex-col shadow-md shadow-zinc-800 p-5 w-full'>
                <p className='mb-5 font-bold text-2xl'>Shop by Category </p>
                <div className='gap-5 grid grid-cols-2 md:grid-cols-3 w-full'>
                    {images.map((image,index)=>(
                        <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ amount: 0.2 }}
                        className='w-full h-full' 
                        key={index}>
                            <Link href={links[index]} className='flex flex-col justify-center items-center gap-2 hover:bg-[#444951] bg-[#393E46] p-5 rounded-xl w-full h-45 md:h-full hover:scale-104 transition-(scale) duration-200 ease-in-out' >
                                <Image className='h-50 object-contain' width={300} height={300} src={image} alt='Category'/>
                                <p>{categorys[index]}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopCategories
