import { api } from "../api"
import { OrderStatus } from "../types";
const url = process.env.NEXT_PUBLIC_BASE_URL || ''
export const getHomeData = async ({ token }: { token: string }) => {
    const res = await api.get(
        '/product/homepage',
        {
            headers:{
                Authorization:`Bearer ${token}`,
            },
            withCredentials:true
        }
    )
    return res.data;
}
export const udateorderData = async ({ newStatus,prodId }: { prodId:string,newStatus: OrderStatus }) => {
    const res = await api.patch(`/product/updateorder/${prodId}`,
          {status:newStatus},
          {
            withCredentials:true,
        })
    return res.data;
}