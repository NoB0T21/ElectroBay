'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNavbar = () => {
  const path = usePathname()
  const shops = ['Air Conditioner','Smart Home','Home appliances','Mobiles','Laptop','Television']
  const links = ['/product-categor/air-conditioner','/product-categor/smart-home','/product-categor/home-appliances','/product-categor/mobiles','/product-categor/laptops','/product-categor/television']
  return (
    <div className='flex flex-col gap-10 bg-[#222831] p-8 md:rounded-r-xl rounded-b-xl w-full md:w-70 h-20 md:h-full'>
      <div className='hidden md:flex flex-col pb-10 w-full'>
        <p className='mb-5 font-semibold text-2xl'>Categoires</p>
        <div className='flex flex-col gap-5 px-1 w-full text-mb'>
          {shops.map((shop,index)=>(
            <Link href={links[index]} className={`${(path===links[index]&&index===index)&& 'bg-[#363c47] md:border-r-[#FFD369] md:border-r-8'} hover:bg-[#363c47] p-3 md:px-2 flex items-center rounded-md md:rounded-r-md md:rounded-l-md w-full h-8 font-medium transition-(bg) duration-300 ease-in-out`} key={index}>
              {shop}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideNavbar
