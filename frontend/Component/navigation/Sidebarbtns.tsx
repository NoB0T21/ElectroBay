'use client'

import Link from "next/link"
import { Add, Analysis, List, Order, Orderfill, Sale } from '../Icons'
import { usePathname } from "next/navigation"

interface Prop{
    index:number,
    shop:string
}

const Sidebarbtns = ({index,shop}:Prop) => {

    const path = usePathname()
    const links = ['/admin','/admin/product-list','/admin/order','/admin/sale','/admin/analysis']
    const icons = [<Add/>,<List/>,<Order/>,<Sale/>, <Analysis/>]
    const icons2 = [<Add/>,<List/>,<Orderfill/>,<Sale/>, <Analysis/>]
    const isActive = path === links[index]

    return (
        <Link href={links[index]} className={`flex flex-col md:flex-row items-center hover:shadow-md md:gap-4 p-2 rounded-md font-semibold transition-all duration-200 ease-in-out group
            ${isActive 
                ? 'bg-secondary text-white shadow-md' 
                : 'text-muted hover:bg-secondary/50 hover:text-slate-900'
            }
        `}>
            <div className={`size-6 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>
                {isActive ? icons2[index] : icons[index]}
            </div>
            <p className='block font-medium text-sm'>{shop}</p>
        </Link>
    )
}

export default Sidebarbtns
