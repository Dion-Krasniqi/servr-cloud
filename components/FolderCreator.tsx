'use client';
import { createFolder } from "@/lib/actions/file.actions"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";


const FolderCreator = ({ownerId}:{ownerId:string}) =>{
  const path = usePathname();
  return (
    <div  style={{width:100, alignSelf:'center'}}>
      <input />
      <Button type='button' className='cursor-pointer' style={{width:'100%'}} 
              onClick={()=>createFolder({ownerId, path})}><p>Create Folder</p></Button>
    </div>
  )
}

export default FolderCreator