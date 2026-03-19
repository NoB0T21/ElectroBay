import Header from '@/Component/Header'
import AdminSideNav from '@/Component/navigation/AdminSideNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='min-h-screen bg-background'>
      <div className='container w-full py-8 px-2 md:px-10'>
        {/* Sidebar */}
        <AdminSideNav />
        {/* Page Content */}
        {children}
      </div>

    </div>
  )
}

export default Layout
