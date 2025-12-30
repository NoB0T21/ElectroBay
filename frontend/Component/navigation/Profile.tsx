'use client'

import { AnimatePresence,motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import Logout from "./Logout"
import Link from "next/link"

const Profile = ({picture, admin}:{picture: string, admin?: string}) => {
  const [show,setShow] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(()=>{
      if(admin == 'admin@gmail.com'){
        setIsAdmin(true)
      }
  },[])
  
  return (
    <div className="relative flex items-center gap-3">
      <div onClick={()=>setShow(!show)} >
        <Image className="rounded-full h-full w-8 2xl:w-15 aspect-square mr-2" src={picture} alt="profile" width={100} height={100}/>
      </div>
      <AnimatePresence initial={false}>
        {show && 
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='top-10 2xl:top-20 -left-10 2xl:-left-22 z-10 absolute flex flex-col gap-1 bg-[#dbdada] shadow-xl/70 rounded-md w-18 2xl:w-35 px-1 py-1 text-[8px] lg:text-[10px] 2xl:text-[13px]'
          >
            
            <Link href={'/'} className="flex justify-center items-center hover:bg-[#3873d1] py-1 rounded-sm w-full h-full hover:text-white transition-all duration-300 ease-in-out">Home</Link>
            <div className="bg-gray-800 w-full h-0.5"></div>
            <Link href={'/myorder'} className="flex justify-center items-center hover:bg-[#3873d1] py-1 rounded-sm w-full h-full hover:text-white transition-all duration-300 ease-in-out">My Order</Link>
            <div className="bg-gray-800 w-full h-0.5"></div>
            {isAdmin && <>
              <Link href={'/admin'} className="flex justify-center items-center hover:bg-[#3873d1] py-1 rounded-sm w-full h-full hover:text-white transition-all duration-300 ease-in-out">Admin</Link>
              <div className="bg-gray-800 w-full h-0.5"></div>
            </>}
            <div className="flex justify-center items-center w-full h-full "><Logout/></div>

          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Profile
