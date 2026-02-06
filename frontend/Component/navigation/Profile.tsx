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
      <div onClick={()=>setShow(!show)} className="cursor-pointer hover:opacity-80 transition-opacity">
        <Image className="rounded-full w-8 md:w-10 aspect-square object-cover border border-gray-200" src={picture || '/placeholder-user.jpg'} alt="profile" width={100} height={100}/>
      </div>
      <AnimatePresence initial={false}>
        {show && 
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className='absolute top-12 right-0 z-50 flex flex-col gap-1 bg-white shadow-xl border border-gray-100 rounded-lg w-32 md:w-40 p-2 text-sm font-medium text-gray-700 origin-top-right'
          >
            
            <Link href={'/'} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">Home</Link>
            <div className="h-px bg-gray-200 w-full my-0.5"></div>
            <Link href={'/myorder'} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">My Order</Link>
            <div className="h-px bg-gray-200 w-full my-0.5"></div>
            {isAdmin && <>
              <Link href={'/admin'} className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md transition-colors">Admin</Link>
              <div className="h-px bg-gray-200 w-full my-0.5"></div>
            </>}
            <div className="flex items-center w-full"><Logout/></div>

          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default Profile
