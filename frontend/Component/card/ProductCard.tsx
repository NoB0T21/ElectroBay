'use client'
import { Products } from '@/utils/types'
import { setProduct } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({product}:{product:Products}) => {
  return (
    <Link href={`/product-categor/${product._id}`} 
      onClick={() => setProduct({data:product})}
      className='w-full h-90 overflow-clip transition-(scale) duration-200 ease-in-out hover:scale-102'>
      <Image className='p-3 w-full bg-amber-200 h-[65%] object-contain' width={720} height={720} alt='product' src={product.images?.[0]?.url}/>
      <div className='p-3 w-full h-1/3'>
        <p className='font-semibold text-xl truncate'>{product.name}</p>
        <h5>review</h5>
        <div className='flex gap-2 items-center w-full'>
            <p className='text-xl font-semibold'>₹ {product.offerprice}</p>
            <p className='text-md line-through'>₹ {product.price}</p>
        </div>
        <div className='bg-[#3a6ecf] text-center py-0.5 px-3 rounded-md text-white truncate'>Buy Now</div>
      </div>
    </Link>
  )
}

export default ProductCard