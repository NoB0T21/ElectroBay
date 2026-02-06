'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Data{
  url1: string
  path1: number
  url2: string
  path2: number
  background: number
  discount: number
}

const Promotion = ({data}:{data:Data}) => {
    const products = [data.url1,data.url2]
    const msg = ['The only case you need.',`Get ${data.discount}% OFF`]
  return (
    <div className='my-8 w-full'>
      <div className='justify-center w-full items-center gap-5 grid grid-cols-1 md:grid-cols-2 px-4'>
        {products.map((product,index)=>(
            <motion.div 
              initial={{ opacity: 0, y: 50,scale: 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.4 }}
              key={index} 
              className='relative w-full rounded-2xl overflow-hidden h-48 md:h-64 text-white group cursor-pointer shadow-lg'>
                <Image className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out' width={1920} height={1080} src={product} alt='product'/>
                <div className='absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300'></div>
                <div className='absolute inset-0 flex flex-col items-center justify-center text-center p-4'>
                    <p className='font-bold text-xl md:text-3xl mb-2 drop-shadow-md'>{msg[index]}</p>
                    <div className='bg-white rounded-full w-16 h-1 mb-4'></div>
                    <div className='font-bold text-lg md:text-xl bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all duration-300'>Shop Now</div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Promotion
