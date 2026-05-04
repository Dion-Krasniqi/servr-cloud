import Card from '../components/Card';
import Sort from '../components/Sort';
import { Button } from '../components/ui/button';
import { getFiles, getTotalSpaceUsed } from '../lib/actions/file.actions';
import { signOutUser } from '../lib/actions/user.actions';
import { getFileTypeParams } from '../lib/utils';
import type { Document, FileType } from '../types';
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useRefresh } from '../context/RefreshContext'

export default function TypePage ()  {
  const type = useParams().type as string || "";
  console.log(type)
  //const searchText = useParams().searchText as string || "";
  //const sort = useParams().sort as string || "";
  const { refresh } = useRefresh()
  const [ files, setFiles ] = useState<Document[]>([])
  const navigate = useNavigate()
  useEffect(() => {
  	if (type == 'user') return
    	const typeFilter = type != 'documents' ? ['media'] as FileType[] : ['document'] as FileType[];
	getFiles({types: typeFilter, limit: 10 }).then(setFiles)
  }, [type, refresh])

  if (type == 'user') return (<div>
             <p>Account Preferences</p>
             <p>Setting 1</p>
             <p>Setting 2</p>
             <p>Setting 3</p>
             <form className='self-center' action={async()=>{'use server';await signOutUser();}}>
                <Button type='submit' className='text-sm'>Sign Out</Button>
            </form>
            </div>)
  
  return (
     <div style={{backgroundColor:'#e0e0e0ff', borderRadius:10, padding:10}}>
        <section className='w-full'>
            <h1 className='h1 capitalize'>
                {type}
            </h1>    
        {files.length>0 ? (<div>
            <div>
             <div>
              <p className='hidden sm:block'>Sort by:</p>
              <Sort />
             </div>
            </div>
          <section className='flex md:flex-col gap-4 sm:flex-row'>
            {files?.map((file:Document)=>{return (<Card key={file.file_id} file={file}/>)})}
          </section></div>):
          (<div className="flex h-full w-full items-center justify-center">
            <p className="text-lg font-medium my-15">No files found</p>
           </div>)}
           </ section>
        

     </div>)} 

