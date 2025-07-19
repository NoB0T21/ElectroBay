import React from 'react'
import OrderForm from './OrderForm'

const Bill = ({total,productId,productName}:{total:number,productId:string[],productName:string[]}) => {
    return (
        <>
            <div className='flex gap-2 px-5 pb-5 border-b-1 w-full'>
                <div className='flex flex-col gap-5 w-1/2'>
                    <p>Price</p>
                    <p>Tax 2%</p>
                </div>
                <div className='flex flex-col items-end gap-5 w-1/2'>
                    <p>{total}</p>
                    <p>{2*(total/100)}</p>
                </div>
            </div>
            <div className='flex gap-2 mt-5 px-5 w-full'>
                <div className='flex flex-col gap-5 w-1/2'>
                    <p>Price</p>
                </div>
                <div className='flex flex-col items-end gap-5 w-1/2'>
                    <p>{total+(2*(total/100))}</p>
                </div>
            </div>
            <br/>
            <br/>
            <OrderForm price={total+(2*(total/100))} productName={productName} productId={productId}/>
        </>
    )
}

export default Bill
