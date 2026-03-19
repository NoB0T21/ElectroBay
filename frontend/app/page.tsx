
import Hook from '@/Component/Hook'
import Promotion from '@/Component/Promotion'
import Trending from '@/Component/Trending'
import React from 'react'
import MidLadder from '@/Component/MidLadder'
import { cookies, } from 'next/headers';
import { getHomeData } from '@/utils/actions/productsAction'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '@/Component/Home/Hero'

const page = async () => {
  const token = (await cookies()).get('token')?.value || ''
  const data = await getHomeData({token})
  return (
    <div>
      <Hero/>
      <div className='w-full bg-background min-h-screen px-7 flex flex-col shadow-2xl overflow-hidden'>
        <main className="flex-1 flex flex-col gap-12 sm:gap-16 py-8">
          <Trending data={data.sale1}/>
          <MidLadder products={data.products}/>
          <Promotion data={data.sale11}/>
          <Hook/>
        </main>
      </div>
    </div>
  )
}

export default page
