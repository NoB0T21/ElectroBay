import Image from 'next/image'
import React from 'react'

const ShopCategories = () => {
    const images = ['/Catrgory/Ac.png','/Catrgory/Alexa.png','/Catrgory/HomeAppliances.png','/Catrgory/iPhone.png','/Catrgory/laptop.png','/Catrgory/tv.png']
    const categorys = ['Air Conditioner','Smart Home','Home Appliances','Mobiles','Laptops','Television']
    return (
        <div className='px-5 lg:px-25 py-1 rounded-xl'>
            <div className='flex flex-col shadow-md shadow-zinc-800 p-5 w-full'>
                <p className='font-bold text-2xl'>Shop by Category </p>
                <div className='gap-5 grid grid-cols-2 md:grid-cols-3 w-full'>
                    {images.map((image,index)=>(
                        <div key={index} className='flex flex-col justify-center items-center gap-2 w-full h-full' >
                            <Image className='h-50 object-contain' width={300} height={300} src={image} alt='Category'/>
                            <p>{categorys[index]}</p>
                            <p className='text-zinc-500'>4 products</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ShopCategories
