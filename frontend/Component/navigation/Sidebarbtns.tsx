'use client'

import Link from "next/link"
import { Add, AddFill, List, Order, Orderfill } from '../Icons'
import { usePathname } from "next/navigation"

interface Prop{
    index:number,
    shop:string
}

const Sidebarbtns = ({index,shop}:Prop) => {

    const path = usePathname()
    const links = ['/admin','/admin/product-list','/admin/order']
    const icons = [<Add/>,<List/>,<Order/>]
    const icons2 = [<AddFill/>,<List/>,<Orderfill/>]

    return (
        <Link href={links[index]} className={`flex ${(path==='/admin'&&index===0 || path==='/admin/product-list'&&index===1 || path==='/admin/order'&&index===2) && 'bg-[#363c47] md:border-r-[#FFD369] md:border-r-8'} flex items-center gap-5 hover:bg-[#363c47] p-3 md:px-4 rounded-md md:rounded-r-md md:rounded-l-2xl w-full h-12 font-medium transition-(bg) duration-300 ease-in-out`}>
            <div className='size-6 md:size-8'>{(path==='/admin'&&index===0 || path==='/admin/product-list'&&index===1 || path==='/admin/order'&&index===2) ? icons2[index] : icons[index]}</div>
            <p className='hidden md:flex'>{shop}</p>
        </Link>
    )
}

export default Sidebarbtns
