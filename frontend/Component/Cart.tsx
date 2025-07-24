import Image from 'next/image'
import React from 'react'
import Incrementbtn from './Btn/Incrementbtn'
import Decrementbtn from './Btn/Decrementbtn'
import Bill from './Bill'

interface CartItem {
    product: string
    quantity: number
}

interface Product {
    _id: string
    name: string
    images: [{
        url:string
    }]
    offerprice: number
}

interface CartProps {
    cart: {
        items?: CartItem[]
        userId: string
    }
    products: Product[]
}

const Cart = ({cart}:{cart:CartProps}) => {
    let productlist:string[]= []
    let productId:string[]= []
    const totalQuantity = Array.isArray(cart.cart.items)
        ? cart.cart.items.reduce((sum, item) => sum + item.quantity, 0)
        : 0;

    const totalPrice = Array.isArray(cart.cart.items)
        ? cart.cart.items.reduce((total, item) => {
            const product = cart.products.find((p) => p._id === item.product);
            return product ? total + product.offerprice * item.quantity : total;
            }, 0)
        : 0;
    return (
        <div className='flex lg:flex-row flex-col gap-4 px-5 md:px-10 w-full'>
            <div className='w-full lg:w-2/3'>
                <div className='flex justify-between items-center mt-10 mb-3 pb-3 w-full h-16'>
                    <p className='text-3xl'>Your cart</p>
                    <p className='text-2xl'>{totalQuantity} items</p>
                </div>
                <div className='bg-white my-5 w-full h-0.5'></div>
                                <div className='hidden gap-2 md:grid grid-cols-1 md:grid-cols-5 w-full h-12'>
                                    <div className='col-span-2 px-3 font-bold text-xl'>Product Name</div>
                                    <div className='px-3 font-bold text-xl'>Price</div>
                                    <div className='px-3 font-bold text-xl'>Quantity</div>
                                    <div className='px-3 font-bold text-xl'>Subtotal</div>
                                </div>
                                {cart.products.reverse().map((order:Product)=>{
                                    const cartItem = cart.cart.items?.find(item => item.product === order._id);
                                if (!cartItem) return null;

                                const quantity = cartItem.quantity;
                                const url = order.images[0]?.url || '';

                                productlist.push(`${order.name} x ${quantity}`);
                                productId.push(order._id);
                                    return(
                                    <div key={order._id}>
                                        <div className='gap-2 grid grid-cols-1 md:grid-cols-5 bg-[#393E46] p-1 rounded-2xl w-full md:h-45'>
                                            <div className='relative flex items-center gap-3 col-span-2 px-1 md:px-3 py-2 w-full'>
                                                <Image className='bg-[#FFD369] p-2 rounded-xl w-40 h-22 object-contain'
                                                    src={url} width={500} height={500} alt='product'/>
                                                <div className='peer flex flex-col w-full md:truncate'>{order.name}</div>
                                                <div className='hidden -bottom-20 z-10 absolute peer-hover:flex flex-col gap-2 bg-zinc-700 p-2 px-3 border-1 rounded-md w-80'>{order.name}</div>
                                            </div>
                                            <div className='flex flex-col justify-center px-1 md:px-3 py-2'>
                                                <p>₹ {order.offerprice}</p>
                                            </div>
                                            <div className='flex items-center px-1 md:px-3 py-2'>
                                                <Decrementbtn productId={order._id}/> {quantity} <Incrementbtn productId={order._id}/>
                                            </div>
                                            <div className='flex flex-col justify-center px-1 md:px-3 py-2'>
                                                ₹ {quantity * order.offerprice}
                                            </div>
                                        </div>
                                        <div className='bg-[#AAAAAA] my-8 w-full h-0.5'></div>
                                    </div>
                                    )})}
            </div>
            <div className='py-20 w-full md:w-1/2 lg:w-1/3 h-full'>
                <Bill productName={productlist} productId={productId} total={totalPrice}/>
            </div>
        </div>
    )
}

export default Cart
