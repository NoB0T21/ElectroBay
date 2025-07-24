import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Visit } from './Icons'

interface Product{
    _id: string,
    productType: string,
    name: string,
    price: number,
    images:[{
        url: string,
        path: string
    }],
    createdAt:string,
}

const AllProducts = ({products}:{products:Product[]}) => {
  return (
    <div className='mt-5 w-full h-[90%]'>
        <div className='gap-8 grid grid-cols-2 md:grid-cols-4 h-8'>
            <div className='md:px-3 w-full font-bold text-md'>Product Name</div>
            <div className='hidden md:flex md:px-3 w-full font-bold text-md'>Category</div>
            <div className='md:px-3 w-full font-bold text-md'>Price</div>
            <div className='hidden md:flex md:px-3 w-full font-bold text-md'>View</div>
        </div>
        <div className='w-full h-full overflow-y-scroll'>
            {
                products.map((product:Product, index)=>{
                    let url:string[] = [] 
                    product.images.map((img, index)=>(url.push(product.images[index].url)))
                    return(
                    <div key={index} className='gap-8 grid grid-cols-2 md:grid-cols-4 w-full'>
                        <div className='flex gap-3 md:px-3 py-2 w-full'>
                            <Image className='bg-[#393E46] p-2 rounded-xl w-40 min-w-[60px] h-22 object-contain' src={url[3]} width={500} height={500} alt='product'/>
                            <Link href={`/product-categor/${product._id}`} className='w-full'>{product.name}</Link>
                        </div>
                        <div className='hidden md:flex px-3 py-2 w-full'>{product.productType}</div>
                            <div className='md:px-3 py-2 w-full'>₹ {product.price}</div>
                            <div className='hidden md:flex w-full h-full'>
                                <Link className='flex justify-center items-center gap-1 bg-[#FFD369] hover:shadow-[#f7db98] hover:shadow-md px-2 py-1 rounded-md w-20 h-10 text-[#222831] text-md hover:scale-110 transition-all duration-300 ease-in-out' href={`/product-categor/${product._id}`}>vist <p className='p-1 w-7 h-7'><Visit/></p></Link>
                            </div>
                    </div>)
                })
            }
        </div>
    </div>
  )
}

export default AllProducts
