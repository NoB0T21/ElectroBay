'use client'

import SortProduct from "./Btn/SortProduct"
import ProductCard from "./card/ProductCard"

interface Product{
    _id: string,
    productType: string,
    name: string,
    description:string,
    price: number,
    images:[{
        url: string,
        path: string
    }],
    createdAt:string,
}

const Products = ({products}:{products:Product[]}) => {
  return (
    <div className='w-full h-[60%]'>
      <div className='flex justify-between px-8 w-full text-[#AAAAAA]'>
        <p>showing all {products.length} results</p>
        <SortProduct/>
      </div>
      <div className="gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-3 px-8 w-full h-full overflow-y-scroll">
        {products.map((product)=>(<ProductCard key={product._id} product={product}/>))}
      </div>
    </div>
  )
}

export default Products
