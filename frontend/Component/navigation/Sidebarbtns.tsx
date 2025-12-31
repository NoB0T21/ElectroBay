'use client'

import Link from "next/link"
import { Add, AddFill, List, Order, Orderfill, Sale } from '../Icons'
import { usePathname } from "next/navigation"

interface Prop{
    index:number,
    shop:string
}

const Sidebarbtns = ({index,shop}:Prop) => {

    const path = usePathname()
    const links = ['/admin','/admin/product-list','/admin/order','/admin/sale']
    const icons = [<Add/>,<List/>,<Order/>,<Sale/>]
    const icons2 = [<AddFill/>,<List/>,<Orderfill/>,<Sale/>]

    return (
        <Link href={links[index]} className={`flex ${(path==='/admin'&&index===0 || path==='/admin/product-list'&&index===1 || path==='/admin/order'&&index===2 || path==='/admin/sale'&&index===3) && 'bg-[#3063c2] md:border-r-[#f78f39] md:border-r-8'} flex items-center gap-5 hover:bg-[#3063c2] p-3 md:px-4 rounded-md md:rounded-r-md md:rounded-l-2xl w-full h-12 font-medium transition-(bg) duration-300 ease-in-out`}>
            <div className='size-6 md:size-8'>{(path==='/admin'&&index===0 || path==='/admin/product-list'&&index===1 || path==='/admin/order'&&index===2 || path==='/admin/sale'&&index===3) ? icons2[index] : icons[index]}</div>
            <p className='hidden md:flex'>{shop}</p>
        </Link>
    )
}

export default Sidebarbtns
