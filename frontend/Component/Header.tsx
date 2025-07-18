import Image from 'next/image'
import React from 'react'
import CartBtn from './CartBtn'
import Sidebar from './navigation/Sidebar'

const Header = () => {
  return (
    <div className='flex justify-between items-center bg-indigo-600 px-10 xl:px-80 w-full h-20'>
        <div className='flex justify-center items-center gap-3'>
          <div className='md:hidden flex'><Sidebar/></div>
          <Image src='/Images/Logo.png' alt='Logo' width={500} height={500} className='flex size-12'/>
        </div>
        <div className='flex gap-3'>
          Search
          <div className='md:hidden flex'><CartBtn/></div>
        </div>
    </div>
  )
}

export default Header
