'use client'
import Cookies from 'js-cookie'
import { api } from '@/utils/api'
import { useRouter } from 'next/navigation'
import { Addc } from '../Icons'
const Incrementbtn = ({productId}:{productId:string}) => {
  const route = useRouter()
  const token = Cookies.get('token')
  const addtocart = async () => {
    const res = await api.get(`/cart/${productId}`,{
      withCredentials:true,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
    route.refresh()
  }
        
  return (
    <div className='bg-[#FFD369] ml-2 p-1 rounded-md size-6 text-[#222831] hover:scale-108 transition-(scale) duration-300 ease-in-out cursor-pointer' onClick={()=>addtocart()}>
      <Addc/>
    </div>
  )
}

export default Incrementbtn
