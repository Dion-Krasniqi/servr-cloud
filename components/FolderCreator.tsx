'use client';
import { createFolder } from "@/lib/actions/file.actions"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";




const FolderCreator = ({ownerId}:{ownerId:string}) =>{
  const [modalOpen, setModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const path = usePathname();
  const parentId = path.split('/').at(2) || '';
  console.log(parentId)
   return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button style={{width:100, alignSelf:'center',marginRight:10, marginLeft:10}} className="cursor-pointer">
          Create Folder
        </Button>
      </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={async (e) => {e.preventDefault();
                                    if (!folderName) return;

                                    await createFolder({ownerId,parentId,folderName,path});
                                    setModalOpen(false);
      }}><div className="flex items-center gap-4">
          <div className="grid flex-1 gap-4">
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>
          
              <Input id="name-1" name="foldername" placeholder='Folder Name' 
                                             onChange={(e)=>{setFolderName(e.target.value.trim())}} />
           
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>setModalOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit">Create</Button>
            
          </DialogFooter>
           </div>
          </div>
          </form>
        </DialogContent>
      
    </Dialog>
  )
}


export default FolderCreator