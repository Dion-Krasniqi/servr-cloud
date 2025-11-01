import React from 'react'
import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'

const Header = () => {
  return (
    <header className='flex flex-row justify-between items-center hidden lg:block'>
        <Search />
        <div className='flex flex-row gap-4 items-center'>
            <FileUploader />
            <form className='self-center'>
                <Button type='submit' className='text-sm'>Sign Out</Button>
            </form>
        </div>
    </header>
  )
}

export default Header