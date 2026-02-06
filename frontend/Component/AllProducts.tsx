'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Visit } from './Icons'
import { Products } from '@/utils/types'
import { setProduct } from '@/utils/utils'

const AllProducts = ({ products }: { products: Products[] }) => {
  return (
    <div className='mt-5 w-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden'>
      {/* Header */}
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border-b bg-gray-50 font-semibold text-sm text-gray-500 uppercase tracking-wider'>
        <div>Product</div>
        <div className='hidden md:block'>Category</div>
        <div className='hidden md:block'>Stock</div>
        <div>Price</div>
        <div className='hidden md:block text-right'>Actions</div>
      </div>

      {/* Rows */}
      <div className='w-full'>
        {products.map((product, index) => {
          const imageUrl = product.images?.[0]?.url || '/placeholder.png'

          return (
            <div
              key={product._id || index}
              className='grid relative grid-cols-2 md:grid-cols-5 gap-4 items-center p-4 border-b last:border-b-0 hover:bg-gray-50 transition-colors'
            >
              {/* Product */}
              <div className='peer flex items-center gap-4'>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={72}
                  height={72}
                  style={{ backgroundColor: product.images?.[0]?.background || '#f3f4f6' }}
                  className='rounded-lg p-1 object-contain border border-gray-100'
                />
                <Link
                  href={`/product-categor/${product._id}`}
                  className='font-medium text-slate-800 line-clamp-2 hover:text-blue-600 transition-colors'
                >
                  {product.name}
                </Link>
              </div>
              <div className='absolute z-50 shadow-xl rounded-md -bottom-12 left-10 bg-gray-800 p-2 text-xs text-white max-w-xs hidden peer-hover:flex'>
                {product.name}
              </div>

              {/* Category */}
              <div className='hidden md:block text-slate-600 capitalize'>
                {product.productType}
              </div>

              {/* Stock */}
              <div className='hidden md:flex flex-col justify-center'>
                <span className="font-semibold text-slate-800">{product.stock}</span>
                <p className={`text-xs font-medium ${product.stock > 0 ? (product.stock < 5 ? 'text-orange-500' : 'text-green-500') : 'text-red-500'}`}>{product.stock > 0 ? product.stock<5 ? 'Low Stock' : 'In Stock' : 'Out of Stock'}</p>
              </div>

              {/* Price */}
              <div className='font-semibold text-slate-800'>
                ₹ {product.price}
                <p className='line-through font-normal text-xs text-gray-400'>₹ {product.offerprice}</p>
              </div>

              {/* View */}
              <div className='hidden md:flex gap-2 justify-end'>
                <Link
                  href={`/product-categor/${product._id}`}
                  className='flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors'
                >
                  Visit
                  <span className='size-4'>
                    <Visit />
                  </span>
                </Link>
                <Link
                  onClick={() => setProduct({data:product})}
                  href={`/admin/product_edit/${product._id}`}
                  className='flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors'
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