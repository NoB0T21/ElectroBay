import Header from '@/Component/Header'
import AdminSideNav from '@/Component/navigation/AdminSideNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen w-full flex justify-center bg-gray-50'>
      <div className='w-full max-w-[1440px] bg-white h-full flex shadow-2xl overflow-hidden'>
        {/* Sidebar */}
        <div className="hidden md:block h-full border-r border-gray-100">
          <AdminSideNav />
        </div>

        {/* Main Content */}
        <div className='flex flex-col flex-1 h-full overflow-hidden'>
          {/* Header */}
          <div className='sticky top-0 z-20 bg-white border-b border-gray-100'>
            <Header />
          </div>

          {/* Page Content */}
          <main className='flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50'>
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export default Layout
