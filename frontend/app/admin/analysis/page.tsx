'use client'
import AnalyticsDashboard from '@/Component/analysis/AnalyticsDashboard';
import { api } from '@/utils/api';
import { AnalysisData } from '@/utils/types';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    const token = Cookies.get('token')
    const router = useRouter();
    const [data , setData] = useState<AnalysisData>()

    const fetchData = async () => {
        try {
            const data = await api.get('/analysis/data',{
                withCredentials:true,
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            setData(data.data.analysisData)
            return data.data.analysisData
        } catch (error:any) {
            const status = error?.response?.status;

            if (status === 401 || status === 403) {
                router.push("/sign-in");
                return;
            }
        }
    }
    useEffect(()=>{
        fetchData()
    },[])
  return (
    <div className='w-full h-full px-3'>
       <AnalyticsDashboard data2={data}/>
    </div>
  )
}

export default page;