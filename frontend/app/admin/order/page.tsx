import { api } from '@/utils/api'
import { cookies } from 'next/headers'
import { Orderfill } from '@/Component/Icons'
import React from 'react'
import Commpletebtn from '@/Component/Btn/Commpletebtn'
import { Order, OrderStatus } from '@/utils/types'

const page = async () => {
  const token = (await cookies()).get('token')?.value
  let orders = { data: { orders: [] } }
  try {
    orders = await api.get('/product/adminorder/get',{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
  } catch (error) {
    console.log(error)
  }

  if(!orders?.data?.orders?.length) {
    return (
      <div className='w-full'>
        <h1 className='text-2xl font-bold text-slate-800 mb-6'>Orders</h1>
        <div className='text-center py-20 text-gray-500'>No Orders Found</div>
      </div>
    )
  }

  return (
    <div className='w-full'>
        <h1 className='text-2xl font-bold text-slate-800 mb-6'>Orders</h1>
        
        <div className='hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider'>
            <div className='col-span-3'>Product</div>
            <div className='col-span-3'>Customer</div>
            <div className='col-span-2'>Price</div>
            <div className='col-span-4'>Status & Action</div>
        </div>

        <div className='flex flex-col gap-4 mt-4'>
        {orders.data.orders.map((order:Order)=>(
          <div key={order._id} className={`bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${order.status === OrderStatus.Delivered ? 'opacity-75' : ''}`}>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:p-6 items-center'>
                
                {/* Product */}
                <div className='col-span-1 md:col-span-3 flex items-start gap-4'>
                    <div className='flex-shrink-0 bg-orange-50 text-orange-600 p-3 rounded-xl'>
                        <div className="size-6"><Orderfill/></div>
                    </div>
                    <div className='flex flex-col'>
                        <p className="text-xs text-gray-400 mb-1">ID: {order._id.slice(-6)}</p>
                        {order.productName.map((names,index)=>(
                            <div key={index} className="font-medium text-slate-800 line-clamp-2" title={names}>{names}</div>
                        ))}
                    </div>
                </div>

                {/* Customer */}
                <div className='col-span-1 md:col-span-3 flex flex-col text-sm text-slate-600'>
                    <p className="font-medium text-slate-800">{order.Fullname}</p>
                    <p className="truncate" title={order.Address}>{order.Address}</p>
                    <p>{order.City}, {order.State} - {order.Pincode}</p>
                    <p className="text-xs text-gray-400 mt-1">{order.PhoneNo}</p>
                </div>

                {/* Price */}
                <div className='col-span-1 md:col-span-2 font-bold text-slate-800'>
                    ₹ {order.price}
                    <div className="text-xs font-normal text-gray-500 mt-1">{order.createdAt.split('T')[0]}</div>
                </div>

                {/* Status & Action */}
                <div className='col-span-1 md:col-span-4 flex flex-col gap-3'>
                    <div className='flex flex-wrap gap-2 items-center'>
                    <div className={`
                        ${order.status === OrderStatus.Processing && 'bg-cyan-50 text-cyan-700 border border-cyan-100'} 
                        ${order.status === OrderStatus.Shipped && 'bg-blue-50 text-blue-700 border border-blue-100'} 
                        ${order.status === OrderStatus.OutForDelivery && 'bg-amber-50 text-amber-700 border border-amber-100'} 
                        ${order.status === OrderStatus.Delivered && 'bg-indigo-50 text-indigo-700 border border-indigo-100'} 
                        px-3 py-1 rounded-full text-xs font-semibold border w-fit`}
                    >
                        {order.status}
                    </div>
                        
                        <div className='flex items-center gap-2 text-xs font-medium'>
                             <span className={order.payment ? 'text-green-600' : 'text-orange-600'}>
                                {order.payment ? 'Paid' : 'Pending'}
                             </span>
                             {!order.payment && <span className='relative flex h-2 w-2'>
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                              </span>}
                        </div>
                    </div>

                    <div className='w-full md:w-auto'>
                        <Commpletebtn prodId={order._id}/>
                    </div>
                </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default page
