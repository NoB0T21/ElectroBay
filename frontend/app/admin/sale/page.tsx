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
    <div className="px-4 w-full space-y-8">

      {/* ================= SALE 1 ================= */}
      <div className="flex flex-col md:flex-row gap-8 border-b pb-8">

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full md:w-1/3">

          <label className="relative bg-[#ddebff] border border-zinc-700 rounded-md text-center py-1 cursor-pointer">
            Upload Image
            <input
              type="file"
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
          </label>

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="h-10 rounded-md"
          />

          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="bg-[#ddebff] border border-zinc-700 rounded-md p-2"
          />

          <button
            disabled={loading}
            className="bg-[#21428f] hover:bg-[#3063c2] transition text-white rounded-lg py-2"
          >
            Save
          </button>
        </form>

        <div className="relative w-full md:w-2/3 h-64 rounded-xl overflow-hidden">
          <Image
            fill
            className="object-cover"
            src={file ? convertFileToUrl(file) : "https://yxbboqcacbihxherpisb.supabase.co/storage/v1/object/public/scatch/images/Purple%20and%20Orange%20Modern%20Wearable%20Tech%20Product%20Presentation.png"}
            alt="Preview"
          />
          <div
            style={{ backgroundColor: color }}
            className="absolute bottom-6 right-15 w-36 h-36 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl transition-all duration-300 ease-in-out transform-3d rotate-y-1 rotate-z-20 hover:rotate-y-360"
          >
            {discount}%
          </div>
        </div>
      </div>

      {/* ================= SALE 2 ================= */}
      <div className="flex flex-col md:flex-row gap-8">

        <form onSubmit={handleSubmit2} className="flex flex-col gap-4 w-full md:w-1/3">
          {[0, 1].map((i) => (
            <label
              key={i}
              className="relative bg-[#ddebff] border border-zinc-700 rounded-md text-center py-1 cursor-pointer"
            >
              Upload Image {i + 1}
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={(e) => {
                  const newFiles = [...files]
                  newFiles[i] = e.target.files?.[0] || null
                  setFiles(newFiles)
                  setInx(i)
                }}
              />
            </label>
          ))}

          <input
            type="number"
            value={discount2}
            onChange={(e) => setDiscount2(e.target.value)}
            className="bg-[#ddebff] border border-zinc-700 rounded-md p-2"
          />

          <button className="bg-[#21428f] hover:bg-[#3063c2] text-white rounded-lg py-2">
            Save
          </button>
        </form>

        <div className="grid grid-cols-2 gap-4 w-full md:w-2/3">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative h-48 rounded-xl overflow-hidden"
            >
              <Image
                fill
                className="object-cover transition-transform hover:scale-110"
                src={files[i] ? convertFileToUrl(files[i]!) : p}
                alt="product"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                <p className="text-lg font-bold">{msg[i]}</p>
                <div className="w-20 h-0.5 bg-white my-2" />
                <span className="font-semibold">Shop Now</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {showToast && <Toasts type={toastType} msg={responseMsg} />}
    </div>
  )
}

export default Page
