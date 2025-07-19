'use client'
import { api } from '@/utils/api'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface Product{
    _id: string,
    productType: string,
    name: string,
    description:string,
    price: number,
    offerprice:number,
    images:[{
        url: string,
        path: string
    }],
    createdAt:string,
}

const page = () => {
  const params = useParams()
    const token = Cookies.get('token')
    const id = params?.type
    const [product,setProduct] = useState<Product>()

    const fetch = async () => {
      const products = await api.get(`/product/item/${id}`,{
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setProduct(products.data.products)
    }
    
    useEffect(()=>{
      fetch()
    },[])

    const addtocart = async () => {
      const res = await api.get(`/cart/${product?._id}`,{
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
    }

    return (
    <div className='flex gap-5 p-10 w-full h-full'>
      <div className='w-1/2'></div>

      <div className='flex flex-col gap-5 p-5 w-1/2'>
        <h1>{product?.name}</h1>
        <p>rating</p>
        <h3 className='h-80 overflow-y-scroll text-zinc-400 break-words whitespace-pre-wrap'>{product?.description}</h3>
        <div className='flex gap-2'><p>₹ {product?.offerprice}</p><p className='line-through'>₹ {product?.price}</p></div>
        <div className='flex gap-2'><div onClick={()=>addtocart()}>AddtoCart</div><p className='line-through'>Buy Now</p></div>
      </div>
    </div>
  )
}

export default page
