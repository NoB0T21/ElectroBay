'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Visit } from './Icons'
import { Products } from '@/utils/types'
import { setProduct } from '@/utils/utils'

const AllProducts = ({ products }: { products: Products[] }) => {
  return (
    <div className="space-y-2">
        {products.map(p => {
          const imageUrl = p.images?.[0]?.url || '/placeholder.png'
          return(
            <div key={p._id} className="flex items-center justify-between p-3 rounded-lg border shadow-md border-border bg-card">
              <div className='flex gap-2'>
                <Image
                  src={imageUrl}
                  alt={p.name}
                  width={72}
                  height={72}
                  style={{ backgroundColor: '#c9a87c' }}
                  className='rounded-lg object-cover border border-gray-100'
                />
                <div>
                  <p className="font-semibold text-sm">{p.name}</p>
                  <p className="text-xs text-muted-foreground">type: {p.productType} · Stock:{p.stock} {
                    <div className='font-semibold text-muted'>
                      offer price: ₹{p.offerprice}
                      <p className='font-normal text-xs text-muted-foreground'>Actual: ₹{p.price}</p>
                    </div>}
                  </p>
                  <p className={`text-xs font-medium ${p.stock > 0 ? (p.stock < 5 ? 'text-orange-500' : 'text-green-500') : 'text-red-500'}`}>{p.stock > 0 ? p.stock<5 ? 'Low Stock' : 'In Stock' : 'Out of Stock'}</p>
                </div>
              </div>
              <div className='hidden md:flex gap-2 justify-end'>
                <Link
                  href={`/product-categor/${p._id}`}
                  className='flex items-center gap-1.5 bg-secondary/40 text-foreground px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-secondary/60 transition-colors'
                >
                  Visit
                  <span className='size-4'>
                    <Visit />
                  </span>
                </Link>
                <Link
                  onClick={() => setProduct({data:p})}
                  href={`/admin/product_edit/${p._id}`}
                  className='flex items-center gap-1 bg-primary/40 text-foreground px-3 py-1.5 text-sm font-medium rounded-lg hover:bg-primary/60 transition-colors'
                >
                  Edit
                  <span className='size-4'>
                    <Visit />
                  </span>
                </Link>
              </div>
            </div>
          )}
        )}
    </div>
  )
}

export default AllProducts