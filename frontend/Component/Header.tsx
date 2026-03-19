'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Profile from './navigation/Profile'
import Link from 'next/link'
import { Search, ShoppingCart, Van } from "lucide-react";
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Browse', path: '/product-categor/air-conditioner', icon: Search },
  { label: 'My Order', path: '/myorder', icon: Van },
]
const cartCount = localStorage.getItem('cart') || '0'

const path = ['/sign-up','/sign-in']
const Header = () => {
  const location = usePathname()
  if (path.includes(location)) return <div className='w-full h-16 md:h-20 shadow-sm'></div>
  else return (
    // {/* Header */}
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="px-5 py-1 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
        <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png' alt='Logo' width={160} height={60} className='h-8 md:h-10 w-auto object-contain' priority/>
          {/* <MapPin className="h-6 w-6 text-primary" />
          <span className="font-display text-xl font-bold text-foreground">LocalMarket</span> */}
        </Link>

        {/* Desktop nav — always visible */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${location === item.path || (location.split('/')[1]==='product-categor' && item.label==='Browse')
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-muted"}
              `}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex gap-2'>
          <Link href="/cart" className="relative p-2">
            <ShoppingCart className={`h-6 w-6 text-foreground transition-transform`} />
            {cartCount !== '0' && (
              <span className="absolute -top-0.5 -right-0.5 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <div className='flex'><Profile/></div>
        </div>
      </div>
    </header>
  )
}

export default Header
