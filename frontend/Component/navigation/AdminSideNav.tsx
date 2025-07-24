import Sidebarbtns from './Sidebarbtns';


const AdminSideNav = () => {
    const shops = ['Add Products','Product List','Order']
    return (
        <div className='flex flex-col gap-10 bg-[#222831] py-8 w-18 md:w-90 h-full text-[#EEEEEE]'>
            <div className='flex flex-col items-center w-full'>
                <div className='flex flex-col gap-5 px-2 md:px-4 w-full text-mb'>
                    {
                        shops.map((shop,index)=>(
                            <Sidebarbtns key={index} shop={shop} index={index}/>
                        ))}
                    </div>
            </div>
        </div>
    )
}

export default AdminSideNav
