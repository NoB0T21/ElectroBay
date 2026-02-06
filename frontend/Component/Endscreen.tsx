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
      className='bg-gray-100 shadow-inner mt-20 text-slate-800 rounded-t-3xl'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-20 py-12 font-medium'>
          <div className='flex flex-col items-start gap-3 p-4 w-full h-full'>
              <Image src='https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/toki/Untitled%20folder/20260101_222720.png' alt='Logo' width={160} height={60} className='h-10 w-auto object-contain mb-2'/>
              <p className='text-sm text-gray-600 leading-relaxed'>We bring you the latest in electronics, gadgets, and smart home solutions—all in one place.</p>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full '>
              <h1 className='font-bold text-xl text-black'>Shop</h1>
              <div className='flex flex-col gap-3 text-sm'>{shops.map((shop,index)=>(<p className='hover:text-blue-600 cursor-pointer transition-colors' key={index}>{shop}</p>))}</div>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full '>
              <h1 className='font-bold text-xl text-black'>Need Help?</h1>
              <div className='flex flex-col gap-3 text-sm'>{helps.map((help,index)=>(<p className='hover:text-blue-600 cursor-pointer transition-colors' key={index}>{help}</p>))}</div>
          </div>
          <div className='flex flex-col gap-6 p-4 w-full h-full'>
            <h1 className='font-bold text-xl text-black'>Contact</h1>
            <div className='flex flex-col gap-3 text-sm'>
              <p>123 Fifth Avenue, New York, NY 10160</p>
              <p>aryangawade65418@gmail.com</p>
              <p>929-242-6868</p>
            </div>
          </div>
        </div>
        <div className='bg-gray-200 w-full h-px'></div>
        <div className='px-6 lg:px-20 py-6 text-center text-sm text-gray-500'>© 2025 Electronic Store. Powered by Electronic Store</div>
    </motion.div >
  )
}

export default Endscreen
