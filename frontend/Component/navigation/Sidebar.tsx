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
      <div onClick={()=>setShow(!show)} className='size-8'>
        <Menu/>
      </div>

      <AnimatePresence initial={false}>
        {show && 
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='md:hidden top-18 left-5 z-10 absolute flex flex-col gap-5 shadow-xl backdrop-blur-xl p-3 border-[#AAAAAA] border-2 rounded-md w-50'
          >
            <div className='flex flex-col gap-3 px-5 w-full text-mb'>
              {
                shops.map((shop,index)=>(
                  <Link href={links[index]} className='pr-2 w-full font-medium' key={index}>
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
