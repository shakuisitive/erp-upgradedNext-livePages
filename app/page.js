"use client"
import React, { useEffect, useState } from 'react'
import DashBoard from '../app/(protected)/dashboard/page'
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [hasToken, setHasToken] = useState(false);
    // const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const token = localStorage.getItem('tokenSession');
        if (token) {
            setHasToken(true);
        } else if (pathname !== '/login') {
            window.location.href = "/login";
        }
    }, [pathname]);

    
  return (
    <div className='w-full h-[1200px]   p-2 '>
      <DashBoard/> 
        
    </div>
  )
}
