'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Visit } from './Icons'
import { Products } from '@/utils/types'
import { setProduct } from '@/utils/utils'

const AllProducts = ({ products }: { products: Products[] }) => {
  return (
    <div className='mt-5 h-full flex flex-col'>
      {/* Header */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 py-2 border-b font-bold text-md'>
        <div className='px-3'>Product</div>
        <div className='hidden md:block px-3'>Category</div>
        <div className='hidden md:block px-3'>Stock</div>
        <div className='px-3'>Price</div>
        <div className='hidden md:block px-3'>View</div>
      </div>

      {/* Rows */}
      <div className='w-full'>
        {products.map((product, index) => {
          const imageUrl = product.images?.[0]?.url || '/placeholder.png'

          return (
            <div
              key={product._id || index}
              className='grid relative grid-cols-2 md:grid-cols-5 gap-4 items-center py-3 border-b hover:bg-[#2a2f36]/40 transition'
            >
              {/* Product */}
              <div className='peer  flex items-center gap-4 px-3'>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={72}
                  height={72}
                  style={{ backgroundColor: product.images?.[0]?.background || '#fff' }}
                  className='rounded-lg p-1 object-cover'
                />
                <Link
                  href={`/product-categor/${product._id}`}
                  className='font-medium line-clamp-2 hover:underline'
                >
                  {product.name}
                </Link>
              </div>
              <div className='absolute z-1000 shadow-xl/30 rounded-md -bottom-12 bg-zinc-500 p-1 text-sm text-white max-w-50 hidden peer-hover:flex'>
                {product.name}
              </div>

              {/* Category */}
              <div className='hidden md:block px-3 text-gray-700'>
                {product.productType}
              </div>

              {/* Stock */}
              <div className='px-3 flex flex-col justify-center font-semibold'>
                {product.stock}
                <p className='font-normal text-sm'>{product.stock > 0 ? product.stock<5 ? 'Few Stock left' : 'In Stock' : 'Out of Stock'}</p>
              </div>

              {/* Price */}
              <div className='px-3 font-semibold'>
                ₹ {product.price}
                <p className='line-through font-normal text-sm'>₹ {product.offerprice}</p>
              </div>

              {/* View */}
              <div className='hidden md:flex gap-2 px-3'>
                <Link
                  href={`/product-categor/${product._id}`}
                  className='flex items-center gap-1.5 bg-[#3b76d4] px-1.5 py-1 text-sm font-bold rounded-md text-white hover:scale-105 transition'
                >
                  Visit
                  <span className='size-4'>
                    <Visit />
                  </span>
                </Link>
                <Link
                  onClick={() => setProduct({data:product})}
                  href={`/admin/product_edit/${product._id}`}
                  className='flex items-center gap-1 bg-[#3b76d4] px-1.5 py-1 text-sm font-bold rounded-md text-white hover:scale-105 transition'
                >
                  Edit
                  <span className='size-4'>
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