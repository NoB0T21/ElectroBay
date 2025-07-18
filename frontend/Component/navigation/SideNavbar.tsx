import React from 'react'

const SideNavbar = () => {
    const shops = ['Home appliances','Air conditioner','Audio & video','Hot Deals']
  return (
    <div className='flex flex-col gap-10 bg-zinc-800 md:p-5 px-8 md:rounded-r-xl rounded-b-xl w-full md:w-80 h-20 md:h-full'>
      <div className='hidden md:flex flex-col w-full'>
        <p className='mb-5 font-semibold text-3xl'>Categoires</p>
        <div className='flex flex-col gap-2 px-3 text-xl'>{shops.map((shop,index)=>(<p className='pr-2 w-full font-medium' key={index}>{shop}</p>))}</div>
      </div>
      <div className='flex justify-end items-center w-full h-full md:h-auto'>
        <p className='font-semibold md:text-3xl'>Filter by price</p>
      </div>
    </div>
  )
}

export default SideNavbar
