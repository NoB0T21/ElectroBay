'use client'

import { useState } from 'react'
import { Menu } from '../Icons'
import { AnimatePresence,motion } from 'motion/react'

const sidebar = () => {
  const [show,setShow] = useState<boolean>(false)
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
            className='md:hidden top-18 left-0 z-10 absolute flex flex-col gap-5 bg-zinc-700 p-3 rounded-md w-1/3'
          >
            <div className='flex flex-col gap-2'>
              <div>Home appliances</div>
              <div>Air conditioner</div>
              <div>Audio & video</div>
            </div>
            <div className='flex flex-col gap-2'>
              <div>Cart</div>
              <div>Logout</div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </>
  )
}

export default sidebar
