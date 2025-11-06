import Link from 'next/link'
import { Models } from 'node-appwrite'
import React from 'react'
import Thumbnail from './Thumbnail'
import FormattedDateTime from './FormattedDateTime'
import ActionDropdown from './ActionDropdown'

const Card = ({file}:{ file:Models.Document}) => {
  return (
    <Link href={file.Url} target='_blank'>
      <div className='flex justify-between'>
        <Thumbnail type={file.Type} extension={file.Extension} url={file.Url} className='!size-20' imageClassName='!size-11'/>
        <div className='flex flex-col items-end justify-between'>
          <ActionDropdown file={file}/>
          <p>
          {file.Size/*convertFileSize(file.size)*/}
        </p>
        </div>
      </div>
      <div>
        <p className='line-clamp-1'>{file.Name}</p>
        <FormattedDateTime date={file.$createdAt}/>
        {/*I think its the databases fault here */}
        <p className='text-black line-clamp-1'>Uploaded by:{(file.Owner)}</p>
      </div>
    </Link>
  )
}

export default Card