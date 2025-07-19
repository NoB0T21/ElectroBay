'use client'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'

const Decrementbtn = ({productId}:{productId:string}) => {
  const route = useRouter()
    const token = Cookies.get('token')
    const addtocart = async () => {
          const res = await api.get(`/cart/remove1/${productId}`,{
            withCredentials:true,
            headers:{
              Authorization: `Bearer ${token}`,
            }
          })
          route.refresh()
        }
        
  return (
    <div className='cursor-pointer' onClick={()=>addtocart()}>
      --
    </div>
  )
}

export default Decrementbtn
