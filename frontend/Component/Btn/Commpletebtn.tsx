'use client'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { OrderStatus } from '@/utils/types'

const Commpletebtn = ({prodId}:{prodId:string}) => {
  const route = useRouter()
  const token = Cookies.get('token')
  const [status,setStatus] = useState<OrderStatus>(OrderStatus.Processing)
  const update = async (newStatus: OrderStatus) => { 
    await api.patch(`/product/updateorder/${prodId}`,
      {status:newStatus},
      {
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
    })
    route.refresh()
  }

  const updatepayment = async () => { 
    await api.patch(`/product/updatepayment/${prodId}`,
      {payment: true},
      {
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
    })
    route.refresh()
  }
  return (
    <div className='flex justify-between w-full gap-2'>
      <select
        value={status}
        onChange={(e) => {
          const newStatus = e.target.value as OrderStatus
          setStatus(newStatus)
          update(newStatus)
        }}
        className="bg-[#ddebff] w-25 p-2 border shadow-xl/30 border-zinc-700 focus:border-[#2196f3] rounded-md outline-none text-black"
      >
        <option value={OrderStatus.Processing}>Processing</option>
        <option value={OrderStatus.Shipped}>Shipped</option>
        <option value={OrderStatus.OutForDelivery}>Out For Delivery</option>
        <option value={OrderStatus.Delivered}>Delivered</option>
      </select>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={()=>updatepayment()} 
        className='flex justify-center items-center px-2 bg-[#FFD369] shadow-2xl hover:shadow-[#f7db98] hover:shadow-md transition-(shadow) ease-in-out rounded-md text-[#222831]'>
        Complete
      </motion.div>
    </div>
  )
}

export default Commpletebtn
