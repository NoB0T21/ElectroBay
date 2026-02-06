'use client'

import { useState } from 'react'
import { Menu } from '../Icons'
import { AnimatePresence,motion } from 'framer-motion'
import Link from 'next/link'

const sidebar = () => {
  const [show,setShow] = useState<boolean>(false)
  const shops = ['Air Conditioner','Smart Home','Home appliances','Mobiles','Laptop','Television']
  const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
  return (
    <>
      <div onClick={()=>setShow(!show)} className='size-8 flex items-center justify-center cursor-pointer text-slate-700 hover:text-black transition-colors'>
        <Menu/>
      </div>

      <AnimatePresence initial={false}>
        {show && 
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='md:hidden absolute top-16 left-4 z-50 flex flex-col gap-2 bg-white shadow-2xl border border-gray-100 rounded-xl w-64 p-4 origin-top-left'
          >
            <div className='flex flex-col gap-2 w-full'>
              <p className='text-xs font-bold text-gray-400 uppercase tracking-wider mb-2'>Categories</p>
              {
                shops.map((shop,index)=>(
                  <Link href={links[index]} className='flex items-center px-3 py-2 text-slate-700 hover:bg-gray-100 hover:text-blue-600 rounded-lg transition-colors font-medium' key={index}>
                    {shop}
                  </Link>
              ))}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default sidebar
