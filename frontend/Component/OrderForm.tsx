'use client'

import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { PulseLoader } from "react-spinners";
import { api } from "@/utils/api";
import { motion } from "framer-motion"
import Cookies from 'js-cookie'
import Toasts from "./toasts/Toasts";
import { PaymentMode } from "@/utils/types";

const formSchema = z.object({
    Fullname: z.string().min(3, "Name required"),
    PhoneNo: z.string().min(10, "number length should be 10").max(10,"number length should be 10"),
    Pincode: z.string().min(6, "Pincode length should be 10").max(6,"number length should be 6"),
    Address: z.string().min(1, "Address is required"),
    City: z.string().min(1, "City is required"),
    State: z.string().min(1, "State is required"),
})

interface CartItem {
    product: string
    quantity: number
}

const OrderForm = ({products,productName,price}:{products:CartItem[],productName:string[],price:number}) => {
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
    const [status,setStatus] = useState<PaymentMode>(PaymentMode.CashOnDelivery)

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
        if(products.length === 0){
            setResponseMsg('You should atleast have 1 item to order')
            setTostType('infoMsg');
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);
            return
        }
        try {
            const response = await api.post('/product/order',{
                products:products,
                productName,
                price,
                formData,
                PaymentMode: status
            },{
                headers: {
                        Authorization: `Bearer ${token}`,
                    },
                withCredentials: true
            })
            setTostType('successMsg');
            setResponseMsg(response.data.message)
            setLoading(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
              }, 3000);
            router.push('/myorder')
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
        <>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <div className="relative w-full">
                    {error.Fullname && <p className="mb-1 text-red-500 text-xs">{error.Fullname}</p>}
                    <input name='Fullname' type="text" value={formData.Fullname} onChange={(e) => {setFormData({...formData, Fullname: e.target.value})}}required 
                        className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="Full Name"
                    />
                    <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Full Name*
                    </label>
                </div>

                <div className="relative w-full">
                    {error.PhoneNo && <p className="mb-1 text-red-500 text-xs">{error.PhoneNo}</p>}
                    <input name='PhoneNo' type="text" value={formData.PhoneNo} onChange={(e) => {setFormData({...formData, PhoneNo: e.target.value})}} required maxLength={10}
                        className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="Phone No"
                    />
                    <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Phone No*
                    </label>
                </div>

                <div className="relative w-full">
                    {error.Pincode && <p className="mb-1 text-red-500 text-xs">{error.Pincode}</p>}
                    <input name='Pincode' type="text" value={formData.Pincode} onChange={(e) => {setFormData({...formData, Pincode: e.target.value})}} required maxLength={6}
                        className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                        placeholder="Pincode"
                    />
                    <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Pincode*
                    </label>
                </div>

                <div className="relative w-full">
                    {error.Address && <p className="mb-1 text-red-500 text-xs">{error.Address}</p>}
                    <textarea name='Address' value={formData.Address} onChange={(e) => {setFormData({...formData, Address: e.target.value})}} required 
                        className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent min-h-[80px]"
                        placeholder="Address"
                    />
                    <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                        Address*
                    </label>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="relative w-1/2">
                        {error.City && <p className="mb-1 text-red-500 text-xs">{error.City}</p>}
                        <input name='City' type="text" value={formData.City} onChange={(e) => {setFormData({...formData, City: e.target.value})}} required 
                            className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                            placeholder="City"
                        />
                        <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                            City*
                        </label>
                    </div>

                    <div className="relative w-1/2">
                        {error.State && <p className="mb-1 text-red-500 text-xs">{error.State}</p>}
                        <input name='State' type="text" value={formData.State} onChange={(e) => {setFormData({...formData, State: e.target.value})}} required 
                            className="peer w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 placeholder-transparent"
                            placeholder="State"
                        />
                        <label className="absolute left-4 top-2 text-gray-400 text-xs transition-all duration-200 pointer-events-none peer-placeholder-shown:text-sm peer-placeholder-shown:top-2.5 peer-focus:top-0.5 peer-focus:text-xs peer-focus:text-blue-500">
                            State*
                        </label>
                    </div>
                </div>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as PaymentMode)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200"
                >
                    <option value={PaymentMode.CashOnDelivery}>Cash On Delivery</option>
                    <option value={PaymentMode.Online}>Online</option>
                </select>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    className="w-full py-3 bg-black hover:bg-gray-800 text-white font-bold rounded-xl shadow-lg transition-all duration-200 flex justify-center items-center mt-2"
                >
                    {loading? <PulseLoader size={8} color="#fff"/>:'Place Order'}
                </motion.button>
            </form>
            {showToast && <Toasts type={tostType==='warningMsg'?(tostType==='warningMsg'?'warningMsg':'successMsg'):'infoMsg'} msg={responseMsg}/>}
        </>
    )
}

export default OrderForm
