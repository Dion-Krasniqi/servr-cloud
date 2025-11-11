
import React from 'react'
import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.actions'

const Header = ({userId, AccountId}:{userId:string;AccountId:string}) => {
  return (
    <header className='lg:block'>
        <div className='flex flex-row justify-between items-center py-4 px-4'>
          <Search />
          <div className='flex flex-row gap-4'>
            <FileUploader OwnerId={userId} AccountId={AccountId}/>
            <form className='self-center' action={async()=>{'use server';await signOutUser();}}>
                <Button type='submit' className='text-sm'>Sign Out</Button>
            </form>
        </div>
        </div>
        
    </header>
  )
}

export default Header