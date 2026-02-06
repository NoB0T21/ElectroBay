'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Hook = () => {
    const products = ['/Hooks/grooming.png','/Hooks/headphone.png','/Hooks/videogames.png']
    const categorys = ['Wireless headphones','Grooming','Video games']
    const color = ['bg-[#b5dae5]','bg-[#b5dae5]','bg-[#f8edd1]']
    return (
        <div className='mb-5'>
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-3 min-h-[12rem] md:h-80`}>
                {products.map((product,index)=>(
                    <motion.div
                        initial={{ opacity: 0, y: 50 ,scale: 0 }}
                        whileInView={{ opacity: 1, y: 0 ,scale: 1 }}
                        viewport={{ amount: 0.4 }}
                        className={`relative ${color[index]} rounded-xl hover:scale-105 flex flex-row-reverse justify-between items-center p-4 w-full h-48 md:h-full shadow-xl transition-all duration-400 ease-in-out overflow-hidden`} key={index}>
                            <Image className='w-1/2 h-full object-contain z-10' width={500} height={500} src={product} alt='product'/>
                            <motion.div 
                            initial={{ opacity: 0,  scale: 0 }}
                            whileInView={{ opacity: 1,  scale: 1 }}
                            viewport={{ amount: 0.5 }}
                            className='flex flex-col justify-center items-start w-1/2 z-20'>
                                <h1 className='font-bold text-slate-900 text-xl md:text-2xl lg:text-3xl leading-tight mb-2'>{categorys[index]}</h1>
                                <p className='text-slate-700 font-medium mb-2'>Starting at $49</p>
                                <div className='font-bold text-blue-600 hover:underline cursor-pointer'>Shop Now</div>
                            </motion.div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default Hook
