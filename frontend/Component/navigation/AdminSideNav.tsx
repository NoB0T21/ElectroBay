import Sidebarbtns from './Sidebarbtns';

const AdminSideNav = () => {
  const shops = ['Add Products', 'Product List', 'Order', 'Sale', 'Analysis']

  return (
    <aside className='bg-white w-20 xl:w-64 h-full text-slate-600 flex flex-col border-r border-gray-100 transition-all duration-300'>
      <div className='flex flex-col items-center justify-center py-6 border-b border-gray-100 mb-4'>
        <h1 className='text-xl xl:text-2xl font-bold text-slate-800 hidden xl:block'>Admin Panel</h1>
        <h1 className='text-xl font-bold text-slate-800 xl:hidden'>AP</h1>
      </div>

      <div className='flex flex-col gap-2 px-2 xl:px-4'>
        {shops.map((shop, index) => (
          <Sidebarbtns key={index} shop={shop} index={index} />
        ))}
      </div>
    </aside>
  )
}

export default AdminSideNav
