import Header from '../components/Header'
import MobileNav from '../components/MobileNav'
import SideBar from '../components/SideBar'
import { getCurrentUser } from '../lib/actions/user.actions'
import { Toaster } from "../components/ui/sonner"
import { Outlet } from 'react-router-dom'
import type { User } from '../types'
import { useEffect, useState } from 'react'

export default function Layout () {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  useEffect(()=>{
    getCurrentUser().then(user => setCurrentUser(user))
  }, [])
  
  if (!currentUser) return null

  return(<main className='flex h-screen items-center'>
        <SideBar { ...currentUser} />
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav { ...currentUser } />
            <Header userId = {currentUser.user_id} />
            <div className='rounded-xl'><Outlet /></div>
        </section>
        <Toaster />
    </main>)
}