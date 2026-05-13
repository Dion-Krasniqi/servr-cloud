import { Link }from 'react-router-dom'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'
import type { Document } from '../types'
import { baseLink } from '../lib/utils'

const Card = ({ file, onRefresh } : 
	      { file: Document, onRefresh: () => void }) => {
  //const file_link = file.file_type!='folder' `${baseLink}/files/${file.file_id}/download`: ''

  return (
    <div className="flex flex-col gap-8 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-shadow hover:shadow-md w-full">
      
      <div className="flex items-start justify-between">
      { file.file_type == 'folder' ?   
        (<Link to={`/folders/${file.file_id}`} >
          <Thumbnail 
            type={file.file_type} 
            extension={file.extension} 
            url={null} 
            className="size-12 mt-3" 
            imageClassName={"size-14"}
          />
        </Link>) : (<a href={`${baseLink}/files/${file.file_id}/download`} 
		    target="_blank" rel="noopener noreferrer">
          <Thumbnail 
            type={file.file_type} 
            extension={file.extension} 
            url={`${baseLink}/files/${file.file_id}/download`} 
            className="size-12 mt-3" 
            imageClassName={"size-14"}
          />
        </a>)
       }

        <div className="">
          <ActionDropdown file={file} onRefresh={onRefresh} />
          
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
