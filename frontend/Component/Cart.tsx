'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import Bill from './Bill'
import { Addc, Sub } from './Icons'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { Products } from '@/utils/types'
import Toasts from './toasts/Toasts'

interface CartItem {
    product: string
    quantity: number
}

interface CartProps {
    cart: {
        items: CartItem[]
        userId: string
    }
    products: Products[]
}

interface CartComponentProps {
    carts: CartProps
}

const Cart = ({ carts }: CartComponentProps) => {
    const token = Cookies.get('token')
    const [cart, setCart] = useState<CartProps>(carts)
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')

    if (!carts) {
      return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center">
          <h2 className="text-3xl font-semibold mt-4">Your cart is empty</h2>
          <p className="text-gray-400 mt-2">
            Add products to your cart to see them here.
          </p>
        </div>
      )
    }

    const totalQuantity = cart.cart.items?.reduce(
        (sum, item) => sum + item.quantity,
        0
    ) || 0

    const totalPrice = cart.cart.items?.reduce((total, item) => {
        const product = cart.products.find(p => p._id === item.product)
        return product ? total + product.offerprice * item.quantity : total
    }, 0) || 0

    const totalActualPrice = cart.cart.items?.reduce((total, item) => {
        const product = cart.products.find(p => p._id === item.product)
        return product ? total + product.price * item.quantity : total
    }, 0) || 0

    const productlist: string[] = []
    const productId: string[] = []

    const removeFromCart = async (productid: string) => {
        try {
        const res = await api.get(`/cart/remove1/${productid}`, {
            withCredentials: true,
            headers: {
            Authorization: `Bearer ${token}`,
            },
        })

        if (res.status === 200) {
            setCart(prev => {
            const items = prev.cart.items ?? []

            const updatedItems = items.reduce<CartItem[]>((acc, item) => {
                if (item.product === productid) {
                if (item.quantity > 1) {
                    acc.push({ ...item, quantity: item.quantity - 1 })
                }
                } else {
                    acc.push(item)
                }
                return acc
            }, [])

            return {
                ...prev,
                cart: {
                ...prev.cart,
                items: updatedItems,
                },
            }
            })
        }
        } catch (error) {
            console.error('Remove from cart failed', error)
        }
    }

    const addToCart = async (productid: string) => {
        try {
            const res = await api.get(`/cart/${productid}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.status === 200) {
                setCart(prev => {
                    const items = prev.cart.items ?? []
                    let found = false

                    const updatedItems = items.map(item => {
                        if (item.product === productid) {
                            found = true
                            return { ...item, quantity: item.quantity + 1 }
                        }
                        return item
                    })

                    if (!found) {
                        updatedItems.push({ product: productid, quantity: 1 })
                    }

                    return {
                        ...prev,
                        cart: {
                            ...prev.cart,
                            items: updatedItems,
                        },
                    }
                })
            }
        } catch (error:any) {
        setResponseMsg(error?.response?.data?.message||error?.message)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
            }, 3000);
        return
    }
    }

  return (
    <div className='flex flex-col lg:flex-row gap-8 px-4 md:px-8 py-8 w-full max-w-[1440px] mx-auto'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3 flex flex-col gap-6'>
        <div className='flex justify-between items-end border-b border-gray-200 pb-4'>
          <h1 className='text-3xl font-bold text-slate-800'>Your Cart</h1>
          <p className='text-lg text-slate-600 font-medium'>{totalQuantity} Items</p>
        </div>

        {/* HEADER */}
        <div className='hidden md:grid grid-cols-5 gap-4 text-sm font-semibold text-gray-500 uppercase tracking-wider pb-2'>
          <div className='col-span-2'>Product</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Subtotal</div>
        </div>

        {/* ITEMS */}
        <div className='flex flex-col gap-4'>
        {[...cart.products].reverse().map(product => {
          const cartItem = cart.cart.items?.find(
            item => item.product === product._id
          )
          if (!cartItem) return null

          const quantity = cartItem.quantity
          const imageUrl = product.images?.[0]?.url || '/placeholder.png'

          productlist.push(`${product.name} x ${quantity}`)
          productId.push(product._id)

          return (
            <div key={product._id} className='bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200'>
              <div className='grid grid-cols-1 md:grid-cols-5 gap-4 p-4 items-center'>
                {/* PRODUCT */}
                <div className='col-span-1 md:col-span-2 flex items-center gap-4'>
                  <div className='relative w-20 h-20 flex-shrink-0 rounded-lg p-2' style={{backgroundColor: product.images?.[0]?.background || '#f3f4f6'}}>
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className='object-contain mix-blend-multiply'
                      />
                  </div>
                  <div className='flex flex-col'>
                      <p className='font-medium text-slate-800 line-clamp-2'>{product.name}</p>
                      <p className='text-xs text-gray-500 md:hidden'>Unit Price: ₹{product.offerprice}</p>
                  </div>
                </div>

                {/* PRICE - Desktop */}
                <div className='hidden md:flex flex-col'>
                  <span className='font-medium text-slate-800'>₹ {product.offerprice}</span>
                  {product.price > product.offerprice && (
                      <span className='line-through text-xs text-gray-400'>₹ {product.price}</span>
                  )}
                </div>

                {/* QUANTITY */}
                <div className='flex items-center justify-between md:justify-start gap-4 md:gap-2 w-full md:w-auto mt-2 md:mt-0 border-t md:border-0 border-gray-100 pt-3 md:pt-0'>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button
                        className='p-1 rounded-md hover:bg-white hover:shadow-sm text-slate-600 transition-all'
                        onClick={() => removeFromCart(product._id)}
                      >
                        <div className="size-4"><Sub /></div>
                      </button>

                      <span className='font-semibold text-slate-800 w-4 text-center'>{quantity}</span>

                      <button 
                        className='p-1 rounded-md hover:bg-white hover:shadow-sm text-slate-600 transition-all' 
                        onClick={()=>addToCart(product._id)}
                      >
                        <div className="size-4"><Addc/></div>
                      </button>
                  </div>
                  
                  {/* Mobile Subtotal */}
                  <div className='md:hidden font-bold text-slate-800'>
                      ₹ {quantity * product.offerprice}
                  </div>
                </div>

                {/* SUBTOTAL - Desktop */}
                <div className='hidden md:block font-bold text-slate-800'>
                  ₹ {quantity * product.offerprice}
                </div>
              </div>
            </div>
          )
        })}
        </div>
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3'>
        <div className='bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24'>
            <h2 className='text-xl font-bold text-slate-800 mb-6'>Order Summary</h2>
            <Bill
            productName={productlist}
            products={cart?.cart.items}
            total={totalPrice}
            actualPrice={totalActualPrice}
            />
        </div>
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default Cart
