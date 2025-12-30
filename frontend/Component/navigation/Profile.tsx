'use client'

import { AnimatePresence,motion } from "framer-motion"
import { useEffect, useState } from "react"
import Image from "next/image"
import Logout from "./Logout"
import Link from "next/link"

const Profile = () => {
  const [userData, setUserData] = useState<{ name: string; picture: string } | null>(null)
  const [show,setShow] = useState(false)
  
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setUserData(JSON.parse(user))
    }
  }, [])
  if (!userData) return null
  
  return (
    <div className="relative flex items-center gap-3 h-full">
      <div onClick={()=>setShow(!show)} className="h-5 sm:h-10 xl:h-15 w-5 sm:w-10 xl:w-15">
        <Image className="rounded-full object-cover" src={userData.picture} alt="profile" width={100} height={100}/>
      </div>
        <AnimatePresence initial={false}>
            {show && 
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='top-14 -left-20 xl:-left-35 z-10 absolute bg-[#dbdada] flex flex-col gap-2 xl:gap-5 shadow-xl/70 py-1 xl:py-2 rounded-md w-30 xl:w-50 '
              >
                <div className='flex flex-col gap-2 px-1 xl:px-2 w-full text-mb'>
                  <Link href={'/'} className="flex text-xs xl:text-lg justify-center items-center hover:text-white hover:bg-[#3873d1] py-1 rounded-sm w-full h-full transition-all duration-300 ease-in-out">Home</Link>
                  <div className="bg-gray-800 w-full h-0.5"></div>
                  <Link href={'/myorder'} className="flex text-xs xl:text-lg justify-center items-center hover:text-white hover:bg-[#3873d1] py-1 rounded-sm w-full h-full transition-all duration-300 ease-in-out">My Order</Link>
                  <div className="bg-gray-800 w-full h-0.5"></div>
                  <div className="flex justify-center text-xs xl:text-lg items-center w-full h-full"><Logout/></div>
                </div>
              </motion.div>
            }
        </AnimatePresence>
    </div>
  )
}

export default Profile
