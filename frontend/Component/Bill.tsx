import React from 'react'
import OrderForm from './OrderForm'

interface CartItem {
    product: string
    quantity: number
}

interface BillProps {
  total: number
  actualPrice: number
  products: CartItem[]
  productName: string[]
}

const Bill = ({ total, actualPrice, products, productName }: BillProps) => {
  const tax = total * 0.02 // 2% tax
  const finalPrice = total + tax

  const discountPercent =
    actualPrice > 0
      ? ((actualPrice - total) / actualPrice) * 100
      : 0

  const youSave = actualPrice - total

  return (
    <>
      {/* Price Breakdown */}
      <div className="flex gap-2 px-5 pb-5 border-b w-full">
        <div className="flex flex-col gap-5 w-1/2">
          <p>Offer Price</p>
          <p>Actual Price</p>
          <p>Discount</p>
          <p>Tax (2%)</p>
        </div>

        <div className="flex flex-col items-end gap-5 w-1/2">
          <p>₹ {total.toFixed(2)}</p>
          <p>₹ {actualPrice.toFixed(2)}</p>
          <p>{discountPercent.toFixed(2)}%</p>
          <p>₹ {tax.toFixed(2)}</p>
        </div>
      </div>

      {/* Final Summary */}
      <div className="flex gap-2 mt-5 px-5 w-full">
        <div className="flex flex-col gap-5 w-1/2">
          <p>You Save</p>
          <p>Total Payable</p>
        </div>

        <div className="flex flex-col items-end gap-5 w-1/2">
          <p className="text-green-600 text-lg font-semibold">
            ₹ {youSave.toFixed(2)}
          </p>
          <p className="font-bold">
            ₹ {finalPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <br />
      <br />

      <OrderForm
        price={finalPrice}
        productName={productName}
        products={products}
      />
    </>
  )
}

export default Bill
