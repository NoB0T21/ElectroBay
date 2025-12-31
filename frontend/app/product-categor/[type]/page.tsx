'use client'
import { api } from '@/utils/api'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Cart } from '@/Component/Icons'
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import Toasts from '@/Component/toasts/Toasts'
import PreviewImages from '@/Component/PreviewImages'
import { Products } from '@/utils/types'
import { getProduct } from '@/utils/utils'

const page = () => {
  const params = useParams()
  const route = useRouter()
  const token = Cookies.get('token')
  const [product,setProduct] = useState<Products>()
  const [showToast,setShowToast] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [tostType,setTostType] = useState('warningMsg')
    
  useEffect(()=>{
    setProduct( getProduct())
  },[])

  const addtocart = async () => {
    try {
      const res = await api.get(`/cart/${product?._id}`,{
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      setResponseMsg(res.data.message)
      if(res.status === 200)setTostType('successMsg');
      setShowToast(true)
      setTimeout(() => {
          setShowToast(false)
        }, 3000);
      return
    } catch (error:any) {
      setResponseMsg(error?.response?.data?.message||error?.message)
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
    <>
      <h1 className='text-3xl font-bold'>{product?.productType}</h1>
      <div className='relative flex md:flex-row flex-col gap-5 p-5 w-full h-full'>
        <div className='w-90'><PreviewImages images={product?.images || []}/></div>

        <div className='flex flex-col gap-2 w-full'>  
          <div className=' flex items-center justify-between'>
            <h1 className='text-shadow-sm text-shadow-white font-bold w-[70%]  text-2xl'>{product?.name}</h1>
            <div className='flex flex-col items-end gap-4'>
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className='flex justify-center items-center bg-[#fa953c] px-3 py-0.5 rounded-md  gap-2 h-10 text-white' 
                onClick={()=>addtocart()}>
                  <div className='size-8'>
                    <Cart/>
                  </div>
                  <p className='hidden xl:flex '>Add Cart</p>
              </motion.div>
              <p className='text-xl font-semibold'>₹ {product?.offerprice}</p>
              <p>{product?.stock && product?.stock > 0
                ? product.stock <= 8
                  ? 'Few Stock Left'
                  : 'In Stock'
                : 'Out of Stock'}</p>
            </div>
          </div>
          <div className='flex items-start gap-2'>
            <p className='text-4xl font-bold'>₹ {product?.offerprice}</p>
            <p className='text-lg'>Today</p>
          </div>
          <p className='line-through'>₹ {product?.price}</p>
          <p>rating</p>
        </div>
        <div className='absolute flex gap-2 right-0 bottom-20'>
          <motion.div 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={()=>Buy()} 
          className='flex justify-center items-center text-white bg-[#fa953c] px-4 rounded-sm h-10'>Procide Buy Now</motion.div>
        </div>
      </div>
      <div className='px-8'>
        <h1 className='text-4xl font-semibold'>Products Details</h1>
        <h3 className='whitespace-pre-wrap'>{product?.description}</h3>
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default page
