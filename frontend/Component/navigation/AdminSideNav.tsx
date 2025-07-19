import React from 'react'

const AdminSideNav = () => {
    const shops = ['Add Products','Product List','Order']
    const links = ['/','/product-list','order']
    return (
        <div className='flex flex-col gap-10 mr-5 p-8 pr-3 border-zinc-600 border-r-1 w-14 md:w-90 h-full'>
        <div className='flex flex-col items-center pb-10 w-full'>
            <div className='flex flex-col gap-5 px-1 pl-10 w-full text-mb'>{shops.map((shop,index)=>(<p className='hidden md:flex pr-2 w-full font-medium' key={index}>{shop}</p>))}</div>
        </div>
        </div>
    )
}

export default AdminSideNav
