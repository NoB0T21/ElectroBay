import Sidebarbtns from './Sidebarbtns';

const AdminSideNav = () => {
  const shops = ['Add Products', 'Product List', 'Order', 'Sale', 'Analysis']

  return (
    <>
      <h1 className="font-display text-3xl font-bold mb-6">Admin Panel</h1>
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {shops.map((shop, index) => (
          <Sidebarbtns key={index} shop={shop} index={index} />
        ))}
      </div>
    </>
  )
}

export default AdminSideNav
