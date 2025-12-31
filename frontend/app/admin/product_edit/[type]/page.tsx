'use client';

import { z } from "zod";
import { convertFileToUrl, getProduct } from '@/utils/utils';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react'
import Image from 'next/image';
import { AddProduct, Products } from "@/utils/types";
import { api } from "@/utils/api";
import { Imgs } from "@/Component/Icons";
import Toasts from "@/Component/toasts/Toasts";

const formSchema = z.object({
    name: z.string().min(3, "Name required"),
    description: z.string().min(5, "Description required"),
    category: z.string().min(1, "Please select category"),
    price: z.string().min(1,"should have some value"),
    stock: z.string().min(1,"should have some value"),
})

const page = () => {
  const num = [1,2,3,4,5]
  const [formData, setFormData] = useState<AddProduct>({})
  const [product, setProduct] = useState<Products>()
  const [error, setError] = useState<{
      name?: string;
      description?: string;
      category?: string;
      price?: string;
      offerprice?: string;
      stock?: string;
  }>({})
  const router=useRouter()
  const [showToast,setShowToast] = useState(false)
  const [responseMsg,setResponseMsg] = useState('')
  const [tostType,setTostType] = useState('warningMsg')
  const [loading,setLoading] = useState(false)
  const [index,setIndex] = useState<number[]>([])
  const [file,setFile] = useState<(File | null)[]>([])
  const [color, setColor] = useState<string[]>([]);

  useEffect(()=>{
    const data = getProduct()
    const colors = data.images.map((img: any) => img.background)
    setColor(colors)
    setFormData({
        name: data.name ?? '',
        description: data.description ?? '',
        offerprice: data.offerprice?.toString() ?? '',
        price: data.price?.toString() ?? '',
        category: data.productType ?? '',
        stock: data.stock?.toString() ?? '',
      })
    setProduct(data)
  },[])

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
    })

    const form = new FormData();
      form.append('name', formData.name || '');
      form.append('description', formData.description || '');
      form.append('productType', formData.category || '');
      form.append('price', formData.price || '');
      form.append('offerprice', formData.offerprice || '');
      form.append('stock', formData.stock || '');
      form.append('background', JSON.stringify(color));
      form.append('images', JSON.stringify(product?.images));
      form.append('index', JSON.stringify(index));
      if(file){
        file.forEach(f => {
          if (f) form.append('file', f);
        });
      }

      try {
        const response = await api.put(`/product/update/${product?._id}`,form,{
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        })
        setTostType('successMsg')
        setResponseMsg(response.data.message)
        setLoading(false)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
          }, 3000);
        router.push('/admin/product-list')
        setLoading(false)
      } catch (error:any) {
        setResponseMsg(error.response.data.message)
        setLoading(false)
        setShowToast(true)
        setTimeout(() => {
            setShowToast(false)
          }, 3000);
        return
      }
  }
  return (
    <div className='p-3 md:p-7 shadow-xl/50 rounded-2xl w-full h-full'>
      <div className="h-full w-full overflow-y-scroll">
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 p-1 rounded-md w-full lg:w-140 h-full">
          <div className="gap-3 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 w-full">
            {num.map((nu, index) => (
              <div key={nu} className="h-35 relative mb-3 flex flex-col justify-center items-center">
                <div className="size-16 md:size-20 shadow-xl/30">
                  <div
                    style={{ backgroundColor: color[index] }}
                    className="relative flex justify-center items-center overflow-hidden p-2 border-2 rounded-xl w-full h-full"
                  >
                    {!file[index] && <Imgs />}

                    <input
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                          const newFiles = [...file];
                          newFiles[index] = e.target.files?.[0] || null;
                          setIndex(prev => (prev.includes(index) ? prev : [...prev, index]))
                          setFile(newFiles);
                      }}
                    />

                    {(file[index] || product?.images[index]) && (
                      <Image
                        width={100}
                        height={100}
                        className="w-full h-full object-contain"
                        src={file[index] ? convertFileToUrl(file[index]) : product?.images?.[index]?.url || ''}
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
                  className="mt-2 rounded-md overflow-clip w-full h-8"
                />
                <p>set color</p>
              </div>
            ))}
          </div>
          <div className="relative w-full">
            {error.name && <p className="mb-1 text-red-500 text-xs">{error.name}</p>}
            <input 
              onChange={(e) => {setFormData({...formData, name: e.target.value})}}
              name='product name' 
              type="text" 
              value={formData.name} 
              className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
              required 
            />
            <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Product Name*</span>
            </label>
          </div>
          <div className="relative w-full">
            {error.description && <p className="mb-1 text-red-500 text-xs">{error.description}</p>}
            <textarea name='description' value={formData.description} onChange={(e) => {setFormData({...formData, description: e.target.value})}} required 
              className="peer bg-[#ddebff] p-2 shadow-xl/30 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-30 text-black transition-all duration-200"
            />
            <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:text-[#2196f3] peer-focus:border-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>Description*</span>
            </label>
          </div>
          <div className="gap-2 grid grid-cols-1 md:grid-cols-3 w-full">
            {error.category && <p className="mb-1 text-red-500 text-xs">{error.category}</p>}
            <select
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="bg-[#ddebff] p-2 border shadow-xl/30 border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black"
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
                className="peer bg-[#ddebff] shadow-xl/30 p-2 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
              />
              <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Price*</span>
              </label>
            </div>
            <div className="relative w-full">
              {error.offerprice && <p className="mb-1 text-red-500 text-xs">{error.offerprice}</p>}
              <input name='offerprice' type="number" value={formData.offerprice} onChange={(e) => {setFormData({...formData, offerprice: e.target.value})}} required 
                className="peer bg-[#ddebff] shadow-xl/30 p-2 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
              />
              <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                <span>Offer Price*</span>
              </label>
            </div>
          </div>
          <div className="relative w-full">
            {error.stock && <p className="mb-1 text-red-500 text-xs">{error.stock}</p>}
            <input name='offerprice' type="number" value={formData.stock} onChange={(e) => {setFormData({...formData, stock: e.target.value})}} required 
              className="peer bg-[#ddebff] shadow-xl/30 p-2 border border-zinc-700 focus:border-[#2196f3] rounded-md outline-none w-full h-10 text-black transition-all duration-200"
            />
            <label className="left-2 absolute bg-[#ddebff] px-1 rounded-sm text-gray-500 peer-focus:border-[#2196f3] peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
              <span>In Stock*</span>
            </label>
          </div>
          <div className="w-40">
            <button type="submit" className="bg-[#376ecc] hover:bg-[#2196f3] p-2 rounded-md w-full font-semibold text-md text-white transition-all duration-200 ease-in-out hover:scale-110">{loading? <PulseLoader color="#fff"/>:'ADD'}</button>
          </div>
        </form>
        {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
      </div>
    </div>
  )
}

export default page
