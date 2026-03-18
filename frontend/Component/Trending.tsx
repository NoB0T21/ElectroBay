'use client'

import { userDetails } from '@/utils/utils'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { User } from '@/utils/types'

interface Data {
  url: string
  background: string
  discount: number
}

const Trending = ({data}:{data:Data}) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="w-full h-60 lg:h-80 animate-pulse rounded-xl mt-2"></div>

  return (
    <div className="rounded-lg border-2 border-primary/30 bg-card overflow-hidden shadow-soft">
      <div className="relative h-58 w-full overflow-hidden bg-gradient-to-br from-primary/15 to-accent/10">
        <Image
          className="object-contain object-center"
          src={data.url || '...fallback...'}
          alt="Trending"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
        <div
          style={{ background: data.background || '#f1a763' }}
          className="absolute right-3 bottom-3 md:right-10 md:bottom-10 size-24 md:size-32 rounded-full flex flex-col justify-center items-center text-white shadow-xl z-20 animate-bounce-slow hover:rotate-12 transition-transform cursor-pointer"
        >
          <span className="text-2xl md:text-4xl font-extrabold">{data.discount}%</span>
          <span className="text-xs md:text-sm font-bold uppercase">OFF</span>
        </div>
      </div>
      <div className="p-5 border-t border-primary/20">
        <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Sponsored · {'ad.storeName'}</p>
        <h3 className="font-display text-lg font-bold mb-1">{'yoo'}</h3>
        <p className="text-sm text-muted-foreground">{'ad.description'}</p>
      </div>
    </div>
  )
}

export default Trending
