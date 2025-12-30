'use client'

import { Products } from "@/utils/types"
import SortProduct from "./Btn/SortProduct"
import ProductCard from "./card/ProductCard"


const Productss = ({products}:{products:Products[]}) => {
  return (
    <div className='w-full h-[60%]'>
      <div className='flex justify-between px-8 w-full text-[#535353]'>
        <p>showing all {products.length} results</p>
        <SortProduct/>
      </div>
      <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 px-8 w-full h-full">
        {products.map((product)=>(
          <div key={product._id} className='w-55 h-100 shadow-xl/20 rounded-xl overflow-clip hover:scale-110 transition-(scale) duration-200 ease-in-out'>
            <ProductCard key={product._id} product={product}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productss
