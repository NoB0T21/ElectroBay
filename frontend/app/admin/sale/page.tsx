'use client'

import Toasts from '@/Component/toasts/Toasts'
import { api } from '@/utils/api'
import { convertFileToUrl } from '@/utils/utils'
import { motion } from 'framer-motion'
import Image from 'next/image'
import React, { useState } from 'react'
import Cookies from 'js-cookie'

const Page = () => {
  const token = Cookies.get('token') || ''

  const [file, setFile] = useState<File>()
  const [files, setFiles] = useState<(File | null)[]>([])
  const [color, setColor] = useState('#f89b44')
  const [discount, setDiscount] = useState('20')
  const [discount2, setDiscount2] = useState('20')
  const [inx, setInx] = useState(0)

  const [loading, setLoading] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [responseMsg, setResponseMsg] = useState('')
  const [toastType, setToastType] = useState<'successMsg' | 'erreoMsg'>('erreoMsg')

  const products = ['/Images/GamingItems.webp', '/Images/earbuds.jpg']
  const msg = ['The only case you need.', `Get ${discount2}% OFF`]

  const showToastMsg = (msg: string, type: 'successMsg' | 'erreoMsg') => {
    setResponseMsg(msg)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 4000)
  }

  /* ---------------- SUBMIT 1 ---------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData()
    form.append('background', color)
    form.append('discount', discount)
    if (file) form.append('file', file)

    try {
      const res = await api.post('/product/sale1/123', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })

      showToastMsg(res.data.message, 'successMsg')
    } catch (err: any) {
      showToastMsg(err?.response?.data?.message || err.message, 'erreoMsg')
    } finally {
      setLoading(false)
    }
  }

  /* ---------------- SUBMIT 2 ---------------- */
  const handleSubmit2 = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData()
    form.append('background', color)
    form.append('discount', discount2)
    form.append('inx', inx.toString())
    files.forEach((f) => f && form.append('file', f))

    try {
      const res = await api.post('/product/sale2/123', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      })

      showToastMsg(res.data.message, 'successMsg')
    } catch (err: any) {
      showToastMsg(err?.response?.data?.message || err.message, 'erreoMsg')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-slate-800">Sales & Promotions</h1>

      {/* ================= SALE 1 (Trending) ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Trending Offer</h2>
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full lg:w-1/3">
                {/* File Input */}
                <div className="relative">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> image</p>
                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => e.target.files && setFile(e.target.files[0])} />
                    </label>
                    {file && <p className="text-xs text-green-600 mt-1 text-center">{file.name}</p>}
                </div>

                {/* Color Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Background Color</label>
                    <div className="flex gap-2 items-center">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="h-10 w-20 rounded cursor-pointer border-0 p-0"
                        />
                        <span className="text-sm text-gray-500">{color}</span>
                    </div>
                </div>

                {/* Discount Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Discount Percentage</label>
                    <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 transition-all"
                        placeholder="20"
                    />
                </div>

                <button
                    disabled={loading}
                    className="w-full py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors mt-2"
                >
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>

            {/* Preview */}
            <div className="w-full lg:w-2/3 bg-gray-50 rounded-xl p-4 flex items-center justify-center border border-gray-100">
                 <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden bg-white shadow-sm">
                    <Image
                        fill
                        className="object-contain p-4"
                        src={file ? convertFileToUrl(file) : "https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/scatch/images/Purple%20and%20Orange%20Modern%20Wearable%20Tech%20Product%20Presentation.png"}
                        alt="Preview"
                    />
                    <div
                        style={{ backgroundColor: color }}
                        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 size-24 md:size-32 rounded-full flex flex-col items-center justify-center text-white shadow-lg animate-bounce-slow"
                    >
                        <span className="text-2xl md:text-3xl font-bold">{discount}%</span>
                        <span className="text-xs font-bold uppercase">OFF</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* ================= SALE 2 (Promotions) ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">Promotional Offers</h2>
        <div className="flex flex-col lg:flex-row gap-8">
             {/* Form */}
             <form onSubmit={handleSubmit2} className="flex flex-col gap-4 w-full lg:w-1/3">
                <div className="grid grid-cols-2 gap-4">
                    {[0, 1].map((i) => (
                        <label key={i} className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors relative">
                            <div className="text-center">
                                <p className="text-xs text-gray-500">Image {i + 1}</p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const newFiles = [...files]
                                    newFiles[i] = e.target.files?.[0] || null
                                    setFiles(newFiles)
                                    setInx(i)
                                }}
                            />
                             {files[i] && <div className="absolute inset-0 bg-green-50/80 flex items-center justify-center rounded-lg"><p className="text-xs text-green-700 font-medium">Selected</p></div>}
                        </label>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Discount Percentage</label>
                    <input
                        type="number"
                        value={discount2}
                        onChange={(e) => setDiscount2(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-slate-800 focus:bg-white focus:border-blue-500 transition-all"
                    />
                </div>

                <button className="w-full py-2.5 bg-black hover:bg-gray-800 text-white font-medium rounded-lg transition-colors mt-2">
                    Save Changes
                </button>
             </form>

             {/* Preview */}
             <div className="w-full lg:w-2/3 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {products.map((p, i) => (
                        <div key={i} className="relative h-48 rounded-xl overflow-hidden group cursor-pointer shadow-sm bg-white">
                            <Image
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                src={files[i] ? convertFileToUrl(files[i]!) : p}
                                alt="product"
                            />
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                <p className="text-lg font-bold drop-shadow-md text-center px-2">{msg[i]}</p>
                                <div className="w-12 h-0.5 bg-white my-2"></div>
                                <span className="font-semibold text-sm bg-white/20 px-4 py-1 rounded-full backdrop-blur-sm">Shop Now</span>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>

      {showToast && <Toasts type={toastType} msg={responseMsg} />}
    </div>
  )
}

export default Page
