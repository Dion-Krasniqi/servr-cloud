import { Button } from './ui/button'
import Search from './Search'
import FileUploader from './FileUploader'
import { signOutUser } from '../lib/actions/user.actions'
import FolderCreator from './FolderCreator'
import { useNavigate } from 'react-router-dom'

const Header = ({userId, onRefresh}:
		{userId:string, onRefresh: () => void}) => {
  const navigate = useNavigate();
  return (
    <header className='lg:block'>
        <div className='flex flex-row justify-between items-center py-4 px-4'>
          <Search />
          <div className='flex flex-row items-center'>
            <FileUploader ownerId={userId} onRefresh={onRefresh} />
            <FolderCreator ownerId={userId}/>
            <form className='self-center' action={
		    async()=>{try { await signOutUser() }
			      catch {}
			      finally {
		    	      navigate("/sign-in")
			      }}}>
                <Button type='submit' className='text-sm cursor-pointer'>Sign Out</Button>
            </form>
        </div>
        </div>
        
    </header>
  )
}

export default Header
