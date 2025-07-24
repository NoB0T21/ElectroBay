'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Endscreen = () => {
  const shops = ['Home appliances','Air conditioner','Audio & video','Hot Deals']
  const helps = ['About','Contact','Order tracking','FAQ!','return policy','privacy policy']
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.1 }}
      className='bg-[#393E46] mt-125 md:mt-10 rounded-t-2xl'>
        <div className='grid grid-cols-2 md:grid-cols-4 px-5 lg:px-25 py-4 font-semibold'>
          <div className='flex flex-col gap-3 p-4 w-full h-full'>
              <Image src='/Images/Logo.png' alt='Logo' width={500} height={500} className='flex size-12'/>
              <p className='text-[#AAAAAA]'>We bring you the latest in electronics, gadgets, and smart home solutions—all in one place.</p>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full text-[#EEEEEE]'>
              <h1 className='font-bold text-xl'>Shop</h1>
              <div className='flex flex-col gap-1'>{shops.map((shop,index)=>(<p className='font-medium' key={index}>{shop}</p>))}</div>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full text-[#EEEEEE]'>
              <h1 className='font-bold text-xl'>Need Help?</h1>
              <div className='flex flex-col gap-1'>{helps.map((help,index)=>(<p className='font-medium' key={index}>{help}</p>))}</div>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full'>
            <h1 className='font-bold text-[#AAAAAA] text-xl'>Contact</h1>
            <div className='flex flex-col gap-1 text-[#AAAAAA]'>
              <p>123 Fifth Avenue, New York, NY 10160</p>
              <p>contact@info.com</p>
              <p>929-242-6868</p>
            </div>
          </div>
        </div>
        <div className='bg-zinc-800 w-full h-0.5'></div>
        <div className='px-5 lg:px-25 py-10 text-[#AAAAAA]'>© 2025 Electronic Store. Powered by Electronic Store</div>
    </motion.div >
  )
}

export default Endscreen
