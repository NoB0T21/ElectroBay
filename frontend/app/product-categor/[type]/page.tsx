'use client'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Cart } from '@/Component/Icons'
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import Toasts from '@/Component/toasts/Toasts'
import PreviewImages from '@/Component/PreviewImages'

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
  const route = useRouter()
  const token = Cookies.get('token')
  const id = params?.type
  const [product,setProduct] = useState<Product>()
  const [showToast,setShowToast] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [tostType,setTostType] = useState('warningMsg')

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
    if(res.status !== 201){
          setResponseMsg(res.data.message)
          if(res.status === 200)setTostType('successMsg');
          setShowToast(true)
          setTimeout(() => {
              setShowToast(false)
            }, 3000);
          return
      }
  }

  const Buy = async () => {
    const res = await api.get(`/cart/${product?._id}`,{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    route.push('/cart')
  }
  return (
    <div className='flex md:flex-row flex-col gap-5 bg-[#393E46] p-5 md:p-10 rounded-2xl w-full h-full md:overflow-hidden overflow-y-scroll'>
      <div className='w-full md:w-1/2'><PreviewImages images={product?.images || []}/></div>

      <div className='flex flex-col gap-5 w-full md:w-1/2'>
        <h1 className='text-shadow-sm text-shadow-white font-bold text-[#EEEEEE] text-2xl'>{product?.name}</h1>
        <p>rating</p>
        <h3 className='h-90 overflow-y-scroll text-[#EEEEEE] break-words whitespace-pre-wrap'>{product?.description}</h3>
        <div className='flex items-end gap-2'>
          <p className='text-2xl'>₹ {product?.offerprice}</p>
          <p className='text-[#AAAAAA] line-through'>₹ {product?.price}</p>
        </div>
        <div className='flex gap-2'>
          <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className='flex justify-center items-center bg-[#FFD369] px-4 rounded-sm w-15 h-10 text-[#222831]' 
          onClick={()=>addtocart()}><Cart/></motion.div>
          <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>Buy()} 
          className='flex justify-center items-center bg-[#FFD369] px-4 rounded-sm w-25 h-10 text-[#222831]'>Buy Now</motion.div>
        </div>
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default page
