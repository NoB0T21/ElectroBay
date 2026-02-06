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
                    expires: 1, // days
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
    <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-8 bg-white shadow-2xl rounded-2xl w-full border border-gray-100">
            <div className="text-center mb-2">
                <h1 className="text-2xl font-bold text-gray-800">{type === 'sign-in' ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="text-sm text-gray-500 mt-1">{type === 'sign-in' ? 'Enter your details to sign in' : 'Start your journey with us'}</p>
            </div>

            {type === 'sign-up' && (
                <div className="relative w-full">
                    {error.name && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.name}</p>}
                    <input 
                        name='name' 
                        type="text" 
                        value={formData.name} 
                        onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                        required 
                        placeholder=" "
                        className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                    <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-500 origin-[0]">
                        Full Name
                    </label>
                </div>
            )}
            
            <div className="relative w-full">
                {error.email && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.email}</p>}
                <input 
                    name='email' 
                    type="email" 
                    value={formData.email} 
                    onChange={(e) => {setFormData({...formData, email: e.target.value})}}
                    required 
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-500 origin-[0]">
                    Email Address
                </label>
            </div>

            <div className="relative w-full">
                {error.password && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.password}</p>}
                <input 
                    name='password' 
                    type={show?'text':'password'} 
                    value={formData.password} 
                    onChange={(e) => {setFormData({...formData, password: e.target.value})}}
                    required 
                    placeholder=" "
                    className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 pr-14"
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-500 origin-[0]">
                    Password
                </label>
                <button 
                    type="button"
                    onClick={() =>setShow(!show)} 
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 text-xs font-bold uppercase tracking-wider transition-colors p-1'
                >
                    { show ? 'Show':'hide' }
                </button>
            </div>

            {type === 'sign-up' && (
                <div className="relative w-full">
                    {error.confirm && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.confirm}</p>}
                    <input 
                        type={show?'text':'password'}  
                        value={formData.confirm} 
                        onChange={(e) => {setFormData({...formData, confirm: e.target.value})}}
                        required 
                        placeholder=" "
                        className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-gray-700 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    />
                    <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-focus:-translate-y-3 peer-focus:scale-75 peer-focus:text-blue-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:text-blue-500 origin-[0]">
                        Confirm Password
                    </label>
                </div>
            )}

            {type === 'sign-up' && (
                <div className="flex items-center gap-4 w-full">
                    <label className="flex-1 cursor-pointer group">
                        <div className={`flex items-center justify-center w-full h-12 px-4 transition border-2 border-dashed rounded-xl ${file ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-300'}`}>
                            <span className={`text-sm font-medium truncate ${file ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-500'}`}>
                                {file ? file.name : 'Upload Profile Picture'}
                            </span>
                        </div>
                        <input 
                            type='file' 
                            className="hidden"
                            onChange={(e)=>{
                                const file = e.target.files?.[0];
                                if (file) setFile(file);
                            }} 
                            name='file' 
                            accept="image/*" 
                        />
                    </label>
                    {file && 
                        <div className="relative size-12 shrink-0 rounded-full overflow-hidden shadow-sm border border-gray-200">
                            <Image width={100} height={100} className="object-cover w-full h-full" src={convertFileToUrl(file)} alt="Profile" />
                        </div>
                    }
                </div>
            )}

            <button 
                disabled={loading} 
                type="submit" 
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
            >
                {loading? <PulseLoader size={8} color="#fff"/> : (type === 'sign-in' ? 'Sign In' : 'Sign Up')}
            </button>

            <div className="flex items-center justify-center gap-2 text-sm w-full">
                <span className="text-gray-500">{type == 'sign-in' ? "Don't have an account?" : "Already have an account?"}</span>
                <Link href={type == 'sign-in' ? '/sign-up' : '/sign-in'} className='font-semibold text-blue-600 hover:text-blue-700 hover:underline'>
                    {type == 'sign-in' ? 'Sign Up' : 'Sign In'}
                </Link>
            </div>
        </form>

        <div className="flex items-center w-full my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="px-4 text-sm text-gray-400 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        
        <div className="w-full">
            <GoogleOAuthProvider clientId={googleID}>
                <GoogleForm/>
            </GoogleOAuthProvider>
        </div>
        
        {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default AuthForm