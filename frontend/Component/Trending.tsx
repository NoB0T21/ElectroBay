'use client'

import { userDetails } from '@/utils/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { User } from '@/utils/types'

const Trending = () => {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(userDetails())
  }, [])

  if (!mounted) return null

  return (
    <section className='w-full h-60 lg:h-80 2xl:h-110 mt-2 flex gap-1'>
      <div className='w-[55%]'>
        <h1 className='text-[2.5rem] lg:text-[3.5rem] 2xl:text-[3.7rem] font-bold'>
          Hi {user?.name ?? ''}, What are you looking for Today?
        </h1>
        <p className='text-3xl font-semibold mt-10'>
          Check out this latest offer !!!
        </p>
      </div>

      <div className='w-[45%] h-full relative'>
        <Image
          className='w-full h-full object-cover'
          src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/scatch/images/Purple%20and%20Orange%20Modern%20Wearable%20Tech%20Product%20Presentation.png'
          alt='Trending'
          width={3840}
          height={2160}
        />
      </div>
    </section>
  )
}

export default Trending
