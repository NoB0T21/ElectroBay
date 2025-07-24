import Image from 'next/image'
import React from 'react'
import Sidebar from './navigation/Sidebar'
import Profile from './navigation/Profile'

const Header = async () => {
  return (
    <div className='flex justify-between items-center bg-[#222831] px-5 sm:px-12 md:px-20 w-full h-20 text-[#EEEEEE]'>
        <div className='flex justify-center items-center gap-3'>
          <div className='md:hidden flex'><Sidebar/></div>
          <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki//20250724_152640.png' alt='Logo' width={1960} height={1080} className='flex p-2 w-45 h-25'/>
        </div>
        <div className='flex gap-3'>
          <div className='flex'><Profile/></div>
        </div>
    </div>
  )
}

export default Header
