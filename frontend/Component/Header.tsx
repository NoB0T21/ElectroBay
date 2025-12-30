import Image from 'next/image'
import React from 'react'
import Sidebar from './navigation/Sidebar'
import Profile from './navigation/Profile'
import Link from 'next/link'

const Header = async () => {
  return (
    <div className='flex justify-between items-center mt-2 px-5 w-full h-8 text-black'>
        <div className='flex justify-center items-center gap-3'>
          <div className='md:hidden flex'><Sidebar/></div>
          <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki//20250724_152640.png' alt='Logo' width={1960} height={1080} className='flex p-2 w-45 h-25'/>
        </div>
        <div className='flex items-center gap-3'>
          <Link href={'/cart'} className="flex justify-center items-center hover:bg-[#495367] py-1 rounded-sm w-full h-full">Cart</Link>
          <div className='flex'><Profile/></div>
        </div>
    </div>
  )
}

export default Header
