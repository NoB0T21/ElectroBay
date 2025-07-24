import Image from 'next/image'
import React from 'react'
import { Chat, CreditCard, Relode, Truck } from './Icons'

const Trending = () => {
  const icons = [<Truck/>,<Chat/>,<Relode/>,<CreditCard/>]
  const title = ['Free shipping','We are available 24/7','Satisfied or return','100% secure payments']
  const msgs = ['When you spend $80 or more','Need help? contact us anytime','Easy 30-day return policy','Visa, Mastercard, Stripe, PayPal']
  return (
    <section className='relative mb-100 xs:mb-65 sm:mb-20 w-full h-[50%] sm:h-[80%] xl:h-2/3'>
      <Image className='w-full h-full object-cover' src={'https://dsiwprmwzkvgdcdhzhwa.supabase.co/storage/v1/object/public/box//electronic-store-hero-image.jpg'} alt='Treanding' width={3840} height={2160}/>
      <div className='md:top-15 right-20 sm:right-0 md:right-20 lg:right-50 bottom-0 absolute flex flex-col justify-start gap-3 shadow-gray-900 shadow-xl backdrop-blur-sm p-3 sm:p-8 md:p-5 rounded-md w-3/4 sm:w-full md:w-90 h-70 sm:h-80 md:h-110 overflow-hidden'>
        <Image className='w-30 md:w-1/2 h-7' src={'/logoipsum-218.svg'} alt='Treanding' width={500} height={500}/>
        <div className='w-full font-bold text-zinc-700 text-2xl sm:text-5xl'>The best home entertainment system is here</div>
        <div className='text-zinc-700 text-xl'>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</div>
        <div className='flex justify-center items-center bg-blue-600 px-2 rounded-md w-23 h-10'>Shop Now</div>
      </div>
      <div className='-bottom-15 sm:absolute px-5 lg:px-25 py-1 w-full'>
        <div className='gap-5 grid grid-cols-2 lg:grid-cols-4 bg-[#393E46] shadow-gray-900 shadow-xl p-5 rounded-xl w-full h-full'>
          {icons.map((icon,index)=>(
            <div key={index} className='flex gap-5'>
              <div className='size-[30px] lg:size-9'>{icon}</div>
              <div className='w-1/2 sm:w-auto'>
                <p className='font-bold'>{title[index]}</p>
                <p className='text-sm'>{msgs[index]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trending
