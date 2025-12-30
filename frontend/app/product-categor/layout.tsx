
import Header from '@/Component/Header'
import SideNavbar from '@/Component/navigation/SideNavbar'
import ShopCategories from '@/Component/ShopCategories'
import ShopCategories2 from '@/Component/ShopCategories2'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-center justify-center scroll-smooth w-screen h-screen'>
      <div className='w-full max-w-280 h-full px-4 overflow-x-hidden'>
        <Header/>
        <div className='flex flex-col justify-startm mt-3 gap-5 w-full h-full overflow-hidden'>
          <ShopCategories2/>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout