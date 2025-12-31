import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import { Orderfill } from '@/Component/Icons'
import React from 'react'
import Commpletebtn from '@/Component/Btn/Commpletebtn'
import { Order, OrderStatus } from '@/utils/types'

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
            <div  className='relative gap-2 grid grid-cols-1 md:grid-cols-4 rounded-2xl w-full md:h-45 overflow-clip'>
                <div className='relative flex items-center gap-3 px-1 md:px-3 py-2 w-full'>
                    <div className='flex items-center bg-[#f58b27] p-2 rounded-xl size-15 text-white'><Orderfill/></div>
                    <div className='peer w-full md:truncate'>{order.productName.map((names,index)=>(<p key={index}>{names}</p>))}</div>
                    <div className='hidden -bottom-10 z-10 absolute peer-hover:flex flex-col gap-2 bg-zinc-500 text-white p-2 px-3 border rounded-md w-80'>{order.productName.map((names,index)=>(<p key={index}>{names}</p>))}</div>
                </div>
                <div className='relative flex flex-col justify-center px-1 md:px-3 py-2'>
                    <div className='peer flex flex-col justify-center w-full md:truncate'>
                      <p>{order.Fullname}</p>
                      <p>{order.Address}</p>
                      <p>{order.City},{order.State}</p>
                      <p>{order.Pincode}</p>
                      <p>{order.PhoneNo}</p>
                    </div>
                    <div className='hidden -bottom-40 z-10 absolute peer-hover:flex flex-col gap-1 bg-zinc-500 text-white p-2 px-3 border rounded-md w-80'>
                      <p>{order.Fullname},</p>
                      <p>{order.Address},</p>
                      <p>{order.City},{order.State},</p>
                      <p>{order.Pincode}</p>
                      <p>{order.PhoneNo}</p>
                    </div>
                </div>
                <div className='flex items-center px-1 md:px-3 py-2'>₹ {order.price}</div>
                <div className='flex flex-col gap-2 justify-center items-start px-1 md:px-3 py-2'>
                    <p className='px-2 py-0.5'>Data: {order.createdAt.split('T')[0]}</p>
                    <div className={`
                      ${order.status === OrderStatus.Processing && 'bg-[#cdeef0] text-[#2b5d67]'} 
                      ${order.status === OrderStatus.Shipped && 'bg-[#dae9fd] text-[#385baf]'} 
                      ${order.status === OrderStatus.OutForDelivery && 'bg-[#fee1b1] text-[#725743]'} 
                      ${order.status === OrderStatus.Delivered && 'bg-[#d4d4f8] text-[#757cc2]'} 
                      px-2 py-0.5 rounded-lg font-semibold shadow-xl/20`}
                    >Delivery: {order.status}</div>
                    <div className='relative px-2 py-0.5'>Payment: {order.payment?'completed':'pending'} {!order.payment && <div className='top-0 left-32 absolute bg-orange-600 rounded-full size-2 animate-ping'></div>}</div>
                    <div className='my-2 w-25'><Commpletebtn prodId={order._id}/></div>
                </div>
              {(order.payment && order.status === OrderStatus.Delivered) && <div className='absolute bg-[#1818184f] w-screen h-full'></div>}
            </div>
            <div className='bg-[#AAAAAA] my-8 w-full h-0.5'></div>
          </div>
        ))}
    </div>
  )
}

export default page
