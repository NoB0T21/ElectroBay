'use client'

import { useRouter } from 'next/navigation'
import Cookie from 'js-cookie'

const Logout = () => {
   const router= useRouter()

    const logout = () => {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      Cookie.remove('token')
      Cookie.remove('user')
      router.push('/sign-up')
    }

   return (
    <button onClick={logout} className="flex justify-center items-center hover:bg-[#a43030] py-1 rounded-sm w-full h-full"><p>Logout</p></button>
   )
}

export default Logout
