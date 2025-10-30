import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import React from 'react'

const Layout = ({ children }: {children:React.ReactNode}) => {
  return(<main className='flex h-screen items-center'>
        <SideBar />
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav />
            <Header />
            <div >{ children }</div>
        </section>


    </main>)
}

export default Layout