import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'
import { Document } from '@/types'

const Card = ({file}:{ file:Document}) => {
  return (
    <div>
    
      <div className='flex justify-between'>
        <Link href={file.url} target='_blank'>
        <Thumbnail type={file.type} extension={file.extension} url={file.url} className='!size-20' imageClassName='!size-11'/>
        </Link>
        <div className='flex flex-col items-end justify-between'>
          <ActionDropdown file={file}/>
          <p>
          {file.size/*convertFileSize(file.size)*/}
        </p>
        </div>
      </div>
      <div>
        <p className='line-clamp-1'>{file.name}</p>
        <FormattedDateTime date={file.createdAt}/>
        {/*I think its the databases fault here */}
        <p className='text-black line-clamp-1'>Uploaded by:{(file.ownerName)}</p>
      </div>
    </div>
  )
}

export default Card