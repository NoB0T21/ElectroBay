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
      className='w-full relative h-90 overflow-clip transition-(scale) duration-200 ease-in-out hover:scale-102'>
      <Image 
        className='p-3 w-full h-[65%] object-contain rounded-md overflow-clip'
        style={{ backgroundColor: product.images?.[0]?.background || '#fff' }}
        width={720} 
        height={720} 
        alt='product' 
        src={product.images?.[0]?.url}
      />
      <p className={`absolute bottom-35 left-3 ${
        product?.stock && product?.stock > 0 ? product.stock <= 8
          ? 'bg-[#ffb348d2] text-black'
          : 'bg-[#bbff73b3] text-black' : 'bg-red-300 text-white'
      } px-2 rounded-md`}>{product?.stock && product?.stock > 0
        ? product.stock <= 8
          ? 'Few Stock Left'
          : 'In Stock'
        : 'Out of Stock'}
        </p>
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