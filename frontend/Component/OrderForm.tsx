'use client'

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { api } from "@/utils/api";
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import Toasts from "./toasts/Toasts";

const formSchema = z.object({
    Fullname: z.string().min(3, "Name required"),
    PhoneNo: z.string().min(10, "number length should be 10").max(10,"number length should be 10"),
    Pincode: z.string().min(6, "Pincode length should be 10").max(6,"number length should be 6"),
    Address: z.string().min(1, "Address is required"),
    City: z.string().min(1, "City is required"),
    State: z.string().min(1, "State is required"),
})

const OrderForm = ({productId,productName,price}:{productId:string[],productName:string[],price:number}) => {
    const token = Cookies.get("token") || "";
    const [formData, setFormData] = useState<{
        Fullname?: string;
        PhoneNo?: string;
        Pincode?: string
        Address?: string;
        City?: string;
        State?: string;
    }>({})
    const [error, setError] = useState<{
        Fullname?: string;
        PhoneNo?: string;
        Pincode?: string
        Address?: string;
        City?: string;
        State?: string;
    }>({})
    const router=useRouter()
    const [showToast,setShowToast] = useState(false)
    const [responseMsg,setResponseMsg] = useState('')
    const [tostType,setTostType] = useState('warningMsg')
    const [loading,setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setShowToast(false)
        setLoading(true)

        let parserResult: any = formSchema.safeParse({
            Fullname:formData.Fullname,
            PhoneNo:formData.PhoneNo,
            Pincode: formData.Pincode,
            Address: formData.Address,
            City: formData.City,
            State: formData.State,
        })
        if(!parserResult.success){
            const errorMessages = parserResult.error.flatten().fieldErrors
            setError({
                Fullname:errorMessages.Fullname?.[0],
                PhoneNo:errorMessages.PhoneNo?.[0],
                Pincode: errorMessages.Pincode?.[0],
                Address: errorMessages.Address?.[0],
                City: errorMessages.City?.[0],
                State: errorMessages.State?.[0],
            })
            setLoading(false)
            return
        }

        setError({
            Fullname:'',
            PhoneNo:'',
            Pincode: '',
            Address: '',
            City:'',
            State: '',
        })
        if(productId.length === 0){
            setResponseMsg('You should atleast have 1 item to order')
            setTostType('infoMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
            return
        }

        const response = await api.post('/product/order',{
            productId,
            productName,
            price,
            formData
        },{
            headers: {
                    Authorization: `Bearer ${token}`,
                },
            withCredentials: true
        })
        if(response.status !== 201){
            setResponseMsg(response.data.message)
            if(response.status === 202)setTostType('successMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
            return
        }
        if(response.status === 201){
            setTostType('successMsg');
            setResponseMsg(response.data.message)
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 3000);
        }
        router.push('/myorder')
        setLoading(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mb-5 p-1 w-full">
                <div className="relative w-full">
                    {error.Fullname && <p className="mb-1 text-red-500 text-xs">{error.Fullname}</p>}
                    <input name='Fullname' type="text" value={formData.Fullname} onChange={(e) => {setFormData({...formData, Fullname: e.target.value})}}required 
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>Fullname*</span>
                    </label>
                </div>

                <div className="relative w-full">
                    {error.PhoneNo && <p className="mb-1 text-red-500 text-xs">{error.PhoneNo}</p>}
                    <input name='PhoneNo' type="text" value={formData.PhoneNo} onChange={(e) => {setFormData({...formData, PhoneNo: e.target.value})}} required maxLength={10}
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>PhoneNo*</span>
                    </label>
                </div>

                <div className="relative w-full">
                    {error.Pincode && <p className="mb-1 text-red-500 text-xs">{error.Pincode}</p>}
                    <input name='Pincode' type="text" value={formData.Pincode} onChange={(e) => {setFormData({...formData, Pincode: e.target.value})}} required maxLength={6}
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>Pincode*</span>
                    </label>
                </div>

                <div className="relative w-full">
                    {error.Address && <p className="mb-1 text-red-500 text-xs">{error.Address}</p>}
                    <textarea name='Address' value={formData.Address} onChange={(e) => {setFormData({...formData, Address: e.target.value})}} required 
                        className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-30 text-white transition-all duration-200"
                    />
                    <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                        <span>Address*</span>
                    </label>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="relative w-1/2">
                        {error.City && <p className="mb-1 text-red-500 text-xs">{error.City}</p>}
                        <input name='City' type="text" value={formData.City} onChange={(e) => {setFormData({...formData, City: e.target.value})}} required 
                            className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>City*</span>
                        </label>
                    </div>

                    <div className="relative w-1/2">
                        {error.State && <p className="mb-1 text-red-500 text-xs">{error.State}</p>}
                        <input name='State' type="text" value={formData.State} onChange={(e) => {setFormData({...formData, State: e.target.value})}} required 
                            className="peer bg-zinc-800 p-2 border border-zinc-700 focus:border-indigo-500 rounded-md outline-none w-full h-10 text-white transition-all duration-200"
                        />
                        <label className="left-2 absolute bg-[#212121] px-1 rounded-sm text-gray-400 peer-focus:text-[#2196f3] peer-valid:text-[#2196f3] text-xs text-clip scale-100 peer-focus:scale-75 peer-valid:scale-75 transition-all translate-y-3 peer-focus:-translate-y-2 peer-valid:-translate-y-2 duration-200 pointer-events-none transform">
                            <span>State*</span>
                        </label>
                    </div>
                </div>
                <div className="w-2/3">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit" 
                        className="bg-[#FFD369] hover:bg-[#ffdf93] p-2 rounded-md w-full font-semibold text-[#222831] text-md">
                            {loading? <PulseLoader color="#fff"/>:'Order'}
                    </motion.button>
                </div>
            </form>
            {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
        </>
    )
}

export default OrderForm
