
import React from 'react'
import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '@/lib/actions/user.actions'
import FolderCreator from './FolderCreator'

const Header = ({userId}:{userId:string}) => {
  return (
    <header className='lg:block'>
        <div className='flex flex-row justify-between items-center py-4 px-4'>
          <Search />
          <div className='flex flex-row items-center'>
            <FileUploader ownerId={userId}/>
            <FolderCreator ownerId={userId}/>
            <form className='self-center' action={async()=>{'use server';await signOutUser();}}>
                <Button type='submit' className='text-sm cursor-pointer'>Sign Out</Button>
            </form>
        </div>
        </div>
        
    </header>
  )
}

export default Header