import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import { Orderfill } from '@/Component/Icons'
import React from 'react'
import Commpletebtn from '@/Component/Btn/Commpletebtn'

interface Order{
    _id: string,
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
      const orders = await api.get('/product/adminorder/get',{
        withCredentials:true,
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
  return (
    <div className='p-2 md:p-10 py-5 w-full h-full overflow-y-scroll'>
        <h1 className='mb-5 text-2xl'>Orders</h1>
        {orders.data.orders.map((order:Order)=>(
          <div key={order._id}>
            <div  className='relative gap-2 grid grid-cols-1 md:grid-cols-4 bg-[#393E46] rounded-2xl w-full md:h-45'>
                <div className='relative flex items-center gap-3 px-1 md:px-3 py-2 w-full'>
                    <div className='flex items-center bg-[#FFD369] p-2 rounded-xl size-15 text-[#222831]'><Orderfill/></div>
                    <div className='peer w-full md:truncate'>{order.productName.map((names,index)=>(<p key={index}>{names}</p>))}</div>
                    <div className='hidden -bottom-40 z-10 absolute peer-hover:flex flex-col gap-2 bg-zinc-700 p-2 px-3 border-1 rounded-md w-80'>{order.productName.map((names,index)=>(<p key={index}>{names}</p>))}</div>
                </div>
                <div className='relative flex flex-col justify-center px-1 md:px-3 py-2'>
                    <div className='peer flex flex-col justify-center w-full md:truncate'>
                      <p>{order.Fullname}</p>
                      <p>{order.Address}</p>
                      <p>{order.City},{order.State}</p>
                      <p>{order.Pincode}</p>
                      <p>{order.PhoneNo}</p>
                    </div>
                    <div className='hidden -bottom-40 z-10 absolute peer-hover:flex flex-col gap-1 bg-zinc-700 p-2 px-3 border-1 rounded-md w-80'>
                      <p>{order.Fullname},</p>
                      <p>{order.Address},</p>
                      <p>{order.City},{order.State},</p>
                      <p>{order.Pincode}</p>
                      <p>{order.PhoneNo}</p>
                    </div>
                </div>
                <div className='flex items-center px-1 md:px-3 py-2'>₹ {order.price}</div>
                <div className='flex flex-col justify-center px-1 md:px-3 py-2'>
                    <p>Data: {order.createdAt.split('T')[0]}</p>
                    <div className='relative'>Payment: {order.payment?'completed':'pending'} {!order.payment && <div className='top-0 left-32 absolute bg-orange-600 rounded-full size-2 animate-ping'></div>}</div>
                    <div className='my-5 w-25'><Commpletebtn prodId={order._id}/></div>
                </div>
              {order.payment && <div className='absolute bg-[#1818184f] w-full h-full'></div>}
            </div>
            <div className='bg-[#AAAAAA] my-8 w-full h-0.5'></div>
          </div>
        ))}
    </div>
  )
}

export default page
