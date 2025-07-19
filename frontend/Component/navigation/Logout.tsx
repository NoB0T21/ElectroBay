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
    <button onClick={logout} className='flex justify-center items-center gap-2 bg-red-700 hover:bg-red-600 mx-2 p-1 px-2 rounded-full w-10 sm:w-25 h-10'><p className='hidden sm:flex'>Logout</p></button>
   )
}

export default Logout
