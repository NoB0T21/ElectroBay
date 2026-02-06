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
    <div className='min-h-screen w-full flex justify-center bg-gray-50'>
      <div className='w-full max-w-[1440px] bg-white min-h-screen flex flex-col shadow-2xl overflow-x-hidden'>
        <Header/>
        <main className="flex-1 w-full">
          <Cart carts={res.data.cartdata}/>
        </main>
      </div>
    </div>
  )
}

export default page
