'use client'
import Image from 'next/image'
import { motion } from 'motion/react'

const Promotion = () => {
    const products = ['/Images/GamingItems.webp','/Images/earbuds.jpg']
    const msg = ['The only case you need.','Get 30% OFF']
  return (
    <div className='my-5 mb-10 px-5 lg:px-25 py-1 w-full'>
      <div className='justify-center items-center gap-5 grid grid-cols-2 px-4 h-40 md:h-50'>
        {products.map((product,index)=>(
            <motion.div 
              initial={{ opacity: 0, x: 200 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.6 }}
              key={index} 
              className='relative rounded-xl'>
                <Image className='opacity-50 w-full h-40 md:h-50 object-cover' width={1920} height={1080} src={product} alt='product'/>
                <div className='top-[30%] left-2 md:left-10 absolute flex flex-col items-center'>
                    <p className='flex justify-center font-bold text-xl md:text-2xl'>{msg[index]}</p>
                    <div className='bg-white rounded-full w-30 h-0.5'></div>
                    <br />
                    <div className='font-bold text-xl'>Shop Now</div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Promotion
