import { Products } from '@/utils/types'
import React from 'react'
import ProductCard from './card/ProductCard'

const AllProductsView = ({products}:{products:Products[]}) => {
  return (
    <div className='mt-3 flex overflow-x-scroll w-full overflow-y-hidden p-5 gap-3'>
        {products.map((product)=>(
            <div key={product._id} className='w-55 h-100 shadow-xl/10 rounded-xl overflow-clip'>
                <ProductCard key={product._id} product={product}/>
            </div>
        ))}
    </div>
  )
}

export default AllProductsView
