import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet"
import { useLocation, Link , useNavigate} from "react-router-dom";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { navItems } from "../constants";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "../lib/actions/user.actions";
import FolderCreator from "./FolderCreator";

interface Props {
  user_id:string;
  email:string;
}

const MobileNav = ({user_id,  email}: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const pathname = useLocation().pathname;
	
  return (
    <header className="flex flex-row justify-between items-center my-1 px-2 lg:hidden">
      <img src="/logo.png" 
               alt="logo" 
               width={50} 
               height={50} className="cursor-pointer"/>
      <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger><img src='/Hamburger.png' alt='Menu' width={40} height={40} className="cursor-pointer"/></SheetTrigger>
          <SheetContent>
              <SheetTitle className="mt-2 px-2">
                <div className="flex flex-row items-center">
                  {/*<Image src={Profile} alt='Profile' width={44} height={44} className='rounded-4xl'/>*/}
                  <div className="items-center justify-center sm:hidden lg:block px-2 w-full mt-2">
                    <p className="text-xs text-center">{email}</p>
                  </div>
                </div>
                
              </SheetTitle>
              <Separator className="mb-2"/>
              <nav>
                <ul>
                  {navItems.map(({ url, name })=>{
                    const active = (pathname === url);
                    return (<Link key={name} to={url} className=' text-center'>
                      <li>
                        <p className=
                            {(pathname==url) ? 'text-white bg-red rounded-md py-2 font-medium'
                                                :'text-red py-2'}>{name}
                        </p>
                      </li></Link>)})}
                </ul>
              </nav>
              <Separator className="mb-4"/>
              <div className="flex flex-col gap-5 justify-between">
                <FileUploader ownerId={user_id} />
                <FolderCreator ownerId={user_id} />
                <form className='self-center'>
                    <Button type='submit' className='text-sm' onClick={
			    async()=>{
				try {
					await signOutUser()
				} catch {}
				finally {
					navigate('/sign-in')
				}
			    }}>Sign Out</Button>
                </form>

              </div>
          </SheetContent>
    </Sheet>
    </header>
  )
}
export default MobileNav
