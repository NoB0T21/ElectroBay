'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Sidebar from './navigation/Sidebar'
import Profile from './navigation/Profile'
import Link from 'next/link'
import { Cart } from './Icons'
import { userDetails } from '@/utils/utils'
import { User } from '@/utils/types'

const Header = () => {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(userDetails())
  }, [])

  if (!mounted) return <div className='w-full h-16 md:h-20 bg-white shadow-sm'></div>
  return (
    <header className='sticky top-0 z-40 flex justify-between items-center px-4 md:px-8 w-full h-16 md:h-20 bg-white/90 backdrop-blur-md shadow-sm text-slate-800 transition-all duration-300'>
        <div className='flex items-center gap-4 h-full'>
          <div className='md:hidden flex'><Sidebar/></div>
          <Link href="/" className='h-full flex items-center'>
            <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png' alt='Logo' width={160} height={60} className='h-8 md:h-10 w-auto object-contain' priority/>
          </Link>
        </div>
        <div className='flex items-center gap-4 md:gap-6'>
          <Link href={'/cart'} className="flex justify-center items-center text-slate-700 hover:text-blue-600 transition-colors p-2 rounded-full hover:bg-gray-100">
            <div className="size-6 md:size-7"><Cart/></div>
          </Link>
          <div className='flex'><Profile picture={user?.picture || ''} admin={user?.email}/></div>
        </div>
    </header>
  )
}

export default Header
