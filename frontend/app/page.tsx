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
    <div className='w-screen h-screen flex items-center justify-center scroll-smooth'>
      <div className='w-full max-w-280 h-full px-4 overflow-x-hidden shadow-xl/30'>
        <Header/>
        <Trending data={data.sale1}/>
        <MidLadder products={data.products}/>
        <Promotion data={data.sale11}/>
        <Hook/>
        <Endscreen/>
      </div>
    </div>
  )
}

export default page
