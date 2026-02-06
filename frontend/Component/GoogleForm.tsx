
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
          if(responses.status === 200){
            Cookies.set("token", res.access_token, {
              expires: 1, // days
            });
          }
          router.push('/')
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
      <div className="w-full">
        <button onClick={()=>handleGoogleLogin()} className="flex items-center justify-center w-full gap-3 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold rounded-xl transition-all duration-200 shadow-sm hover:shadow-md">
            <div className="size-5"><Google/></div>
            <span>Continue with Google</span>
        </button>
      </div>
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default GoogleForm