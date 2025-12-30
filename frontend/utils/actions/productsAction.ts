import { api } from "../api"
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