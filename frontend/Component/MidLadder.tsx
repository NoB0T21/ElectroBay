import React from 'react'
import ShopCategories from './ShopCategories'
import ShopCategories2 from './ShopCategories2'
import AllProductsView from './AllProductsView'
import { Products } from '@/utils/types'
import ProductCard from './card/ProductCard'

const MidLadder = ({products}:{products:Products[]}) => {
  return (
    // {/* Local Favorites */}
    <section className="container py-12">
      <h2 className="font-display text-2xl font-bold mb-6">Local Favorites</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((p, idx)=> <ProductCard key={p._id} product={p} index={`${idx}`} />)}
      </div>
    </section>
    // <div className='w-full flex flex-col lg:flex-row items-start gap-6 px-4 md:px-8 mt-8'>
    //   <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
    //     <ShopCategories/>
    //   </div>
    //   <div className='w-full lg:w-3/4 xl:w-4/5 flex flex-col gap-6'>
    //     <ShopCategories2/>
    //     <AllProductsView products={products}/>
    //   </div>
    // </div>
  )
}

export default MidLadder
