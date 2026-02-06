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
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8">
      {/* Breadcrumb / Category */}
      <nav className="mb-6 text-sm text-slate-500 font-medium uppercase tracking-wide">
        {product?.productType}
      </nav>

      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* Left Column: Images */}
        <div className="w-full lg:w-1/2">
           <div className="sticky top-24">
             <PreviewImages images={product?.images || []}/>
           </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight mb-4">{product?.name}</h1>
          
          {/* Price Section */}
          <div className="flex items-baseline gap-4 mb-6">
            <span className="text-4xl font-bold text-slate-900">₹ {product?.offerprice}</span>
            {product?.price && product.price > (product.offerprice || 0) && (
              <>
                <span className="text-xl text-slate-400 line-through">₹ {product.price}</span>
                <span className="text-green-600 font-bold bg-green-50 px-2 py-1 rounded-md text-sm">
                  {Math.round(((product.price - product.offerprice) / product.price) * 100)}% OFF
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-8">
             {product?.stock && product?.stock > 0 ? (
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${product.stock <= 8 ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'}`}>
                  {product.stock <= 8 ? `Hurry! Only ${product.stock} left` : 'In Stock'}
                </span>
             ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-300 text-red-700">
                  Out of Stock
                </span>
             )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addtocart()}
              className="flex-1 flex justify-center items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 py-3.5 px-6 rounded-xl font-bold hover:bg-slate-50 transition-colors"
            >
              <div className="size-5"><Cart/></div>
              Add to Cart
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => Buy()}
              className="flex-1 bg-black text-white py-3.5 px-6 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg"
            >
              Buy Now
            </motion.button>
          </div>

          {/* Description */}
          <div className="border-t border-gray-100 pt-8">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Product Description</h2>
            <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed whitespace-pre-wrap">
              {product?.description}
            </div>
          </div>
        </div>
      </div>
      
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default page
