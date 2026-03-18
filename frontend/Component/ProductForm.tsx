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
import { AddProduct } from "@/utils/types";
import { BadgeIndianRupee, Box, IndianRupee, List, PencilLine, User, Warehouse } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    description: z.string().min(5, "Description required"),
    category: z.string().min(1, "Please select category"),
    price: z.string().min(1,"should have some value"),
    stock: z.string().min(1,"should have some value"),
})

const ProductForm = () => {
    const [formData, setFormData] = useState<AddProduct>({})
    const [error, setError] = useState<{
        name?: string;
        description?: string;
        category?: string;
        price?: string;
        offerprice?: string;
        stock?: string;
        file?: string
    }>({})
    const router=useRouter()
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<(File | null)[]>([])
    const [color, setColor] = useState<string[]>(['#d4b896','#c9a87c','#947050','#d4b896','#c9a87c']);

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
            stock: formData.stock,
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
                stock: errorMessages.stock?.[0],
                file: errorMessages.file?.[0]
            })
            
            console.log('hello')
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
            form.append('stock', formData.stock || '');
            form.append('background', JSON.stringify(color));
            file.forEach(f => {
                if (f) form.append('file', f);
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
    <div className="w-full max-w-4xl mx-auto pb-10">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="gap-4 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 w-full mb-4">
                {color.map((nu, index) => (
                    <div key={nu} className="flex flex-col items-center gap-2">
                        <div className="size-20 md:size-24 shadow-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                            <div
                                style={{ backgroundColor: color[index] || '#f9fafb' }}
                                className="relative flex justify-center items-center w-full h-full group cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                {!file[index] && <div className="text-muted w-full h-full"><Imgs /></div>}

                                <input
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const newFiles = [...file];
                                    newFiles[index] = e.target.files?.[0] || null;
                                    setFile(newFiles);
                                }}
                                />

                                {file[index] && (
                                <Image
                                    width={100}
                                    height={100}
                                    className="w-full h-full object-contain"
                                    src={convertFileToUrl(file[index])}
                                    alt="preview"
                                />
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="relative w-full">
                {error.name && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.name}</p>}
                <input 
                    onChange={(e) => {setFormData({...formData, name: e.target.value})}}
                    name='product name' 
                    type="text" 
                    value={formData.name} 
                    className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                    placeholder="Product Name"
                    required 
                />
                <Box className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="relative w-full">
                {error.description && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.description}</p>}
                <textarea name='description' value={formData.description} onChange={(e) => {setFormData({...formData, description: e.target.value})}} required 
                    className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                    placeholder="Description"
                />
                <PencilLine className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
                <div className="relative w-full">
                    {error.category && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.category}</p>}
                    <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                    >
                        <option value="">Product Type</option>
                        <option value="air-conditioner">Air-Conditioner</option>
                        <option value="home-appliances">Home-Appliances</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="smart-home">Smart-Home</option>
                        <option value="television">Television</option>
                    </select>
                    <List className="absolute left-3 top-1/3 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <div className="relative w-full">
                    {error.price && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.price}</p>}
                    <input name='price' type="number" value={formData.price} onChange={(e) => {setFormData({...formData, price: e.target.value})}} required 
                        className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                        placeholder="Price"
                    />
                    <BadgeIndianRupee className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <div className="relative w-full">
                    {error.offerprice && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.offerprice}</p>}
                    <input name='offerprice' type="number" value={formData.offerprice} onChange={(e) => {setFormData({...formData, offerprice: e.target.value})}} required 
                        className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                        placeholder="Offer Price"
                    />                    
                    <IndianRupee className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <div className="relative w-full">
                    {error.stock && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.stock}</p>}
                    <input name='stock' type="number" value={formData.stock} onChange={(e) => {setFormData({...formData, stock: e.target.value})}} required 
                        className="w-full pl-10 pr-4 text-black py-2.5 border border-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-sm"
                        placeholder="In Stock"
                    />
                    <Warehouse className="absolute left-3 top-5 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-primary/50 hover:bg-primary/70 text-white font-bold rounded-lg shadow-lg transition-all duration-200 transform active:scale-[0.98] flex justify-center items-center mt-4">
                {loading? <PulseLoader size={8} color="#fff"/>:'Add Product'}
            </button>
        </form>
        {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default ProductForm
