import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import CartBtn from '../CartBtn'

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

const ProductCard = ({product}:{product:Product}) => {
  return (
    <Link href={`/product-categor/${product._id}`} className='bg-[#ffb8b8] rounded-xl w-full h-90 overflow-clip'>
      <Image className='p-3 w-full h-2/3 object-contain' width={720} height={720} alt='product' src={product.images?.[1]?.url}/>
      <div className='bg-[#fba2a2] p-3 w-full h-1/3'>
        <p className='font-semibold text-black text-xl truncate'>{product.name}</p>
        <p className='font-medium text-black truncate'>{product.description}</p>
        <h5>review</h5>
        <div className='flex justify-between items-center w-full'>
            <p className='text-black'>{product.price}</p>
            <div className='bg-indigo-600 px-3 rounded-full font-semibold truncate'>Buy Now</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard