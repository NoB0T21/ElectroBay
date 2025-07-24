
import Header from '@/Component/Header'
import AdminSideNav from '@/Component/navigation/AdminSideNav'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-start w-screen h-screen'>
      <Header/>
      <div className='flex justify-start px-1 md:px-10 pr-5 pb-5 w-full h-[92%]'>
        <AdminSideNav/>
        {children}
      </div>
    </div>
  )
}

export default Layout