import Header from '@/Component/Header'
import React from 'react'
import { cookies } from 'next/headers'
import { api } from '@/utils/api'
import { Orderfill } from '@/Component/Icons'
import { OrderStatus, PaymentMode } from '@/utils/types'

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
    status:OrderStatus,
    paymentmode: PaymentMode
}

const page = async () => {
    const token = (await cookies()).get('token')?.value
    let order
    try {
      order = await api.get('/product/order/get',{
          withCredentials:true,
          headers:{
            Authorization: `Bearer ${token}`,
        }
      })
    } catch (error:any) {
      if(error.response.status){
        console.log(error.response.status)
        return
      }
    }

  return (
    <div className='min-h-screen w-full flex justify-center bg-gray-50'>
      <div className='w-full max-w-[1440px] bg-white min-h-screen flex flex-col shadow-2xl overflow-x-hidden'>
        <Header/>
        <main className='flex-1 px-4 md:px-10 py-8 w-full'>
          <h1 className='text-3xl font-bold text-slate-800 mb-8'>My Orders</h1>
          
          <div className='hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider'>
              <div className='col-span-4'>Product</div>
              <div className='col-span-3'>Address</div>
              <div className='col-span-2'>Price</div>
              <div className='col-span-3'>Status</div>
          </div>

          <div className='flex flex-col gap-4 mt-4'>
          {order?.data.orders.map((order:Order)=>(
              <div key={order._id} className='bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden'>
                  <div className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center'>
                      
                      {/* Product Column */}
                      <div className='col-span-1 md:col-span-4 flex items-start gap-4'>
                          <div className='flex-shrink-0 bg-orange-50 text-orange-600 p-3 rounded-xl'>
                            <div className="size-6"><Orderfill/></div>
                          </div>
                          <div className='flex relative flex-col'>
                            <p className="text-xs text-gray-400 mb-1">Order ID: {order._id.slice(-6)}</p>
                            {order.productName.map((names,index)=>(
                              <>
                                <div key={index} className="font-medium text-slate-800 line-clamp-1 peer">
                                  {names}
                                </div>
                                <div className='p-1 absolute -right-20 w-80 bg-zinc-500 hidden peer-hover:flex'>{names}</div>
                              </>
                            ))}
                          </div>
                      </div>

                      {/* Address Column */}
                      <div className='col-span-1 md:col-span-3 flex flex-col text-sm text-slate-600'>
                          <p className="font-medium text-slate-800">{order.Fullname}</p>
                          <p>{order.Address}</p>
                          <p>{order.City}, {order.State} - {order.Pincode}</p>
                          <p className="text-xs text-gray-400 mt-1">{order.PhoneNo}</p>
                      </div>

                      {/* Price Column */}
                      <div className='col-span-1 md:col-span-2 font-bold text-slate-800'>
                        ₹ {order.price}
                      </div>

                      {/* Status Column */}
                      <div className='col-span-1 md:col-span-3 flex flex-col gap-2 items-start'>
                          <div className="text-xs text-gray-500">Ordered: {order.createdAt.split('T')[0]}</div>
                          
                          <div className={`
                            ${order.status === OrderStatus.Processing && 'bg-cyan-100 text-cyan-700 border border-cyan-300'} 
                            ${order.status === OrderStatus.Shipped && 'bg-blue-200 text-blue-700 border border-blue-300'} 
                            ${order.status === OrderStatus.OutForDelivery && 'bg-amber-200 text-amber-700 border border-amber-300'} 
                            ${order.status === OrderStatus.Delivered && 'bg-indigo-200 text-indigo-700 border border-indigo-300'} 
                            px-3 py-1 rounded-full text-xs font-semibold border`}
                          >
                            {order.status}
                          </div>

                          <div className='flex items-center gap-2 text-sm'>
                             <span className={order.payment ? 'text-green-600 font-medium' : 'text-orange-600 font-medium'}>
                                {order.payment ? 'Payment Completed' : 'Payment Pending'}
                             </span>
                             {!order.payment && <span className='relative flex h-2 w-2'>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                              </span>}
                          </div>
                      </div>
                  </div>
              </div>
            ))}
          </div>
          
          {!order?.data.orders.length && (
              <div className="text-center py-20 text-gray-500">
                  No orders found.
              </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default page
