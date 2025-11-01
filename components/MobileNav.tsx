'use client';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";

interface Props {
  ownerId:string;
  AccountId:string;
  Name:string;
  Profile:string;
  Email:string;
}

const MobileNav = ({ownerId, AccountId, Name,Profile,Email}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="flex flex-row justify-between items-center my-1 px-2">
      <Image src="/logo.png" 
               alt="logo" 
               width={50} 
               height={50} className="cursor-pointer"/>
      <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger><Image src='/Hamburger.png' alt='Menu' width={40} height={40} className="cursor-pointer"/></SheetTrigger>
          <SheetContent>
              <SheetTitle className="mt-2 px-2">
                <div className="flex flex-row items-center">
                  <Image src={Profile} alt='Profile' width={44} height={44} className='rounded-4xl'/>
                  <div className="sm:hidden lg:block px-2">
                    <p className="capitalize">{Name}</p>
                    <p className="text-xs">{Email}</p>
                  </div>
                </div>
                
              </SheetTitle>
              <Separator className="mb-2"/>
              <nav>
                <ul>
                  {navItems.map(({ url, name })=>{
                    const active = (pathname === url);
                    return (<Link key={name} href={url} className=' text-start'>
                      <li>
                        <p className=
                            {(pathname==url) ? 'text-white bg-red rounded-md px-2 '
                                                :'text-red px-2 '}>{name}
                        </p>
                      </li></Link>)})}
                </ul>
              </nav>
              <Separator className="mb-4"/>
              <div className="flex flex-col gap-5 justify-between">
                <FileUploader />
                <form className='self-center'>
                    <Button type='submit' className='text-sm'>Sign Out</Button>
                </form>

              </div>
          </SheetContent>
    </Sheet>
    </header>
  )
}

export default MobileNav