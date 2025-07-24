import React from 'react'
import Image from 'next/image'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col flex-1 lg:justify-center items-center p-4 lg:p-10 lg:px-70 py-10'>
        <div className='flex justify-center items-center gap-2'>
            <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki//20250724_152640.png' alt='Logo' width={1960} height={1080} className='mb-5 w-100 md:w-100 h-40 md:h-50'/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout