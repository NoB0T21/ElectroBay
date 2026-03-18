'use client'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { OrderStatus } from '@/utils/types'
import { udateorderData } from '@/utils/actions/productsAction'

const Commpletebtn = ({prodId,statu, paid}:{prodId:string,statu:OrderStatus,paid:boolean}) => {
  const route = useRouter()
  const [status,setStatus] = useState<OrderStatus>(statu)
  const update = async (newStatus: OrderStatus) => { 
    await udateorderData({prodId,newStatus})
    route.refresh()
  }

  const updatepayment = async () => { 
    await api.patch(`/product/updatepayment/${prodId}`,
      {payment: true},
      {
        withCredentials:true,
    })
    route.refresh()
  }
  return (
    <div className='flex justify-between w-full gap-2'>
      <select
        value={status}
        disabled={paid}
        onChange={(e) => {
          const newStatus = e.target.value as OrderStatus
          setStatus(newStatus)
          update(newStatus)
        }}
        className="bg-secondary/70 w-25 p-2 border shadow-xl/30 border-zinc-700 focus:border-secondary rounded-md outline-none text-black"
      >
        <option value={OrderStatus.Processing}>Processing</option>
        <option value={OrderStatus.Shipped}>Shipped</option>
        <option value={OrderStatus.OutForDelivery}>Out For Delivery</option>
        <option value={OrderStatus.Delivered}>Delivered</option>
      </select>
      <motion.div 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={()=>{
          if(status!==OrderStatus.Delivered){
            setStatus(OrderStatus.Delivered)
            update(OrderStatus.Delivered)
          }
          if(!paid)updatepayment()
        }} 
        className='flex justify-center items-center px-2 bg-[#FFD369] shadow-2xl hover:shadow-[#f7db98] hover:shadow-md transition-(shadow) ease-in-out rounded-md text-[#222831]'>
        Complete
      </motion.div>
    </div>
  )
}

export default Commpletebtn
