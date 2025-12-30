import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Visit } from './Icons'
import { Products } from '@/utils/types'

const AllProducts = ({ products }: { products: Products[] }) => {
  return (
    <div className='mt-5 h-full flex flex-col'>
      {/* Header */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 py-2 border-b font-bold text-md'>
        <div className='px-3'>Product</div>
        <div className='hidden md:block px-3'>Category</div>
        <div className='px-3'>Price</div>
        <div className='hidden md:block px-3'>View</div>
      </div>

      {/* Rows */}
      <div className='w-full overflow-y-auto'>
        {products.map((product, index) => {
          const imageUrl = product.images?.[0]?.url || '/placeholder.png'

          return (
            <div
              key={product._id || index}
              className='grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-3 border-b hover:bg-[#2a2f36]/40 transition'
            >
              {/* Product */}
              <div className='flex items-center gap-4 px-3'>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={72}
                  height={72}
                  className='rounded-lg bg-[#393E46] object-cover'
                />
                <Link
                  href={`/product-categor/${product._id}`}
                  className='font-medium line-clamp-2 hover:underline'
                >
                  {product.name}
                </Link>
              </div>

              {/* Category */}
              <div className='hidden md:block px-3 text-gray-700'>
                {product.productType}
              </div>

              {/* Price */}
              <div className='px-3 font-semibold'>
                ₹ {product.price}
                <p className='line-through font-normal text-sm'>₹ {product.offerprice}</p>
              </div>

              {/* View */}
              <div className='hidden md:flex px-3'>
                <Link
                  href={`/product-categor/${product._id}`}
                  className='flex items-center gap-1 bg-[#3b76d4] px-3 py-1.5 rounded-md text-white hover:scale-105 transition'
                >
                  Visit
                  <span className='w-5 h-5'>
                    <Visit />
                  </span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AllProducts