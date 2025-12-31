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
    <div className='flex lg:flex-row flex-col gap-4 px-2 overflow-y-scroll w-full'>
      {/* LEFT */}
      <div className='w-full lg:w-2/3'>
        <div className='flex justify-between items-center mt-10 mb-3'>
          <p className='text-3xl'>Your cart</p>
          <p className='text-2xl'>{totalQuantity} items</p>
        </div>

        <div className='bg-white my-5 h-0.5'></div>

        {/* HEADER */}
        <div className='hidden md:grid grid-cols-5 gap-2 font-bold text-xl'>
          <div className='col-span-2 px-3'>Product Name</div>
          <div className='px-3'>Price</div>
          <div className='px-3'>Quantity</div>
          <div className='px-3'>Subtotal</div>
        </div>

        {/* ITEMS */}
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
            <div key={product._id}>
              <div className='grid md:grid-cols-5 gap-2 border-b hover:bg-[#7e7e7e] p-2 my-3'>
                {/* PRODUCT */}
                <div className='col-span-2 flex items-center gap-3'>
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={120}
                    height={120}
                    style={{backgroundColor: product.images[0].background}}
                    className=' p-1 rounded-xl object-contain'
                  />
                  <p className='line-clamp-2'>{product.name}</p>
                </div>

                {/* PRICE */}
                <div className='flex flex-col text-xl justify-center'>
                  ₹ {product.offerprice} 
                  <p className='line-through text-sm'>₹ {product.price}</p>
                </div>

                {/* QUANTITY */}
                <div className='flex items-center gap-2'>
                  <button
                    className='bg-[#fc993a] ml-2 p-1 rounded-md size-6 text-[#222831] hover:scale-108 transition-(scale) duration-300 ease-in-out cursor-pointer'
                    onClick={() => removeFromCart(product._id)}
                  >
                    <Sub />
                  </button>

                  <span>{quantity}</span>

                  <div className='bg-[#fc993a] ml-2 p-1 rounded-md size-6 text-[#222831] hover:scale-108 transition-(scale) duration-300 ease-in-out cursor-pointer' onClick={()=>addToCart(product._id)}>
                    <Addc/>
                    </div>
                </div>

                {/* SUBTOTAL */}
                <div className='flex items-center'>
                  ₹ {quantity * product.offerprice}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* RIGHT */}
      <div className='w-full lg:w-1/3 py-20'>
        <Bill
          productName={productlist}
          products={cart?.cart.items}
          total={totalPrice}
          actualPrice={totalActualPrice}
        />
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default Cart
