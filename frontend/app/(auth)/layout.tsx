import React from 'react'
import Image from 'next/image'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col flex-1 lg:justify-center items-center p-4 lg:p-10 lg:px-70 py-10'>
        <div className='flex justify-center items-center gap-2'>
            <Image src='/Images/Logo.png' alt='Logo' width={500} height={500} className='mb-5 size-40 md:size-50'/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout