import Products from '@/Component/Products'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import React from 'react'

const Page = async () => {
  const token = (await cookies()).get('token')?.value
  const products = await api.get('/product/mobiles',{
    withCredentials:true,
    headers:{
      Authorization: `Bearer ${token}`,
    }
  })
  return (
    <div className='w-full'>
      <div className='flex flex-col justify-center gap-8 px-8 w-full h-70'>
        <p className='font-bold text-[#4f39f6] text-5xl'>Mobiles</p>
        <p className='lg:w-150'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur labore odit vel optio minima, dignissimos accusamus! Voluptatum, autem sunt. Eveniet, consequuntur vitae sequi sit facere quo reiciendis repellat corrupti sint!</p>
      </div>
      <Products products={products.data.products}/>
    </div>
  )
}

export default Page
