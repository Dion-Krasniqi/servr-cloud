import Link from 'next/link'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'
import { Document } from '@/types'

const Card = ({ file }: { file: Document }) => {
  
  return (
    <div className="flex flex-col gap-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md w-full">
      
      <div className="flex items-start justify-between">
        <Link href={file.file_type == 'folder' ? `/folders/${file.file_id}`: file.url} target="_blank">
          <Thumbnail 
            type={file.file_type} 
            extension={file.extension} 
            url={file.url} 
            className="size-12 mt-3" 
            imageClassName={"size-14"}
          />
        </Link>
        <div className="">
          <ActionDropdown file={file} />
          
        </div>
      </div>

      {/* File Details */}
      <div className="flex flex-row items-center justify-between  gap-1 mb-3">
        <p className="truncate text-sm font-semibold text-gray-900 pl-1" title={file.file_name}>
          {file.file_name}{file.extension && (file.extension.length > 0 ? (`.${file.extension}`):(''))}
        </p>
        <p className="text-[12px] font-medium text-gray-500">{(file.size > 516) ? (`${Math.round(file.size/1024)}KB`):
        (`${(file.size)}B`)}</p>
        <div className="flex flex-row text-[11px] text-gray-400">
          <FormattedDateTime date={file.created_at} />
        </div>
          
        
      </div>
    </div>
  )
}

export default Card