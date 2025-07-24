
import Header from '@/Component/Header'
import SideNavbar from '@/Component/navigation/SideNavbar'
import Header2 from '@/Component/navigation/Header2'

const Layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className='flex flex-col items-start w-screen h-screen'>
      <Header/>
      <Header2/>
      <div className='flex md:flex-row flex-col justify-start md:mt-10 px-5 md:px-10 pb-5 w-full h-full overflow-hidden'>
        <SideNavbar/>
        {children}
      </div>
    </div>
  )
}

export default Layout