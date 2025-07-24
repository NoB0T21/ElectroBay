'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const SortProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sort, setSort] = useState('')

  const toggleSort = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    setSort(newSort)
    const query = new URLSearchParams(searchParams.toString());
    query.set('sort', newSort);
    router.push(`?${query.toString()}`);
  };

  return (
    <>
    <div className='flex gap-1'>
      <form className="mx-auto max-w-sm">
          <span>Sort: </span>
          <select
            value={sort}
            onChange={(e)=>toggleSort(e)}
            className="bg-[#393E46] p-2 rounded-lg text-[#EEEEEE] text-sm"
          >
            <option value="">Recent</option>
            <option value="Price-asc">Date ↓</option>
            <option value="Price-desc">Date ↑</option>
            <option value="A-Zdesc">A-Z ↑</option>
            <option value="A-Zasc">A-Z ↓</option>
          </select>
      </form>
    </div>
    </>
  );
}

export default SortProduct
