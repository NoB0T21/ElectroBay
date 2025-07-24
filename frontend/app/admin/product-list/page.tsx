import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import React from 'react'
import AllProducts from '@/Component/AllProducts'

const page = async () => {
  const token = (await cookies()).get('token')?.value
  const Products = await api.get('/product/Get',{
    withCredentials:true,
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return (
    <div className='py-8 w-full h-full'>
      <p className='font-bold text-2xl'>All Product</p>
      <AllProducts products={Products.data.products}/>
    </div>
  )
}

export default page
