
import Header from '@/Component/Header'
import ShopCategories2 from '@/Component/ShopCategories2'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='min-h-screen w-full flex justify-center bg-gray-50'>
      <div className='w-full max-w-[1440px] bg-white min-h-screen flex flex-col shadow-2xl overflow-x-hidden'>
        <Header/>
        <main className='flex-1 flex flex-col gap-6 px-4 md:px-8 py-6 w-full'>
          <ShopCategories2/>
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout