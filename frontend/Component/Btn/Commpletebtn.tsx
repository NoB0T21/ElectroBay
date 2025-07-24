'use client'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
import React from 'react'
import Cookies from 'js-cookie'

const Commpletebtn = ({prodId}:{prodId:string}) => {
  const route = useRouter()
  const token = Cookies.get('token')
  const update = async () => { 
    await api.patch(`/product/updateorder/${prodId}`,{payment: true},
      {
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
    })
  route.refresh()
}
  return (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={()=>update()} 
      className='flex justify-center bg-[#FFD369] shadow-2xl hover:shadow-[#f7db98] hover:shadow-md transition-(shadow) ease-in-out rounded-md text-[#222831]'>
        Complete
      </motion.div>
  )
}

export default Commpletebtn
