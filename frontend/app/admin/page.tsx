import ProductForm from '@/Component/ProductForm'
import React from 'react'

const page = () => {
  return (
    <div className='w-full'>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Add New Product</h1>
      <ProductForm/>
    </div>
  )
}

export default page
