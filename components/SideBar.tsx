"use client";
import { navItems } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const SideBar = () => {

  const pathname = usePathname();

  return (
    <aside>
      <Link href='/'>
        <Image src="/logo.png" 
               alt="logo" 
               width={60} 
               height={60} 
               className="cursor-pointer 
                          hidden h-auto
                          lg:block
                          mx-2
                          transition-all duration-300 ease-in-out 
                          hover:scale-105 hover:rotate-2 hover:mb-4"/>
        <Image src="/logo.png" 
               alt="logo" 
               width={40} 
               height={40} 
               className="cursor-pointer
                          h-auto
                          lg:hidden
                          mx-1
                          transition-all duration-300 ease-in-out 
                          hover:scale-102 hover:rotate-2 hover:mb-4"/>
      </Link>
      <nav>
        <ul className='flex flex-1 flex-col gap-6'>
          {navItems.map(({ url, name })=>{
            const active = (pathname === url);
            return (<Link key={name} href={url} className='lg:w-full'><li><p>{name}</p></li></Link>)
          })}

        </ul>
      </nav>
    </aside>
  )
}

export default SideBar