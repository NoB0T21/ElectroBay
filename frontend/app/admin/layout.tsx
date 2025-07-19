
import Header from '@/Component/Header'
import AdminSideNav from '@/Component/navigation/AdminSideNav'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-start w-screen h-screen'>
      <Header/>
      <div className='flex justify-start w-full md:w-auto h-full'>
        <AdminSideNav/>
        {children}
      </div>
    </div>
  )
}

export default Layout