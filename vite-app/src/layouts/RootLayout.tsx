import Header from '../../components/Header'
import MobileNav from '../../components/MobileNav'
import SideBar from '../../components/SideBar'
import { getCurrentUser } from '../../lib/actions/user.actions'
import { useNavigate } from 'react-router-dom'
import { Toaster } from "../../components/ui/sonner"
import { Outlet } from 'react-router-dom'

export default async function Layout () {
const navigate = useNavigate()
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    navigate('/sign-in');
    return
  }
    

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