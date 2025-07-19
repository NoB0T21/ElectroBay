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
        <div className='flex lg:flex-row flex-col gap-4 px-10 w-full'>
            <div className='w-2/3'>
                <div className='flex justify-between items-center mt-10 mb-3 pb-3 border-b-1 w-full h-16'>
                    <p className='text-3xl'>Your cart</p>
                    <p className='text-2xl'>{totalQuantity} items</p>
                </div>
                <table className='flex p-3 w-full'>
                    <tbody className='border-1 rounded-xl w-full'>
                        <tr className='w-full h-12'>
                            <td className='px-3 w-1/4 font-bold text-xl'>Product Name</td>
                            <td className='px-3 w-1/4 font-bold text-xl'>Price</td>
                            <td className='px-3 w-1/4 font-bold text-xl'>Quantity</td>
                            <td className='px-3 font-bold text-xl'>Subtotal</td>
                        </tr>
                        {
                            cart.products.map((product:Product, index)=>{
                                let url:string[] = [] 
                                let quantity:number = cart?.cart?.items[index]?.quantity
                                productlist.push(`${product.name} x ${quantity}`)
                                productId.push(`${product._id}`)
                                product.images.map((img, index)=>(url.push(product.images[index].url)))
                                return(
                                <tr key={index} className='border-t-1 w-full'>
                                    <td className='flex gap-3 px-3 py-2'>
                                        <Image className='bg-[#f5dfde] p-2 rounded-xl w-40 h-22 object-contain' src={url[3]} width={500} height={500} alt='product'/>
                                        <div className='px-1 py-2 w-full align-middle'>{product.name}</div>
                                    </td>
                                    <td className='px-3 py-2 w-1/4'>{product.offerprice} rs</td>
                                    <td className='px-3 py-2 pl-10 w-1/4'><Decrementbtn productId={product._id}/> {quantity} <Incrementbtn productId={product._id}/></td>
                                    <td className='px-3 py-2'>{(quantity)*(product.offerprice)}</td>
                                </tr>)
                            })
                        }
                    </tbody>
                </table>
            </div>
            <div className='py-20 w-1/3 h-full'>
                <Bill productName={productlist} productId={productId} total={totalPrice}/>
            </div>
        </div>
    )
}

export default Cart
