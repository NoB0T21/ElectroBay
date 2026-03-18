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
import { Store, Eye, EyeOff, ArrowRight, Mail, Lock, User, Phone, MapPin } from 'lucide-react';


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
  const [error, setError] = useState('');
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
    setError('')
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
        setError(
          errorMessages.name?.[0] ||
          errorMessages.email?.[0] ||
          errorMessages.password?.[0] ||
          errorMessages.confirm?.[0]
        )
      }
      if(type === 'sign-in'){
        setError(
          errorMessages.email?.[0] ||
          errorMessages.password?.[0] ||
          errorMessages.password?.[0]
        )
      }
      setLoading(false)
      return
    }

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
        })
        const raw = response.data.user;
        const user = {
          _id: raw._id,
          name: raw.name,
          email: raw.email,
          picture: raw.picture
        };
                
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(user));
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
    <div className="flex-1 flex w-full flex-col items-center justify-center px-6 py-12">
      <div className="bg-white rounded-2xl w-3/4 shadow-sm border border-gray-200 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-1 text-center">{type === 'sign-in' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="text-gray-500 text-sm mb-6 text-center">{type === 'sign-in' ? 'Enter your details to sign in' : 'Start your journey with us'}</p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {type === 'sign-up' && (        
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">Full Name*</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    name='name' 
                    type="text" 
                    value={formData.name} 
                    onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                    required 
                    placeholder="Name"
                    className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address*</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                name='email' 
                type="email" 
                value={formData.email} 
                onChange={(e) => {setFormData({...formData, email: e.target.value})}}
                required 
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">Password*</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                name='password' 
                type={show?'text':'password'} 
                value={formData.password} 
                onChange={(e) => {setFormData({...formData, password: e.target.value})}}
                required 
                placeholder="password"
                className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
              />
              <button 
                type="button"
                onClick={() =>setShow(!show)} 
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 text-xs font-bold uppercase tracking-wider transition-colors p-1'
              >
                { show ? 'Show':'hide' }
              </button>
            </div>
          </div>
          
          {type === 'sign-up' && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1.5">Conferm Password*</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  type={show?'text':'password'}  
                  value={formData.confirm} 
                  onChange={(e) => {setFormData({...formData, confirm: e.target.value})}}
                  required 
                  placeholder="conferm password"
                  className="w-full pl-10 pr-4 py-2.5 border text-black border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                />
              </div>
            </div>
          )}

          {type === 'sign-up' && (
            <div className="flex items-center gap-4 w-full">
              <label className="flex-1 w-20 cursor-pointer group">
                <div className={`flex items-center justify-center h-12 px-4 transition border-2 truncate border-dashed border-foreground rounded-xl ${file ? 'bg-blue-50 border-blue-300' : 'bg-gray-50 border-gray-200 group-hover:bg-blue-50 group-hover:border-blue-300'}`}>
                    <span className={`text-sm font-medium truncate ${file ? 'text-foreground' : 'text-gray-500 group-hover:text-blue-500'}`}>
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
            className="w-full py-2.5 bg-primary-600 text-black rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
          >
              {loading? <PulseLoader size={8} color="#492404"/> : <>{type === 'sign-in' ? 'Sign In' : 'Create Account'} <ArrowRight className="w-4 h-4" /></>}
          </button>
        </form>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm w-full">
        <span className="text-gray-500">{type == 'sign-in' ? "Don't have an account?" : "Already have an account?"}</span>
        <Link href={type == 'sign-in' ? '/sign-up' : '/sign-in'} className='font-semibold text-blue-600 hover:text-blue-700 hover:underline'>
            {type == 'sign-in' ? 'Sign Up' : 'Sign In'}
        </Link>
      </div>
      <div className="flex items-center w-full my-2">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-4 text-sm text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
      </div>
        
      <div className="w-3/4">
          <GoogleOAuthProvider clientId={googleID}>
              <GoogleForm/>
          </GoogleOAuthProvider>
      </div>
        
      {showToast && <Toasts type={tostType==='warningMsg'?'warningMsg':'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default AuthForm