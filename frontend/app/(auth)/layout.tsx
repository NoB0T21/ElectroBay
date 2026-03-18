import React from 'react'
import Image from 'next/image'
import LoginAnimation from '@/Component/animations/login_page_animation'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='min-h-screen flex'>
      <div className="hidden lg:flex lg:w-1/2 bg-background flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-96 h-96 -top-20 -left-20 bg-secondary rounded-full" />
          <div className="absolute w-72 h-72 bottom-10 right-10 bg-secondary rounded-full" />
          <div className="absolute w-48 h-48 top-1/2 left-1/3 bg-secondary rounded-full" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            {/* <div className="w-12 h-12 bg-red-300 backdrop-blur rounded-2xl flex items-center justify-center">
              <Store className="w-7 h-7" />
            </div> */}
            <div>
              <h1 className="text-4xl text-foreground font-bold">ElectroBay</h1>
              <p className="text-primary-200 text-sm">Local E-com WebApp</p>
            </div>
          </div>
          <h2 className="text-4xl text-foreground font-bold leading-tight mb-4">
            Your one-stop destination for electronics &<br/> gadgets
          </h2>
          <p className="text-primary-100 text-lg leading-relaxed max-w-md">
            Your one-stop destination for electronics & gadgets⚙️⚙️
          </p>
          <div className="mt-10 grid grid-cols-3 gap-6">
            <div className="bg-primary/18 backdrop-blur/70 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-xs text-primary-200 mt-1">Active Buyers</div>
            </div>
            <div className="bg-primary/18 backdrop-blur/70 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold">2.5K+</div>
              <div className="text-xs text-primary-200 mt-1">Verified Products</div>
            </div>
          </div>
        </div>
        <div className='absolute bottom-20 left-10 w-full overflow-y-none'>
          <LoginAnimation/>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 bg-topaz-warm-gray/15">
        <div className='flex justify-center items-center gap-2'>
            <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png' alt='Logo' width={1960} height={1080} className='mb-5 w-100 md:w-100 h-40 md:h-40 object-contain'/>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout