'use client'
import { Products } from '@/utils/types'
import { setProduct } from '@/utils/utils'
import { motion } from 'framer-motion'
import { Pin, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const colors = ['#cfb99f', '#d4b896', '#cbad85', '#c9a87c', '#937255', '#947050'];

const ProductCard = ({product,index}:{product:Products,index:string}) => {
  const colorIndex = parseInt(index) % colors.length;
  const MotionLink = motion.create(Link)
  return (
    <MotionLink
      href={`/product-categor/${product._id}`}
      className="group rounded-lg border border-border bg-card overflow-hidden shadow-card hover:shadow-lift transition-shadow"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="aspect-square relative h-1/2 w-full"
        style={{ backgroundColor: colors[colorIndex] }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-4xl font-display">
          <Image 
            className='object-contain w-full h-full overflow-clip'
            style={{ backgroundColor: colors[colorIndex]}}
            width={720} 
            height={720} 
            alt='product' 
            src={product.images?.[0]?.url}
          />
        </div>
        <p className={`absolute top-2 left-2 ${
          product?.stock && product?.stock > 0 ? 
          product.stock <= 8 ? 'bg-warning text-black'
          : 'bg-success text-black' 
          : 'bg-red-300 text-white'
        } text-xs font-semibold px-2 py-1 rounded-full`}>
          {product?.stock && product?.stock > 0 ?
          product.stock <= 8 ?
            'Few Stock Left'
            : 'In Stock'
            : 'Out of Stock'
          }
        </p>
      </div>

      <div className="p-4 flex flex-col h-1/2 items-start justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{product.productType}</p>
          <h3 className="font-display font-semibold text-sm leading-tight mb-1">{product.name}</h3>
          <p className="text-base font-bold text-foreground mb-3">${product.offerprice.toFixed(2)}</p>
        </div>
        <button
          // onClick={handleAdd}
          className="w-full bg-accent/70 px-3 py-1 rounded-md flex items-center justify-center gap-2"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </MotionLink>
  )
}

export default ProductCard