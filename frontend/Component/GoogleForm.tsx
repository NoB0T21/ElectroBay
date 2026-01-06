
import { useGoogleLogin } from "@react-oauth/google"
import { useState } from "react"
import { Google } from "./Icons";
import { useRouter } from "next/navigation";
import { api } from "@/utils/api";
import axios from "axios"
import Toasts from "./toasts/Toasts";
import Cookies from "js-cookie";

const GoogleForm = () => {
  const router=useRouter()
  const [showToast,setShowToast] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [tostType,setTostType] = useState('warningMsg')

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async(res) => {
      setShowToast(false)
      
      try {
        const responses = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo',{
          headers:{
            Authorization: `Bearer ${res.access_token}`,
          }
        })
        if(responses.status === 200){
          Cookies.set("token", res.access_token, {
            expires: 1, 
          });
        }

        const form = new FormData();
          form.append('name', responses.data.name || '');
          form.append('email', responses.data.email || '');
          form.append('password',responses.data.sub || '');
          form.append('picture', responses.data.picture || '');
          form.append('type','hello')

        const response = await api.post(`/user/signup`,form,{withCredentials: true})
          setResponseMsg(response.data.message)
          setShowToast(true)
          
        const raw = response.data.user;
          const user = {
            _id: raw._id,
            name: raw.name,
            email: raw.email,
            picture: raw.picture
          }
          if (typeof window !== 'undefined') {
            Cookies.set('user', user._id, { expires: 1 });
            localStorage.setItem('user', JSON.stringify(user));
          }
          router.push('/')
          return
      } catch (error:any) {
          setResponseMsg(error?.response?.data || error?.message)
          setTostType('warningMsg');
          setShowToast(true)
          setTimeout(() => {
          setShowToast(false)
        }, 6000);
        return
      }
    },

    onError: () => {
      setResponseMsg('Login Failed')
      setTostType('warningMsg');
      setShowToast(true)
      setTimeout(() => {
        setShowToast(false)
      }, 6000);
      return
    }
  })

  return (
    <>
      <div className="xl:w-2/3 w-1/2">
        <button onClick={()=>handleGoogleLogin()} className="bg-[#3672d1] hover:bg-[#6599ee] p-2 rounded-md w-full font-semibold text-blue-50 text-md"><div className="flex justify-center gap-2 w-full h-6"><Google/>Google</div></button>
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default GoogleForm