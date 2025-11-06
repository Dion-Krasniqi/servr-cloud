"use client";
import { Dialog, DialogFooter, DialogHeader } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { actionsDropDownItems } from "@/constants";
import { constructFileDownloadUrl, constructFileUrl } from "@/lib/utils";
import { DialogContent, DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";

const ActionDropdown = ({ file } : {file: Models.Document}) => {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.Name);
  const [loading, setLoading] = useState(false);

  const closeAllModals = ()=> {
    setIsModalOpen(false);
    setDropdownOpen(false);
    setAction(null);
    setName(file.Name);
    // setEmails([]);
  }

  const handleAction = async()=> {

  } 

  const renderDialogContent = ()=> {
    if (!action) return null;
    const { value, label } = action;
    return (
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          { value === 'rename' && (<Input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>)}
        </DialogHeader>
          {['rename', 'delete', 'share'].includes(value) 
            && (<DialogFooter className="flex flex-col gap-3">
                  <Button onClick={closeAllModals}>
                    Cancel
                  </Button>
                  <Button onClick={handleAction}>
                    <p className="capitalize">{value}</p>
                    {loading && (<Image src='/globe.svg' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)}
                  </Button>
                </DialogFooter>)}
      </DialogContent>
    )
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="font-bold text-xl">...</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="max-w-[200px] truncate">{file.Name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropDownItems.map((item)=>
            (<DropdownMenuItem key={item.value} 
                               onClick={()=>{setAction(item);
                                             if (item.value!='delete'){
                                                  setIsModalOpen(true)}}}>
             {item.value === 'download' ? 
             <Link href={constructFileDownloadUrl(file.BucketFileId)} download={file.Name}>{item.label}</Link>
             :<p>{item.label}</p>}
             
             </DropdownMenuItem>))}
        </DropdownMenuContent>
    </DropdownMenu>
    {renderDialogContent()}
    
    </Dialog>
  )
}

export default ActionDropdown