import Sidebarbtns from './Sidebarbtns';

const AdminSideNav = () => {
  const shops = ['Add Products', 'Product List', 'Order', 'Sale', 'Analysis']

  return (
    <aside className='bg-[#21428f] w-19 xl:w-64 min-w-12 h-full text-[#EEEEEE] flex flex-col'>
      <div className='flex flex-col items-center py-4'>
        <h1 className='text-xl xl:text-3xl font-semibold'>Admin</h1>
      </div>

      <div className='flex flex-col gap-3 px-4'>
        {shops.map((shop, index) => (
          <Sidebarbtns key={index} shop={shop} index={index} />
        ))}
      </div>
    </aside>
  )
}

export default AdminSideNav
