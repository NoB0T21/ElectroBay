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

  if (!mounted) return null
  return (
    <div className='flex justify-between items-center mt-2 w-full h-8 2xl:h-15 text-black'>
        <div className='flex justify-center items-center gap-3'>
          <div className='md:hidden flex'><Sidebar/></div>
          <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png' alt='Logo' width={1960} height={1080} className='flex h-full w-50 object-contain pr-8 py-8'/>
        </div>
        <div className='flex items-center gap-3'>
          <Link href={'/cart'} className="flex justify-center items-center text-black py-1 size-5 md:size-7 2xl:size-9"><Cart/></Link>
          <div className='flex'><Profile picture={user?.picture || ''} admin={user?.email}/></div>
        </div>
    </div>
  )
}

export default Header
