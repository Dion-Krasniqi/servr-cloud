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
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Image from "next/image";
import { deleteFile, renameFile, updateFileUsers } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";
import { FileDetails, ShareInput } from "./ActionsModalContent";
import { ActionType, Document } from "@/types";

const ActionDropdown = ({ file } : {file: Document}) => {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);
  const [name, setName] = useState(file.file_name);
  const [loading, setLoading] = useState(false);
  const path = usePathname();
  const [emails, setEmails] = useState<string[]>([]);

  const closeAllModals = ()=> {
    setIsModalOpen(false);
    setDropdownOpen(false);
    setAction(null);
    setName(file.file_name);
    setEmails([]);
  }

  const handleAction = async()=> {
    if(!action) return;
    setLoading(true);
    let success = false;
    const actions = {
      rename: ()=>renameFile({file_id:file.file_id, file_name:file.file_name, path}),
      share: ()=>updateFileUsers({fileId:file.file_id, emails, path}),
      delete: ()=>deleteFile({file_id:file.file_id, path}),
    }
    
    success = await actions[action.value as keyof typeof actions]();
    if (success) closeAllModals();
    setLoading(false);

  } 

  const handleRemoveUser = async(email:string)=> {
    const updatedEmails = emails.filter((e)=>e != email);
    const success = await updateFileUsers({fileId:file.file_id,emails:updatedEmails, path});

    if (success) setEmails(updatedEmails);
    closeAllModals;
  }

  const renderDialogContent = ()=> {
    if (!action) return null;
    const { value, label } = action;
    
    console.log(value);
    return (
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          { value === 'rename' && (<Input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>)}
          { value === 'details' && <FileDetails file={file} />}
          { value === 'share' && <ShareInput file={file} onInputChange={setEmails} onRemove={handleRemoveUser}/>}
          { value === 'delete' && (<>
                                      <p>Are you sure you want to delete {` `}
                                      <span>{file.file_name}</span>?</p>

                 </>)}
        </DialogHeader>
          {['rename', 'delete', 'share'].includes(value) 
            && (<DialogFooter className="flex flex-col gap-3">
                  <Button onClick={closeAllModals}>
                    Cancel
                  </Button>
                  <Button onClick={handleAction}>
                    <p className="capitalize">{value}</p>
                    {loading && (<Image src='/spinner.png' alt="loader" width={24} height={24} className="ml-2 animate-spin"/>)}
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
          <DropdownMenuLabel className="max-w-[200px] truncate">{file.file_name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actionsDropDownItems.map((item)=>
            (<DropdownMenuItem key={item.value} 
                               onClick={()=>{setAction(item);
                                             if (item.value!='download'){
                                                  setIsModalOpen(true)}}}>
             {item.value === 'download' ? 
             <Link href={constructFileDownloadUrl(file.url)} download={file.file_name}>{item.label}</Link>
             :<p>{item.label}</p>}
             
             </DropdownMenuItem>))}
        </DropdownMenuContent>
    </DropdownMenu>
    {renderDialogContent()}
    
    </Dialog>
  )
}

export default ActionDropdown