'use client';

import { useState } from "react";
import { z } from "zod";
import { PulseLoader } from "react-spinners";
import {api} from "../utils/api"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { useRouter } from "next/navigation";
import { convertFileToUrl } from "../utils/utils";
import Link from "next/link";
import Toasts from "./toasts/Toasts";
import GoogleForm from "./GoogleForm";
import Cookies from "js-cookie";
import Image from "next/image";


type FormType = 'sign-in' | 'sign-up'

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    email: z.string().email("plese enter valid email"),
    password: z.string().min(3,"length 3"),
    confirm: z.string()
}).refine((data) => data.password === data.confirm,{
    message:"Password does not match",
    path:["confirm"]
})

const signInSchema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(3, "Password must be at least 3 characters"),
});

const AuthForm = ({type}: {type: FormType}) => {
    const googleID = process.env.NEXT_PUBLIC_GOOGLE_ID || 'none'
    const [formData, setFormData] = useState<{
        name?: string;
        email?: string;
        picture?: string;
        password?: string;
        confirm?: string;
        file?: File
    }>({})
    const [error, setError] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirm?: string
    }>({})
    const router=useRouter()
    const [show,setShow] = useState(false)
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<File>()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setFormData({...formData, file: file})
        setShowToast(false)
        setLoading(true)
        let parserResult: any
        
        if(type === 'sign-up'){
            parserResult = formSchema.safeParse({
                name:formData.name,
                email: formData.email,
                password: formData.password,
                confirm: formData.confirm
            })
        }
        if(type === 'sign-in'){
            parserResult = signInSchema.safeParse({
                email: formData.email,
                password: formData.password
            })
        }

        if(!parserResult.success){
            const errorMessages = parserResult.error.flatten().fieldErrors
            if(type === 'sign-up'){
                setError({
                    name: errorMessages.name?.[0],
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.confirm?.[0]
                })
            }
            if(type === 'sign-in'){
                setError({
                    name: '',
                    email: errorMessages.email?.[0],
                    password: errorMessages.password?.[0],
                    confirm: errorMessages.password?.[0]
                })
            }

            setLoading(false)
            return
        }

        setError({
            name: '',
            email: '',
            password: '',
            confirm: ''
        })

        const form = new FormData();
            form.append('name', formData.name || '');
            form.append('email', formData.email || '');
            form.append('password', formData.password || '');
            form.append('confirm', formData.confirm || '');
            if (file) {
                form.append('file', file);
            }
        const form2 = new FormData();
            form2.append('email', formData.email || '');
            form2.append('password', formData.password || '');
        
        try {
            const response = await api.post(type === 'sign-in'? '/user/signin':'/user/signup',type === 'sign-in'? form2:form,{
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            })
    
            const token = response.data.token
            const raw = response.data.user;
            const user = {
                _id: raw._id,
                name: raw.name,
                email: raw.email,
                picture: raw.picture
            };
                    
            if (typeof window !== 'undefined') {
                Cookies.set('user', user._id, { expires: 1 });
                localStorage.setItem('user', JSON.stringify(user));
                Cookies.set('token', token, {
                    expires: 1,
                    sameSite: 'strict',
                    secure: true,
                });
            }
            router.push('/')
            setLoading(false)
        } catch (error:any) {
            setResponseMsg(error?.response?.data?.message||error?.message)
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
                }, 6000);
            return
        }

    }

  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-1 rounded-md w-full">
            {type === 'sign-up' && (
                <>
                    <div className="relative xl:w-2/3 w-1/2">
                        {error.name && <p className="mb-1 text-red-500 text-xs">{error.name}</p>}
                        <input name='name' type="text" value={formData.name} onChange={(e) => {setFormData({...formData, name: e.target.value})}}required 
                            className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>Name*</span>
                        </label>
                    </div>
                </>
            )}
            <div className="relative xl:w-2/3 w-1/2">
                {error.email && <p className="mb-1 text-red-500 text-xs">{error.email}</p>}
                <input name='email' type="email" value={formData.email} onChange={(e) => {setFormData({...formData, email: e.target.value})}}required 
                    className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Email*</span>
                </label>
            </div>
            <div className="relative xl:w-2/3 w-1/2">
                {error.password && <p className="mb-1 text-red-500 text-xs">{error.password}</p>}
                <input name='password' type={show?'text':'password'} value={formData.password} onChange={(e) => {setFormData({...formData, password: e.target.value})}}required 
                    className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Password*</span>
                </label>
                <div onClick={() =>setShow(!show)} className='right-4 z-1 absolute flex justify-end p-2 rounded-full text-gray-500 -translate-y-9'>
                    { show ? 'Show':'hide' }
                </div>
            </div>
            {type === 'sign-up' && (
                <>
                    <div className="relative xl:w-2/3 w-1/2">
                        {error.confirm && <p className="mb-1 text-red-500 text-xs">{error.confirm}</p>}
                        <input type={show?'text':'password'}  value={formData.confirm} onChange={(e) => {setFormData({...formData, confirm: e.target.value})}}required 
                            className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>Confirm</span>
                        </label>
                    </div>
                </>
            )}
            {type === 'sign-up' && (
                <>
                    <div className="flex gap-3 xl:w-2/3 w-1/2">
                        <div className="relative bg-[#ddebff] mt-2.5 shadow-xl/30 border border-zinc-700 text-gray-800 p-2 px-3 rounded-md w-auto h-10">Upload Profile pic<input className='left-0 absolute opacity-0 w-full' type='file' onChange={(e)=>{
                            const file = e.target.files?.[0];
                            if (file) {
                                setFile(file);
                            }}} name='file' accept="image/*" required placeholder='Upload'/></div>
                        {file && 
                        <div className="size-15">
                            <Image width={100} height={100} className="rounded-full h-full shadow-xl/30 object-cover" src={convertFileToUrl(file)} alt="Profile" />
                        </div>}
                    </div>
                </>
            )}
            <div className="flex justify-end xl:w-2/3 w-1/2 text-gray-700 text-shadow-lg">
                <p className="cursor-default">
                    {type == 'sign-in' ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Link href={type == 'sign-in' ? '/sign-up' : '/sign-in'} className=' text-blue-400 text-sm text-center hover:underline cursor-pointer'>
                    {type == 'sign-in' ? 'Sign Up' : 'Sign In'}
                </Link>
            </div>
            <div className="xl:w-2/3 w-1/2">
                {type === 'sign-up' && <button disabled={loading} type="submit" className="bg-[#3672d1] hover:bg-[#6599ee] p-2 rounded-md w-full font-semibold text-blue-50 align-middle shadow-xl/30 text-md">{loading? <PulseLoader size={10} color="#fff"/>:'Sign-up'}</button>}
                {type === 'sign-in' && <button disabled={loading} type="submit" className="bg-[#3672d1] hover:bg-[#6599ee] p-2 rounded-md w-full font-semibold text-blue-50 align-middle shadow-xl/30 text-md">{loading? <PulseLoader size={10} color="#fff"/>:'Sign-in'}</button>}
            </div>
        </form>
        <div className="flex text-gray-700 mb-2 xl:w-2/3 w-1/2 items-center gap-3">
            <div className="h-0.5 w-[45%] bg-gray-700"></div>
            <p className="text-md">or</p>
            <div className="h-0.5 w-[45%] bg-gray-700"></div>
        </div>
        <GoogleOAuthProvider clientId={googleID}>
            <GoogleForm/>
        </GoogleOAuthProvider>
        {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default AuthForm