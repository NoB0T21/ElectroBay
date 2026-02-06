'use client'

import { userDetails } from '@/utils/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { User } from '@/utils/types'

interface Data {
  url: string
  background: string
  discount: number
}

const Trending = ({data}:{data:Data}) => {
  const [user, setUser] = useState<User | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(userDetails())
  }, [])

  if (!mounted) return <div className="w-full h-60 lg:h-80 bg-gray-100 animate-pulse rounded-xl mt-2"></div>

  return (
    <section className='w-full flex flex-col md:flex-row gap-6 md:gap-10 px-4 md:px-12 py-8 md:py-12 items-center justify-between bg-[#f3f9fb] rounded-3xl overflow-hidden mt-4 shadow-sm'>
      <div className='w-full md:w-1/2 flex flex-col gap-4 md:gap-6 z-10'>
        <h1 className='text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-tight'>
          Hi {user?.name ? <span className="text-blue-600">{user.name}</span> : 'there'}, <br/>
          <span className="text-slate-600 text-2xl md:text-4xl lg:text-5xl">What are you looking for Today?</span>
        </h1>
        <p className='text-lg md:text-2xl font-medium text-slate-500'>
          Check out this latest offer!
        </p>
        <button className="w-fit px-8 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors shadow-lg transform active:scale-95">
          Shop Now
        </button>
      </div>

      <div className='w-full md:w-1/2 h-64 md:h-96 relative flex justify-center items-center'>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full blur-3xl opacity-50 transform scale-75"></div>
        <Image
          className='w-auto h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500 z-10'
          src={data.url || 'https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/scatch/images/Purple%20and%20Orange%20Modern%20Wearable%20Tech%20Product%20Presentation.png'}
          alt='Trending'
          width={800}
          height={600}
          priority
        />
        <div 
          style={{background: data.background || '#f1a763'}}
          className='absolute right-0 bottom-0 md:right-10 md:bottom-10 size-24 md:size-32 rounded-full flex flex-col justify-center items-center text-white shadow-xl z-20 animate-bounce-slow hover:rotate-12 transition-transform cursor-pointer'
        >
          <span className="text-2xl md:text-4xl font-extrabold">{data.discount}%</span>
          <span className="text-xs md:text-sm font-bold uppercase">OFF</span>
        </div>
      </div>
    </section>
  )
}

export default Trending
