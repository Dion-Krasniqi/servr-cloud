"use client";
import { navItems } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  Name:string;
  Profile:string;
  Email:string;
  }

const SideBar = ({Name,Profile,Email}: Props) => {

  const pathname = usePathname();

  return (
    <aside className='hidden lg:block'>
      <Link href='/' className='flex justify-center'>
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
        <ul className='flex flex-1 flex-col gap-6 px-4 mt-4'>
          {navItems.map(({ url, name })=>{
            const active = (pathname === url);
            return (<Link key={name} href={url} className='lg:w-full text-start'>
              <li>
                <p className=
                    {(pathname==url) ? 'text-white bg-red rounded-md px-2 hidden lg:block'
                                        :'text-red px-2 hidden lg:block'}>{name}
                </p>
                <p className=
                    {(pathname==url) ? 'text-white bg-red rounded-md px-2 text-center lg:hidden'
                                        :'text-red px-2  text-center lg:hidden'}>{name.charAt(0)}
                </p>
              </li></Link>)
          })}

        </ul>
      </nav>
      <div>
        <Image src={Profile} alt='Profile' width={44} height={44} className='rounded-4xl'/>
        <div className='hidden lg:block'>
          <p className='subtitle-2 capitalize'>{Name}</p>
          <p className='subtitle-2'>{Email}</p>
        </div>
      </div>
    </aside>
  )
}

export default SideBar