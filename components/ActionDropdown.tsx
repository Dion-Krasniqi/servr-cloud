"use client";
import { Dialog } from "@/components/ui/dialog"
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
import Link from "next/link";
import { Models } from "node-appwrite";
import { useState } from "react"

const ActionDropdown = ({ file } : {file: Models.Document}) => {
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [action, setAction] = useState<ActionType | null>(null);

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
    
    </Dialog>
  )
}

export default ActionDropdown