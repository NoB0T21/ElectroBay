import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from 'react'
import {Info, Warning} from "../Icons"

type NotiType = 'infoMsg' | 'warningMsg' | 'successMsg' | 'erreoMsg'

const Toasts = ({type, msg}: {type: NotiType, msg: string}) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(()=>{
        setIsVisible(true)
        setTimeout(() => {
            setIsVisible(false)
          }, 5000);
    },[])

    return (
        <div className='flex flex-col'>
            <AnimatePresence initial={false}>
                {isVisible ? (<motion.div 
                initial={{ y:-100, scale: 0 }}
                animate={{y:0, scale: 1 }}
                exit={{y:-100,scale: 0 }}
                    className={`absolute top-0 right-0 m-3 bg-zinc-800 p-2 w-65 rounded-md`}>
                        {type === 'warningMsg' && <>
                            <div className="flex justify-between items-center gap-2 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 text-yellow-500"><Warning/></div>
                                    <p className="font-semibold text-md">Warning</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="m-2 px-2 font-medium">{msg}</div>
                        </>}
                        {type === 'infoMsg' && <>
                            <div className="flex justify-between items-center gap-2 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 text-blue-400"><Info/></div>
                                    <p className="font-semibold text-md">Info</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="m-2 px-2 font-medium">{msg}</div>
                        </>}
                        {type === 'erreoMsg' && <>
                            <div className="flex justify-between items-center gap-2 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 text-red-500"><Warning/></div>
                                    <p className="font-semibold text-md">Error</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="m-2 px-2 font-medium">{msg}</div>
                        </>}
                        {type === 'successMsg' && <>
                            <div className="flex justify-between items-center gap-2 px-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 text-green-500"><Warning/></div>
                                    <p className="font-semibold text-md">Success</p>
                                </div>
                                <div onClick={()=>{setIsVisible(false)}} className="p-1 text-md">x</div>
                            </div>
                            <div className="bg-zinc-600 w-full h-0.5"></div>
                            <div className="m-2 px-2 font-medium">{msg}</div>
                        </>}
                </motion.div>): null}
            </AnimatePresence>
        </div>
    )
}

export default Toasts