import { Products } from '@/utils/types'
import React from 'react'
import ProductCard from './card/ProductCard'

const AllProductsView = ({products}:{products:Products[]}) => {
  return (
    <div className='flex overflow-x-auto pb-6 pt-2 gap-4 w-full scrollbar-hide snap-x'>
        {products.map((product)=>(
            <div key={product._id} className='min-w-[220px] w-64 snap-start shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden border border-gray-100'>
                <ProductCard key={product._id} product={product}/>
            </div>
        ))}
    </div>
  )
}

export default AllProductsView
