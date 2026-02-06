'use client'

import { Products } from "@/utils/types"
import SortProduct from "./Btn/SortProduct"
import ProductCard from "./card/ProductCard"


const Productss = ({products}:{products:Products[]}) => {
  return (
    <div className='w-full'>
      <div className='flex justify-between items-center px-4 md:px-8 w-full text-slate-600 mb-4'>
        <p className="font-medium">Showing all {products.length} results</p>
        <SortProduct/>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-8 w-full">
        {products.map((product)=>(
          <div key={product._id} className='w-full shadow-sm hover:shadow-lg rounded-xl overflow-hidden border border-gray-100 hover:-translate-y-1 transition-all duration-300 ease-in-out bg-white'>
            <ProductCard key={product._id} product={product}/>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Productss
