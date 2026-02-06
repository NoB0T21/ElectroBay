'use client'

import Link from "next/link"
import { Add, AddFill, Analysis, List, Order, Orderfill, Sale } from '../Icons'
import { usePathname } from "next/navigation"

interface Prop{
    index:number,
    shop:string
}

const Sidebarbtns = ({index,shop}:Prop) => {

    const path = usePathname()
    const links = ['/admin','/admin/product-list','/admin/order','/admin/sale','/admin/analysis']
    const icons = [<Add/>,<List/>,<Order/>,<Sale/>, <Analysis/>]
    const icons2 = [<AddFill/>,<List/>,<Orderfill/>,<Sale/>, <Analysis/>]
    const isActive = path === links[index]

    return (
        <Link href={links[index]} className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-200 group
            ${isActive 
                ? 'bg-black text-white shadow-md' 
                : 'text-slate-600 hover:bg-gray-100 hover:text-slate-900'
            }
        `}>
            <div className={`size-6 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                {isActive ? icons2[index] : icons[index]}
            </div>
            <p className='hidden xl:block font-medium text-sm'>{shop}</p>
        </Link>
    )
}

export default Sidebarbtns
