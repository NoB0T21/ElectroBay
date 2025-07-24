'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Promotion = () => {
    const products = ['/Images/GamingItems.webp','/Images/earbuds.jpg']
    const msg = ['The only case you need.','Get 30% OFF']
  return (
    <div className='my-5 mb-10 px-5 lg:px-25 py-1 w-full'>
      <div className='justify-center items-center gap-5 grid grid-cols-2 px-4 h-40 md:h-50'>
        {products.map((product,index)=>(
            <motion.div 
              initial={{ opacity: 0, y: 50,scale: 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ amount: 0.4 }}
              key={index} 
              className='relative rounded-xl h-40 md:h-50'>
                <Image className='hover:bg-[#1c1c1c55] opacity-50 w-full h-full object-cover hover:scale-101' width={1920} height={1080} src={product} alt='product'/>
                <div className='top-[50%] left-[50%] absolute flex flex-col items-center -translate-[50%]'>
                    <p className='flex justify-center font-bold text-md md:text-2xl'>{msg[index]}</p>
                    <div className='bg-white rounded-full w-30 h-0.5'></div>
                    <br />
                    <div className='font-bold text-md md:text-xl'>Shop Now</div>
                </div>
            </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Promotion
