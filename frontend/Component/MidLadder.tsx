import React from 'react'
import ShopCategories from './ShopCategories'
import ShopCategories2 from './ShopCategories2'
import AllProductsView from './AllProductsView'
import { Products } from '@/utils/types'

const MidLadder = ({products}:{products:Products[]}) => {
  return (
    <div className='w-full items-start gap-3 flex mt-12 2xl:mt-2'>
      <ShopCategories/>
      <div className='w-[70%]'>
        <ShopCategories2/>
        <AllProductsView products={products}/>
      </div>
    </div>
  )
}

export default MidLadder
