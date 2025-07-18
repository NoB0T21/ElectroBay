
import Header from '@/Component/Header'
import SideNavbar from '@/Component/navigation/SideNavbar'
import Header2 from '@/Component/toasts/Header2'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-start h-screen'>
      <Header/>
      <Header2/>
      <div className='flex md:flex-row flex-col justify-start w-full h-full'>
        <SideNavbar/>
        {children}
      </div>
    </div>
  )
}

export default Layout