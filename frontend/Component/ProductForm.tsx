'use client';


import { z } from "zod";
import {api} from "../utils/api"
import { convertFileToUrl } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { Imgs } from "./Icons";
import { useState } from 'react'
import Image from 'next/image';
import Toasts from './toasts/Toasts';

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    description: z.string().min(5, "Description required"),
    category: z.string().min(1, "Please select category"),
    price: z.string().min(1,"should have some value")
})

const ProductForm = () => {
    const num = [1,2,3,4,5]
    const [formData, setFormData] = useState<{
        name?: string;
        description?: string;
        category?: string;
        price?: string;
        offerprice?: string;
        file?: File | null
    }>({})
    const [error, setError] = useState<{
        name?: string;
        description?: string;
        category?: string;
        price?: string;
        offerprice?: string;
        file?: string
    }>({})
    const router=useRouter()
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<(File | null)[]>([])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowToast(false)
        setLoading(true)
        let parserResult: any
        
        parserResult = formSchema.safeParse({
            name:formData.name,
            description: formData.description,
            category: formData.category,
            price: formData.price,
            offerprice: formData.offerprice,
            file: formData.file
        })
        

        if(!parserResult.success){
            const errorMessages = parserResult.error.flatten().fieldErrors
                setError({
                    name: errorMessages.name?.[0],
                    description: errorMessages.description?.[0],
                    category: errorMessages.category?.[0],
                    price: errorMessages.price?.[0],
                    offerprice: errorMessages.offerprice?.[0],
                    file: errorMessages.file?.[0]
                })

            setLoading(false)
            return
        }

        setError({
            name: '',
            description: '',
            category: '',
            price: '',
            offerprice: '',
            file: ''
        })

        const form = new FormData();
            form.append('name', formData.name || '');
            form.append('description', formData.description || '');
            form.append('productType', formData.category || '');
            form.append('price', formData.price || '');
            form.append('offerprice', formData.offerprice || '');
            file.forEach(f => {
                if (f) form.append('file', f); // same key for all
            });

        const response = await api.post('/product/Add',form,{
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        })

        if(response.status !== 201){
            setResponseMsg(response.data.message)
            if(response.status === 202)setTostType('infoMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 3000);
            return
        }
        if(response.status === 201){
            setTostType('successMsg')
            setResponseMsg(response.data.message)
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 3000);
        }
        router.push('/admin/product-list')
        setLoading(false)
    }

  return (
    <>
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-1 rounded-md w-full lg:w-140">
            <div className="gap-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 w-full">
                { 
                    num.map((nu,index)=>(
                        <div key={nu} className="size-16 md:size-20">
                            <div className="relative flex justify-center items-center p-2 px-3 border-2 rounded-xl w-full h-full">
                                {!file[index] && <Imgs/>}
                                <input className='left-0 z-1 absolute opacity-0 w-full' 
                                    type='file' 
                                    onChange={(e) => {
                                        const newFiles = [...file];
                                        newFiles[index] = e.target.files?.[0] || null;
                                        setFile(newFiles);
                                    }}
                                    name='file' 
                                    accept="image/*" 
                                    required 
                                    placeholder='Upload'
                                />
                                {file[index] && 
                                    <div className="top-0 right-0 absolute flex justify-center items-center p-2 size-15 md:size-20">
                                        <Image width={100} height={100} className="w-full h-full object-contain" src={convertFileToUrl(file[index])} alt="Profile" />
                                    </div>
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className="relative w-full">
                {error.name && <p className="mb-1 text-red-500 text-xs">{error.name}</p>}
                <input 
                    onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                    name='product name' 
                    type="text" 
                    value={formData.name} 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-[#FFD369] rounded-md outline-none w-full h-10 text-[#EEEEEE] transition-all duration-200"
                    required 
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-[#AAAAAA] peer-focus:text-[#FFD369] peer-valid:text-[#FFD369] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Product Name*</span>
                </label>
            </div>
            <div className="relative w-full">
                {error.description && <p className="mb-1 text-red-500 text-xs">{error.description}</p>}
                <textarea name='description' value={formData.description} onChange={(e) => {setFormData({...formData, description: e.target.value})}} required 
                    className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-[#FFD369] rounded-md outline-none w-full h-30 text-[#EEEEEE] transition-all duration-200"
                />
                <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-[#AAAAAA] peer-focus:text-[#FFD369] peer-valid:text-[#FFD369] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                    <span>Description*</span>
                </label>
            </div>
            <div className="gap-2 grid grid-cols-1 md:grid-cols-3 w-full">
                {error.category && <p className="mb-1 text-red-500 text-xs">{error.category}</p>}
                <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="bg-zinc-800 p-2 border-0 focus:border-[#FFD369] rounded-md outline-none w-full h-10 text-[#EEEEEE]"
                >
                    <option value="">Product Type</option>
                    <option value="air-conditioner">Air-Conditioner</option>
                    <option value="home-appliances">Home-Appliances</option>
                    <option value="laptops">Laptops</option>
                    <option value="mobiles">Mobiles</option>
                    <option value="smart-home">Smart-Home</option>
                    <option value="television">Television</option>
                </select>
                <div className="relative w-full">
                    {error.price && <p className="mb-1 text-red-500 text-xs">{error.price}</p>}
                    <input name='price' type="number" value={formData.price} onChange={(e) => {setFormData({...formData, price: e.target.value})}} required 
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-[#FFD369] rounded-md outline-none w-full h-10 text-[#EEEEEE] transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-[#AAAAAA] peer-focus:text-[#FFD369] peer-valid:text-[#FFD369] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>Price*</span>
                    </label>
                </div>
                <div className="relative w-full">
                    {error.offerprice && <p className="mb-1 text-red-500 text-xs">{error.offerprice}</p>}
                    <input name='offerprice' type="number" value={formData.offerprice} onChange={(e) => {setFormData({...formData, offerprice: e.target.value})}} required 
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-[#FFD369] rounded-md outline-none w-full h-10 text-[#EEEEEE] transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-[#AAAAAA] peer-focus:text-[#FFD369] peer-valid:text-[#FFD369] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>Offer Price*</span>
                    </label>
                </div>
            </div>
            <div className="w-40">
                <button type="submit" className="bg-[#FFD369] hover:bg-[#ffdb87] p-2 rounded-md w-full font-semibold text-md text-zinc-700">{loading? <PulseLoader color="#fff"/>:'ADD'}</button>
            </div>
        </form>
        {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
    </>
  )
}

export default ProductForm
