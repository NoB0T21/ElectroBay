import React from 'react'
import Image from 'next/image'
import LoginAnimation from '@/Component/animations/login_page_animation'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex min-h-screen justify-center items-center'>
      <div className=' min-w-[60%] max-w-250  h-full flex justify-center items-center text-blue-50'>
        <div className='hidden xl:flex gap-3 flex-col justify-between w-[50%] from-[#2668d3] from-60% to-[#ddebff] bg-linear-to-br p-8 rounded-3xl shadow-xl/30'>
          <h1 className='text-4xl font-bold'>
            Your one-stop destination for electronics & gadgets
          </h1>
          <p className='text-2xl h-12 mt-10'>Your one-stop destination for electronics & gadgets</p>
          <div className='relative min-h-70 lg:h-80'>
            <div className='absolute bottom-0 -left-8 xl:left-0 w-full overflow-y-none'>
              <LoginAnimation/>
            </div>
          </div>
        </div>
        <div className='flex flex-col flex-1 w-[50%] lg:justify-center items-center p-4'>
          <div className='flex justify-center items-center gap-2'>
              <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki//20250724_152640.png' alt='Logo' width={1960} height={1080} className='mb-5 w-100 md:w-100 h-40 md:h-50'/>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout