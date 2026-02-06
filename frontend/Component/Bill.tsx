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
    <div className="flex flex-col">
      {/* Price Breakdown */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-slate-600">
          <span>Actual Price</span>
          <span className="line-through text-slate-400">₹ {actualPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Offer Price</span>
          <span>₹ {total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-green-600 font-medium">
          <span>Discount</span>
          <span>{discountPercent.toFixed(0)}%</span>
        </div>
        <div className="flex justify-between text-slate-600">
          <span>Tax (2%)</span>
          <span>₹ {tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="my-4 border-t border-gray-200 border-dashed"></div>

      {/* Final Summary */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg text-slate-800">Total Payable</span>
        <span className="font-bold text-lg text-slate-800">₹ {finalPrice.toFixed(2)}</span>
      </div>

      {youSave > 0 && (
        <div className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm font-medium mb-6 text-center border border-green-100">
          You will save ₹ {youSave.toFixed(2)} on this order
        </div>
      )}

      <OrderForm
        price={finalPrice}
        productName={productName}
        products={products}
      />
    </div>
  )
}

export default Bill
