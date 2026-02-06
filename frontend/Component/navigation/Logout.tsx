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
    <button onClick={logout} className="flex items-center px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition-colors font-medium">Logout</button>
   )
}

export default Logout
