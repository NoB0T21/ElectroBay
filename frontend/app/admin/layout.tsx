import Header from '@/Component/Header'
import AdminSideNav from '@/Component/navigation/AdminSideNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-col items-center px-3 justify-center scroll-smooth w-screen h-screen'>
      <div className='w-full max-w-280 flex h-full px-4 overflow-hidden shadow-2xl/30'>
        {/* Sidebar */}
        <AdminSideNav />

        {/* Main Content */}
        <div className='flex flex-col flex-1 overflow-hidden'>
          {/* Header */}
          <div className='sticky top-0 z-20'>
            <Header />
          </div>

          {/* Page Content */}
          <div className='flex-1 overflow-y-auto p-4'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
