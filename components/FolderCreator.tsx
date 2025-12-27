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
   return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button style={{marginRight:10, marginLeft:10}} className="cursor-pointer">
          Create Folder
        </Button>
      </DialogTrigger>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Input id="name-1" name="foldername" placeholder='Folder Name' 
                                             onChange={e=>setFolderName(e.target.value.trim())} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={()=>setModalOpen(false)}>Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={()=>{createFolder({ownerId,folderName, path});setModalOpen(false)}}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}


export default FolderCreator