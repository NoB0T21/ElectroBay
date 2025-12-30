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
    <div className='w-full h-screen'>
      <Header/>
      <Cart cart={res.data.cartdata}/>
    </div>
  )
}

export default page
