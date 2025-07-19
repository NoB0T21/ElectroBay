import Cart from '@/Component/Cart'
import Header from '@/Component/Header'
import Header2 from '@/Component/navigation/Header2'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'
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
      <Header2/>
      <Cart cart={res.data.cartdata}/>
    </div>
  )
}

export default page
