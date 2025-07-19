import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

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
    <div className='mt-5 w-full'>
        <table className='md:hidden flex p-3 w-full'>
            <tbody className='border-1 rounded-xl'>
                <tr className='h-12'>
                    <td className='px-3 font-bold text-xl'>Product Name</td>
                    <td className='px-3 font-bold text-xl'>Price</td>
                </tr>
                {
                    products.map((product:Product, index)=>{
                        let url:string[] = [] 
                        product.images.map((img, index)=>(url.push(product.images[index].url)))
                        return(
                        <tr key={index} className='border-t-1'>
                            <td className='flex gap-3 px-3 py-2'>
                                <Image className='bg-[#f5dfde] p-2 rounded-xl w-40 h-22 object-contain' src={url[3]} width={500} height={500} alt='product'/>
                                <Link href={`/product-categor/${product.productType}/${product._id}`} className='w-full'>{product.name}</Link>
                            </td>
                            <td className='px-3 py-2'>{product.price} rs</td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
        <table className='hidden md:flex p-3 w-full'>
            <tbody className='border-1 rounded-xl'>
                <tr className='h-12'>
                    <td className='px-3 font-bold text-xl'>Product Name</td>
                    <td className='px-3 font-bold text-xl'>Category</td>
                    <td className='px-3 font-bold text-xl'>Price</td>
                    <td className='px-3 font-bold text-xl'>View</td>
                </tr>
                {
                    products.map((product:Product, index)=>{
                        let url:string[] = [] 
                        product.images.map((img, index)=>(url.push(product.images[index].url)))
                        return(
                        <tr key={index} className='border-t-1'>
                            <td className='flex gap-3 px-3 py-2'>
                                <Image className='bg-[#f5dfde] p-2 rounded-xl w-40 h-22 object-contain' src={url[3]} width={500} height={500} alt='product'/>
                                <p className='w-full'>{product.name}</p>
                            </td>
                            <td className='px-3 py-2'>{product.productType}</td>
                            <td className='px-3 py-2'>{product.price} rs</td>
                            <td className='px-3 py-2 w-8 h-full'>
                                <Link className='bg-indigo-400 px-2 py-1 rounded-md w-full h-full text-md' href={`/product-categor/${product.productType}/${product._id}`}>vist</Link>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
    </div>
  )
}

export default AllProducts
