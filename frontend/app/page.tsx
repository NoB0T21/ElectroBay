import Endscreen from '@/Component/Endscreen'
import Header from '@/Component/Header'
import Hook from '@/Component/Hook'
import Promotion from '@/Component/Promotion'
import ShopCategories from '@/Component/ShopCategories'
import Header2 from '@/Component/navigation/Header2'
import Trending from '@/Component/Trending'
import React from 'react'

const page = () => {
  return (
    <div className='w-screen h-screen overflow-x-hidden scroll-smooth'>
      <Header/>
      <Header2/>
      <Trending/>
      <ShopCategories/>
      <Promotion/>
      <Hook/>
      <Endscreen/>
    </div>
  )
}

export default page
