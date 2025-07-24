'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hook = () => {
    const products = ['/Hooks/grooming.png','/Hooks/headphone.png','/Hooks/videogames.png']
    const categorys = ['Wireless headphones','Grooming','Video games']
    const color = ['bg-[#b5dae5]','bg-[#b5dae5]','bg-[#f8edd1]']
    return (
        <div className='mb-5 px-5 lg:px-25 py-1'>
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-3 h-45 md:h-80 `}>
                {products.map((product,index)=>(
                    <motion.div
                        initial={{ opacity: 0, y: 50 ,scale: 0 }}
                        whileInView={{ opacity: 1, y: 0 ,scale: 1 }}
                        viewport={{ amount: 0.4 }}
                        className={`relative ${color[index]} rounded-xl flex flex-row-reverse justify-start p-3 w-full h-full`} key={index}>
                            <Image className='w-40 h-45 md:h-80 object-contain' width={1920} height={1080} src={product} alt='product'/>
                            <motion.div 
                            initial={{ opacity: 0,  scale: 0 }}
                            whileInView={{ opacity: 1,  scale: 1 }}
                            viewport={{ amount: 0.5 }}
                            className='absolute p-3 px-6 lg:px-10 w-full'>
                                <h1 className='my-3 font-semibold text-black md:text-3xl text-4xl lg:text-5xl'>{categorys[index]}</h1>
                                <p className='my-3 text-black'>Starting at $49</p>
                                <div className='font-semibold text-blue-600'>Shop Now</div>
                            </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Hook
