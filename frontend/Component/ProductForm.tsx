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

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    description: z.string().min(5, "Description required"),
    category: z.string().min(1, "Please select category"),
    price: z.string().min(1,"should have some value"),
    stock: z.string().min(1,"should have some value"),
})

const ProductForm = () => {
    const num = [1,2,3,4,5]
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
    const [color, setColor] = useState<string[]>([]);

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
                {num.map((nu, index) => (
                    <div key={nu} className="flex flex-col items-center gap-2">
                        <div className="size-20 md:size-24 shadow-sm rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                            <div
                                style={{ backgroundColor: color[index] || '#f9fafb' }}
                                className="relative flex justify-center items-center w-full h-full group cursor-pointer hover:opacity-90 transition-opacity"
                            >
                                {!file[index] && <Imgs />}

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
                        <input
                        type="color"
                        value={color[index]}
                        onChange={(e) => {
                            const newColors = [...color];
                            newColors[index] = e.target.value;
                            setColor(newColors);
                        }}
                        className="w-full h-8 rounded cursor-pointer border-0 p-0"
                        />
                        <p className="text-xs text-gray-400">Color</p>
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
                    className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                    placeholder="Product Name"
                    required 
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Product Name*
                </label>
            </div>
            <div className="relative w-full">
                {error.description && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.description}</p>}
                <textarea name='description' value={formData.description} onChange={(e) => {setFormData({...formData, description: e.target.value})}} required 
                    className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent min-h-[120px]"
                    placeholder="Description"
                />
                <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                    Description*
                </label>
            </div>
            <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full">
                <div className="relative w-full">
                    {error.category && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.category}</p>}
                    <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                    >
                        <option value="">Product Type</option>
                        <option value="air-conditioner">Air-Conditioner</option>
                        <option value="home-appliances">Home-Appliances</option>
                        <option value="laptops">Laptops</option>
                        <option value="mobiles">Mobiles</option>
                        <option value="smart-home">Smart-Home</option>
                        <option value="television">Television</option>
                    </select>
                </div>
                <div className="relative w-full">
                    {error.price && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.price}</p>}
                    <input name='price' type="number" value={formData.price} onChange={(e) => {setFormData({...formData, price: e.target.value})}} required 
                        className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="Price"
                    />
                    <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Price*
                    </label>
                </div>
                <div className="relative w-full">
                    {error.offerprice && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.offerprice}</p>}
                    <input name='offerprice' type="number" value={formData.offerprice} onChange={(e) => {setFormData({...formData, offerprice: e.target.value})}} required 
                        className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="Offer Price"
                    />
                    <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Offer Price*
                    </label>
                </div>
                <div className="relative w-full">
                    {error.stock && <p className="absolute right-0 -top-5 text-red-500 text-xs font-medium">{error.stock}</p>}
                    <input name='stock' type="number" value={formData.stock} onChange={(e) => {setFormData({...formData, stock: e.target.value})}} required 
                        className="peer w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="In Stock"
                    />
                    <label className="absolute left-4 top-3.5 text-gray-400 text-sm transition-all duration-200 pointer-events-none peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        In Stock*
                    </label>
                </div>
            </div>
            <button type="submit" className="w-full py-3.5 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-all duration-200 transform active:scale-[0.98] flex justify-center items-center mt-4">
                {loading? <PulseLoader size={8} color="#fff"/>:'Add Product'}
            </button>
        </form>
        {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
    </div>
  )
}

export default ProductForm
