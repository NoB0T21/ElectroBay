import Header from '@/Component/Header'
import Header2 from '@/Component/navigation/Header2'
import React from 'react'
import { cookies } from 'next/headers'
import { api } from '@/utils/api'
import { Orderfill } from '@/Component/Icons'

interface Order {
    _id:string,
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

  return (
    <div className='w-full h-screen'>
      <Header/>
      <Header2/>
      <div className='px-10 py-5 w-full'>
        <p className='text-2xl'>My Orders</p>
        <div className='bg-white my-5 w-full h-0.5'></div>
                <div className='hidden gap-2 md:grid grid-cols-1 md:grid-cols-4 w-full h-12'>
                    <div className='px-3 font-bold text-xl'>Product Name</div>
                    <div className='px-3 font-bold text-xl'>address</div>
                    <div className='px-3 font-bold text-xl'>Price</div>
                    <div className='px-3 font-bold text-xl'>Status</div>
                </div>
                {order.data.orders.map((order:Order)=>(
                    <div key={order._id}>
                        <div className='gap-2 grid grid-cols-1 md:grid-cols-4 bg-[#393E46] rounded-2xl w-full md:h-45'>
                            <div className='flex items-center gap-3 px-1 md:px-3 py-2 w-full'>
                                <div className='flex items-center bg-[#FFD369] p-2 rounded-xl size-15 text-[#222831]'><Orderfill/></div>
                                <div className='flex flex-col w-full'>{order.productName.map((names,index)=>(<div key={index}>{names}</div>))}</div>
                            </div>
                            <div className='flex flex-col justify-center px-1 md:px-3 py-2'>
                                <p>{order.Fullname}</p>
                                <p>{order.Address}</p>
                                <p>{order.City},{order.State}</p>
                                <p>{order.Pincode}</p>
                                <p>{order.PhoneNo}</p>
                            </div>
                            <div className='flex items-center px-1 md:px-3 py-2'>₹ {order.price}</div>
                            <div className='flex flex-col justify-center px-1 md:px-3 py-2'>
                                <p>Data: {order.createdAt.split('T')[0]}</p>
                                <div className='relative'>Delivery: {order.payment?'completed':'pending'} {!order.payment && <div className='top-0 left-30 absolute bg-orange-600 rounded-full size-1.5 animate-ping'></div>}</div>
                                <div className='relative'>Payment: {order.payment?'completed':'pending'} {!order.payment && <div className='top-1 left-32 absolute bg-orange-600 rounded-full size-1.5 animate-ping'></div>}</div>
                            </div>
                        </div>
                        <div className='bg-[#AAAAAA] my-8 w-full h-0.5'></div>
                    </div>
                    ))}
      </div>
    </div>
  )
}

export default page
