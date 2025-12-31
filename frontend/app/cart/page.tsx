import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import Cart from '@/Component/Cart'
import Header from '@/Component/Header'
import React from 'react'

const page = async () => {
  const token = (await cookies()).get('token')?.value
  const res = await api.get('/cart/get',{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
    }
  })
  return (
    <div className='flex flex-col items-center px-3 justify-center scroll-smooth w-screen h-screen'>
      <div className='w-full max-w-280 flex flex-col h-full px-4 overflow-hidden shadow-2xl/30'>
        <Header/>
        <Cart carts={res.data.cartdata}/>
      </div>
    </div>
  )
}

export default page
