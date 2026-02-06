import React from 'react'
import ShopCategories from './ShopCategories'
import ShopCategories2 from './ShopCategories2'
import AllProductsView from './AllProductsView'
import { Products } from '@/utils/types'

const MidLadder = ({products}:{products:Products[]}) => {
  return (
    <div className='w-full flex flex-col lg:flex-row items-start gap-6 px-4 md:px-8 mt-8'>
      <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
        <ShopCategories/>
      </div>
      <div className='w-full lg:w-3/4 xl:w-4/5 flex flex-col gap-6'>
        <ShopCategories2/>
        <AllProductsView products={products}/>
      </div>
    </div>
  )
}

export default MidLadder
