import Endscreen from '@/Component/Endscreen'
import Header from '@/Component/Header'
import Hook from '@/Component/Hook'
import Promotion from '@/Component/Promotion'
import Trending from '@/Component/Trending'
import React from 'react'
import MidLadder from '@/Component/MidLadder'
import { cookies, } from 'next/headers';
import { getHomeData } from '@/utils/actions/productsAction'

const page = async () => {
  const token = (await cookies()).get('token')?.value || ''
  const data = await getHomeData({token})
  return (
    <div className='min-h-screen w-full flex justify-center '>
      <div className='w-full max-w-[1440px] bg-white min-h-screen flex flex-col shadow-2xl overflow-hidden'>
        <Header/>
        <main className="flex-1 flex flex-col gap-12 sm:gap-16 py-8">
          <Trending data={data.sale1}/>
          <MidLadder products={data.products}/>
          <Promotion data={data.sale11}/>
          <Hook/>
        </main>
        <Endscreen/>
      </div>
    </div>
  )
}

export default page
