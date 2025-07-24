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
      <Image onClick={()=>setShow(!show)} className="rounded-full size-12 object-cover" src={userData.picture} alt="profile" width={200} height={200}/>
        <p className="w-15 font-semibold truncate">{userData.name}</p>
        <AnimatePresence initial={false}>
            {show && 
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className='top-14 -left-35 z-10 absolute flex flex-col gap-5 bg-[#393E46] shadow-gray-900 shadow-lg py-3 rounded-md w-50'
              >
                <div className='flex flex-col gap-2 px-3 w-full text-mb'>
                  <Link href={'/'} className="flex justify-center items-center hover:bg-[#495367] py-1 rounded-sm w-full h-full">Home</Link>
                  <div className="bg-[#AAAAAA] w-full h-0.5"></div>
                  <Link href={'/cart'} className="flex justify-center items-center hover:bg-[#495367] py-1 rounded-sm w-full h-full">Cart</Link>
                  <div className="bg-[#AAAAAA] w-full h-0.5"></div>
                  <Link href={'/myorder'} className="flex justify-center items-center hover:bg-[#495367] py-1 rounded-sm w-full h-full">My Order</Link>
                  <div className="bg-[#AAAAAA] w-full h-0.5"></div>
                  <div className="flex justify-center items-center w-full h-full"><Logout/></div>
                </div>
              </motion.div>
            }
        </AnimatePresence>
    </div>
  )
}

export default Profile
