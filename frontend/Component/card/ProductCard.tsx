import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    <Link href={`/product-categor/${product._id}`} className='bg-[#393E46] rounded-xl w-full h-90 overflow-clip transition-(scale) duration-200 ease-in-out hover:scale-102'>
      <Image className='p-3 w-full h-2/3 object-contain' width={720} height={720} alt='product' src={product.images?.[0]?.url}/>
      <div className='bg-[#2f3239] p-3 w-full h-1/3'>
        <p className='font-semibold text-[#EEEEEE] text-xl truncate'>{product.name}</p>
        <p className='font-medium text-[#EEEEEE] truncate'>{product.description}</p>
        <h5>review</h5>
        <div className='flex justify-between items-center w-full'>
            <p className='text-[#AAAAAA]'>₹ {product.price}</p>
            <div className='bg-[#FFD369] px-3 rounded-md font-semibold text-zinc-700 truncate'>Buy Now</div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard