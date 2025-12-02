import Header from '@/components/Header'
import MobileNav from '@/components/MobileNav'
import SideBar from '@/components/SideBar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from "@/components/ui/sonner"

const Layout = async ({ children }: {children:React.ReactNode}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/sign-in');

  return(<main className='flex h-screen items-center'>
        <SideBar { ...currentUser } />
        <section className='flex h-full flex-1 flex-col'>
            <MobileNav { ...currentUser } />
            <Header userId = {currentUser.id} />
            <div className='rounded-xl'>{ children }</div>
        </section>

        <Toaster />
    </main>)
}

export default Layout