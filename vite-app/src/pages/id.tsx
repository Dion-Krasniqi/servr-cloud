import Card from "../components/Card";
import FileUploader from "../components/FileUploader";
import { getFiles, getTotalSpaceUsed } from "../lib/actions/file.actions";
import { getCurrentUser } from "../lib/actions/user.actions";
import type { Document, FileType, User } from "../types";
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import {useState, useEffect} from 'react'


export default function FolderPage ()  {
  const navigate = useNavigate();
  const [files, setFiles] = useState<Document[]>([])
  const [currentUser, setCurrentUser] = useState<User|null>(null)
  useEffect(() => {
      const load = async () => {
        const [filesData] = await Promise.all([
          getFiles({ types: [], limit: 10, folder:id})
        ])
        const currentUser = await getCurrentUser();
        setFiles(filesData)
        setCurrentUser(currentUser)
      }
      load()
    }, [])

  const id = useParams().id;
  const name = (useParams().name as string) || "";
  
  
  if (!currentUser) navigate('/sign-in');

    return (
     <div style={{backgroundColor:'#e0e0e0ff', borderRadius:10, padding:10}}>
        <section className='w-full'>
            <h1 className='h1 capitalize'>
              {name}
            </h1>
        {files.length>0 ? (<div>
          <section className='flex md:flex-col gap-4 sm:flex-row'>
            {files?.map((file:Document)=>{return (<Card key={file.file_id} file={file}/>)})}
          </section></div>):
          (<div className="flex h-full w-full items-center justify-center">
            <p className="text-lg font-medium my-15">No files found</p>
           </div>)}
           </ section>
     </div>)
}
