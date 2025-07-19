import Header from '@/Component/Header'
import Header2 from '@/Component/navigation/Header2'
import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import React from 'react'

interface Order {
    userId: string,
    productId: string[],
    productName: string[],
    Fullname: string,
    PhoneNo: number,
    Address: string,
    City: string,
    State: string,
    Pincode: number,
    price: number,
    payment: boolean,
    createdAt:string,
}

const page = async () => {
    const token = (await cookies()).get('token')?.value
    const order = await api.get('/product/order/get',{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
    }
  })
  console.log(order.data)
  return (
    <div className='w-full h-screen'>
      <Header/>
      <Header2/>
      <div className='px-10 py-5 w-full'>
        <p className='text-2xl'>My Orders</p>
        <div className='bg-white my-5 w-full h-0.5'></div>
        <table className='flex p-3 w-full'>
            <tbody className='w-full'>
                <tr className='w-full h-12'>
                    <td className='px-3 font-bold text-xl'>Product Name</td>
                    <td className='px-3 font-bold text-xl'>address</td>
                    <td className='px-3 font-bold text-xl'>Price</td>
                    <td className='px-3 font-bold text-xl'>Status</td>
                </tr>
                {
                    order.data.products.map((product:Order, index:any)=>{
                        return(
                        <tr key={index} className='border-t-1 w-full'>
                            <td className='flex gap-3 px-3 py-2'>
                                <div>hello</div>
                                <div className='w-full'>{product.productName.map((names)=>(<p>{names}</p>))}</div>
                            </td>
                            <td className='px-3 py-2'>
                                <p>{product.Fullname}</p>
                                <p>{product.Address}</p>
                                <p>{product.City},{product.State}</p>
                                <p>{product.Pincode}</p>
                                <p>{product.PhoneNo}</p>
                            </td>
                            <td className='px-3 py-2'>{product.price} rs</td>
                            <td className='px-3 py-2'>
                                <p>Data: {product.createdAt.split('T')[0]}</p>
                                <p>Payment: {product.payment?'completed':'pending'}</p>
                            </td>
                        </tr>)
                    })
                }
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default page
