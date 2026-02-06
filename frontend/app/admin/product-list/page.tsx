import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import React from 'react'
import AllProducts from '@/Component/AllProducts'

const page = async () => {
  const token = (await cookies()).get('token')?.value
  let products = []
  try {
    const res = await api.get('/product/Get',{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    products = res.data.products
  } catch (error) {
    console.log(error)
  }

  if(!products || products.length === 0){
    return (
      <div className='w-full'>
        <h1 className='text-2xl font-bold text-slate-800 mb-6'>All Products</h1>
        <div className='text-center py-20 text-gray-500'>No Products Found</div>
      </div>
    )
  }

  return (
    <div className='w-full'>
      <h1 className='text-2xl font-bold text-slate-800 mb-6'>All Products</h1>
      <AllProducts products={products}/>
    </div>
  )
}

export default page
